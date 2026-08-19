import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the Surf Travel Blog team about story pitches, trip reports, partnerships, or anything else.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <h1 className="font-serif text-4xl font-bold text-ocean-950 sm:text-5xl">Contact</h1>
        <p className="mt-4 text-lg text-ocean-600">
          Story pitch, trip report, partnership idea, or a question about a destination? Send us a
          note and we&apos;ll get back to you.
        </p>
      </div>

      <div className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm sm:p-8">
        <ContactForm />
      </div>
    </div>
  )
}
