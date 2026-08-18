import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ocean-100 bg-ocean-950 text-sand-100">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-white">Surf Travel Blog</h3>
            <p className="mt-2 text-sm text-sand-300">
              Stories, destinations, and waves from surfers around the world.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-sand-200">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/posts" className="hover:text-white">
                  Stories
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-white">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/authors" className="hover:text-white">
                  Authors
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-sand-200">About</h4>
            <p className="mt-3 text-sm text-sand-300">
              Powered by Cosmic. Built for surfers who love to travel and tell stories.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-ocean-800 pt-6 text-center text-xs text-sand-400">
          © {year} Surf Travel Blog. All rights reserved.
        </div>
      </div>
    </footer>
  )
}