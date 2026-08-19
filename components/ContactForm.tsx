'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      subject: String(formData.get('subject') ?? ''),
      message: String(formData.get('message') ?? ''),
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      form.reset()
      setStatus('success')
    } catch {
      setErrorMessage('Network error. Please try again.')
      setStatus('error')
    }
  }

  const inputClass =
    'mt-2 w-full rounded-lg border border-ocean-200 bg-white px-4 py-3 text-ocean-900 placeholder-ocean-400 outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200'
  const labelClass = 'block text-sm font-medium text-ocean-900'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>
          Subject <span className="font-normal text-ocean-500">(optional)</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="What is this about?"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell us about your trip, a story pitch, or just say hi."
          className={inputClass}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center justify-center rounded-lg bg-ocean-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-ocean-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </button>

        {status === 'success' && (
          <p className="text-sm font-medium text-green-700" role="status">
            Thanks! Your message is on its way.
          </p>
        )}

        {status === 'error' && (
          <p className="text-sm font-medium text-red-700" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  )
}
