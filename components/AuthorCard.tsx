import Link from 'next/link'
import type { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const photoUrl = author.metadata?.photo?.imgix_url
  const bio = getMetafieldValue(author.metadata?.bio)
  const homeBreak = getMetafieldValue(author.metadata?.home_break)

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-ocean-100 transition-shadow hover:shadow-lg"
    >
      {photoUrl ? (
        <img
          src={`${photoUrl}?w=300&h=300&fit=crop&auto=format,compress`}
          alt={author.title}
          width={150}
          height={150}
          className="h-28 w-28 rounded-full object-cover ring-4 ring-ocean-50"
        />
      ) : (
        <div className="h-28 w-28 rounded-full bg-ocean-100" />
      )}
      <h3 className="mt-4 font-serif text-xl font-bold text-ocean-950 group-hover:text-ocean-700">
        {author.title}
      </h3>
      {homeBreak && <p className="mt-1 text-sm font-medium text-teal-700">🏄 {homeBreak}</p>}
      {bio && <p className="mt-3 line-clamp-3 text-sm text-ocean-600">{bio}</p>}
    </Link>
  )
}