import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CONTACT_EMAIL = 'tony@cosmicjs.com'

type ContactPayload = {
  name?: unknown
  email?: unknown
  subject?: unknown
  message?: unknown
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
  let payload: ContactPayload

  try {
    payload = (await request.json()) as ContactPayload
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = asString(payload.name)
  const email = asString(payload.email)
  const subject = asString(payload.subject)
  const message = asString(payload.message)

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Name, email, and message are required.' },
      { status: 400 }
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error('Contact form error: RESEND_API_KEY is not set.')
    return NextResponse.json(
      { error: 'Email service is not configured. Please try again later.' },
      { status: 500 }
    )
  }

  const emailSubject = subject
    ? `Surf Travel Blog contact: ${subject}`
    : `Surf Travel Blog contact from ${name}`

  const html = `
    <div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin-bottom: 16px;">New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `

  const text = [
    'New contact form submission',
    `Name: ${name}`,
    `Email: ${email}`,
    subject ? `Subject: ${subject}` : '',
    '',
    message,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_EMAIL,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: emailSubject,
        html,
        text,
      }),
    })

    if (!response.ok) {
      const detail = await response.text()
      console.error('Resend API error:', response.status, detail)
      return NextResponse.json(
        { error: 'We could not send your message. Please try again later.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'We could not send your message. Please try again later.' },
      { status: 500 }
    )
  }
}
