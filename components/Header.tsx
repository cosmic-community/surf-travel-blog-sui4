'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Stories' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/authors', label: 'Authors' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-ocean-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-ocean-950">
          <span aria-hidden="true">🌊</span>
          Surf Travel Blog
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ocean-700 transition-colors hover:text-ocean-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ocean-900 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="text-2xl">{isMenuOpen ? '×' : '☰'}</span>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="flex flex-col gap-1 border-t border-ocean-100 bg-white px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ocean-700 hover:bg-ocean-50 hover:text-ocean-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}