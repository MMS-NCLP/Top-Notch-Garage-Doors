import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const resendApiKey = process.env.RESEND_API_KEY ?? '';
const notifyEmail = 'office@trytopnotchdoors.com';

function getSupabase() {
  if (!supabaseUrl) return null;
  const key = supabaseServiceKey || supabaseAnonKey;
  if (!key) return null;
  return createClient(supabaseUrl, key);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = String(formData.get('name') ?? '').slice(0, 200);
    const phone = String(formData.get('phone') ?? '').slice(0, 30);
    const email = String(formData.get('email') ?? '').slice(0, 200) || null;
    const topic = String(formData.get('topic') ?? '').slice(0, 100);
    const message = String(formData.get('message') ?? '').slice(0, 2000) || null;
    const preferredDate = String(formData.get('preferredDate') ?? '').slice(0, 20) || null;
    const preferredTime = String(formData.get('preferredTime') ?? '').slice(0, 20) || null;

    if (!name || !phone || !topic) {
      return NextResponse.json(
        { error: 'Name, phone, and topic are required.' },
        { status: 400 },
      );
    }

    const files = formData.getAll('attachments') as File[];
    const uploadedUrls: string[] = [];

    const supabase = getSupabase();

    for (const file of files) {
      if (!file.size || file.size > 25 * 1024 * 1024) continue;
      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin';
      const safeName = `callback/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      if (supabase) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const { data, error } = await supabase.storage
          .from('uploads')
          .upload(safeName, buffer, { contentType: file.type, upsert: false });

        if (!error && data) {
          const { data: urlData } = supabase.storage
            .from('uploads')
            .getPublicUrl(data.path);
          uploadedUrls.push(urlData.publicUrl);
        }
      }
    }

    const submission = {
      name,
      phone,
      email,
      topic,
      message,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      attachments: uploadedUrls.length > 0 ? uploadedUrls : null,
      submitted_at: new Date().toISOString(),
    };

    if (supabase) {
      const { error } = await supabase
        .from('callback_requests')
        .insert(submission);
      if (error) {
        console.error('[Callback] Supabase insert failed:', error.message);
      }
    }

    const topicLabels: Record<string, string> = {
      repair: 'Garage Door Repair',
      installation: 'New Door Installation',
      opener: 'Opener Install / Repair',
      spring: 'Spring Replacement',
      screen: 'Garage Screen Door',
      maintenance: 'Tune-Up / Maintenance',
      commercial: 'Commercial Service',
      troubleshoot: 'Troubleshoot My Door',
      pressure_washing: 'Pressure Washing',
      other: 'Other',
    };

    const scheduleStr = preferredDate
      ? `${preferredDate}${preferredTime ? ' at ' + preferredTime : ''}`
      : 'As soon as possible';

    const emailLines = [
      `<h2 style="color:#002868;font-family:sans-serif;margin:0 0 16px">New Callback Request</h2>`,
      `<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">`,
      `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#002868;width:140px">Name</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${name}</td></tr>`,
      `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#002868">Phone</td><td style="padding:8px 12px;border-bottom:1px solid #eee"><a href="tel:${phone}" style="color:#bf0a30">${phone}</a></td></tr>`,
      email ? `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#002868">Email</td><td style="padding:8px 12px;border-bottom:1px solid #eee"><a href="mailto:${email}" style="color:#002868">${email}</a></td></tr>` : '',
      `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#002868">Topic</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${topicLabels[topic] ?? topic}</td></tr>`,
      `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#002868">Preferred Time</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${scheduleStr}</td></tr>`,
      message ? `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#002868">Message</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${message}</td></tr>` : '',
      `</table>`,
      uploadedUrls.length > 0
        ? `<p style="font-family:sans-serif;font-size:13px;color:#666;margin-top:16px"><strong>${uploadedUrls.length} attachment(s) uploaded:</strong><br/>${uploadedUrls.map((u) => `<a href="${u}" style="color:#002868">${u.split('/').pop()}</a>`).join('<br/>')}</p>`
        : '',
      `<hr style="border:none;border-top:1px solid #d9d9d9;margin:24px 0"/>`,
      `<p style="font-family:sans-serif;font-size:11px;color:#999">Sent from trytopnotchdoors.com callback form</p>`,
    ].filter(Boolean).join('\n');

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: 'Top-Notch Garage Doors <onboarding@resend.dev>',
          to: notifyEmail,
          subject: `Callback Request: ${topicLabels[topic] ?? topic} — ${name}`,
          html: emailLines,
        });
      } catch (e) {
        console.error('[Callback] Email send failed:', e);
      }
    } else {
      console.log('[Callback] No RESEND_API_KEY — email skipped. Submission stored.');
    }

    console.log('[Callback]', JSON.stringify(submission, null, 2));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request.' },
      { status: 400 },
    );
  }
}
