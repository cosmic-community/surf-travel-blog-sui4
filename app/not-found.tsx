import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif text-5xl font-bold text-ocean-950">404</h1>
      <p className="mt-4 max-w-md text-lg text-ocean-600">
        Looks like this page paddled out and never came back. Let&apos;s get you back to shore.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-ocean-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ocean-800"
      >
        Back to Home
      </Link>
    </div>
  )
}