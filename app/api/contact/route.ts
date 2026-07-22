import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

function getSupabase() {
  if (!supabaseUrl) return null;
  const key = supabaseServiceKey || supabaseAnonKey;
  if (!key) return null;
  return createClient(supabaseUrl, key);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required.' },
        { status: 400 },
      );
    }

    const submission = {
      name: String(name).slice(0, 200),
      phone: String(phone).slice(0, 30),
      email: email ? String(email).slice(0, 200) : null,
      service: service ? String(service).slice(0, 100) : null,
      message: message ? String(message).slice(0, 2000) : null,
      submitted_at: new Date().toISOString(),
    };

    const supabase = getSupabase();
    if (supabase) {
      const { error } = await supabase
        .from('contact_submissions')
        .insert(submission);
      if (error) {
        console.error('[Contact Form] Supabase insert failed:', error.message);
      }
    }

    const lines = [
      `New contact form submission`,
      `Name: ${submission.name}`,
      `Phone: ${submission.phone}`,
      submission.email ? `Email: ${submission.email}` : null,
      submission.service ? `Service: ${submission.service}` : null,
      submission.message ? `Message: ${submission.message}` : null,
    ]
      .filter(Boolean)
      .join('\n');
    console.log('[Contact Form]', lines);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request.' },
      { status: 400 },
    );
  }
}
