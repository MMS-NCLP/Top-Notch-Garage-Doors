import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

interface ImportResult {
  executed_at: string;
  reviews_processed: number;
  reviews_inserted: number;
  reviews_deduplicated: number;
  reviews_marked_stale: number;
  status: "success" | "partial" | "failed";
  error_message?: string;
  duration_ms: number;
}

function generateHash(name: string, review_text: string, job_date?: string): string {
  const raw = `${name.toLowerCase().trim()}|${review_text.toLowerCase().trim().slice(0, 100)}|${job_date || ""}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

async function promotePendingReviews(): Promise<{ inserted: number; deduplicated: number }> {
  const { data: pending, error } = await supabase
    .from("reviews_pending")
    .select("*")
    .eq("status", "approved");

  if (error || !pending) return { inserted: 0, deduplicated: 0 };

  let inserted = 0;
  let deduplicated = 0;

  for (const review of pending) {
    const hash = generateHash(review.name, review.review_text, review.job_date);

    const { data: existing } = await supabase
      .from("reviews")
      .select("id")
      .eq("import_hash", hash)
      .maybeSingle();

    if (existing) {
      deduplicated++;
      await supabase
        .from("reviews_pending")
        .update({ status: "stale", moderation_note: "Duplicate detected during import" })
        .eq("id", review.id);
      continue;
    }

    const { error: insertErr } = await supabase.from("reviews").insert({
      name: review.name,
      city: review.city,
      rating: review.rating,
      service_type: review.service_type,
      review_text: review.review_text,
      contractor_name: review.contractor_name,
      job_date: review.job_date,
      source: review.source,
      approved: true,
      import_hash: hash,
      last_verified_at: new Date().toISOString(),
    });

    if (!insertErr) {
      inserted++;
      await supabase
        .from("reviews_pending")
        .update({ status: "approved", moderated_at: new Date().toISOString() })
        .eq("id", review.id);
    }
  }

  return { inserted, deduplicated };
}

async function markStaleReviews(): Promise<number> {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const { data, error } = await supabase
    .from("reviews")
    .update({ last_verified_at: null })
    .lt("last_verified_at", sixMonthsAgo.toISOString())
    .eq("approved", true)
    .select("id");

  if (error || !data) return 0;
  return data.length;
}

async function refreshVerification(): Promise<void> {
  await supabase
    .from("reviews")
    .update({ last_verified_at: new Date().toISOString() })
    .eq("approved", true)
    .not("last_verified_at", "is", null);
}

Deno.serve(async (req) => {
  const startTime = Date.now();

  try {
    const { inserted, deduplicated } = await promotePendingReviews();
    const stale = await markStaleReviews();
    await refreshVerification();

    const duration_ms = Date.now() - startTime;

    const result: ImportResult = {
      executed_at: new Date().toISOString(),
      reviews_processed: inserted + deduplicated,
      reviews_inserted: inserted,
      reviews_deduplicated: deduplicated,
      reviews_marked_stale: stale,
      status: "success",
      duration_ms,
    };

    await supabase.from("import_log").insert({
      source: "nightly_automation",
      reviews_processed: result.reviews_processed,
      reviews_inserted: result.reviews_inserted,
      reviews_deduplicated: result.reviews_deduplicated,
      reviews_marked_stale: result.reviews_marked_stale,
      status: result.status,
      duration_ms: result.duration_ms,
    });

    console.log(`[import-reviews] Success: ${inserted} inserted, ${deduplicated} deduped, ${stale} marked stale (${duration_ms}ms)`);

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    const duration_ms = Date.now() - startTime;
    const errorMessage = err instanceof Error ? err.message : "Unknown error";

    await supabase.from("import_log").insert({
      source: "nightly_automation",
      status: "failed",
      error_message: errorMessage,
      duration_ms,
    });

    console.error(`[import-reviews] Failed: ${errorMessage} (${duration_ms}ms)`);

    return new Response(
      JSON.stringify({ status: "failed", error_message: errorMessage, duration_ms }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
});
