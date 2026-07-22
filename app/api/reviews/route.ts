import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

function getSupabase() {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const rating = Number(formData.get('rating'));
    const city = formData.get('city') as string | null;
    const serviceType = formData.get('service_type') as string | null;
    const reviewText = formData.get('review_text') as string;
    const jobDate = formData.get('job_date') as string | null;

    if (!name || !phone || !rating || !reviewText) {
      return NextResponse.json(
        { error: 'Name, phone, rating, and review are required.' },
        { status: 400 },
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5.' },
        { status: 400 },
      );
    }

    const supabase = getSupabase();
    if (!supabase) {
      console.error('[Reviews] Supabase not configured');
      return NextResponse.json(
        { error: 'Service temporarily unavailable.' },
        { status: 503 },
      );
    }

    const { data: review, error: reviewError } = await supabase
      .from('reviews')
      .insert({
        name: String(name).slice(0, 200),
        city: city ? String(city).slice(0, 100) : null,
        rating,
        service_type: serviceType ? String(serviceType).slice(0, 100) : null,
        review_text: String(reviewText).slice(0, 2000),
        job_date: jobDate || null,
        source: 'form',
        approved: false,
      })
      .select('id')
      .single();

    if (reviewError || !review) {
      console.error('[Reviews] Insert failed:', reviewError?.message);
      return NextResponse.json(
        { error: 'Failed to submit review.' },
        { status: 500 },
      );
    }

    const photoResults: { type: string; path: string }[] = [];

    for (const photoType of ['before', 'after'] as const) {
      const files = formData.getAll(`photos_${photoType}`) as File[];
      for (const file of files) {
        if (!file || file.size === 0) continue;
        if (file.size > 5 * 1024 * 1024) continue;

        const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const safeName = `${review.id}/${photoType}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from('review-photos')
          .upload(safeName, file, {
            contentType: file.type,
            upsert: false,
          });

        if (uploadError) {
          console.error(`[Reviews] Upload failed for ${photoType}:`, uploadError.message);
          continue;
        }

        const caption = formData.get(`caption_${photoType}`) as string | null;

        const { error: photoDbError } = await supabase
          .from('review_photos')
          .insert({
            review_id: review.id,
            storage_path: safeName,
            photo_type: photoType,
            caption: caption ? String(caption).slice(0, 500) : null,
            approved: false,
          });

        if (photoDbError) {
          console.error('[Reviews] Photo record failed:', photoDbError.message);
        } else {
          photoResults.push({ type: photoType, path: safeName });
        }
      }
    }

    console.log(`[Reviews] New submission from ${name} (${city || 'no city'}) — ${rating} stars, ${photoResults.length} photos`);

    return NextResponse.json({
      ok: true,
      reviewId: review.id,
      photosUploaded: photoResults.length,
    });
  } catch (err) {
    console.error('[Reviews] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Invalid request.' },
      { status: 400 },
    );
  }
}
