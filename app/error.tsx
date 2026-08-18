'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-serif text-3xl font-bold text-ocean-950">Wipeout!</h1>
      <p className="mt-4 max-w-md text-ocean-600">
        Something went wrong while loading this page. Give it another shot.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-ocean-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ocean-800"
      >
        Try Again
      </button>
    </div>
  )
}