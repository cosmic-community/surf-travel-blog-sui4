import type { Metadata } from 'next'
import { getAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export const metadata: Metadata = {
  title: 'Authors',
  description: 'Meet the surfers and writers sharing their travel stories.',
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <h1 className="font-serif text-4xl font-bold text-ocean-950 sm:text-5xl">Authors</h1>
        <p className="mt-4 text-lg text-ocean-600">
          Meet the traveling surfers and storytellers behind our trip reports and destination guides.
        </p>
      </div>

      {authors.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        <p className="text-ocean-600">No authors added yet.</p>
      )}
    </div>
  )
}