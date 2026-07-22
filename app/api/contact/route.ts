import { NextResponse } from 'next/server';

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

    const lines = [
      `New contact form submission from trytopnotchdoors.com`,
      ``,
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      service ? `Service: ${service}` : null,
      message ? `\nMessage:\n${message}` : null,
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
