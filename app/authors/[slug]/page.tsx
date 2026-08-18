// app/authors/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAuthor, getAuthors, getPostsByAuthor, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((author) => ({ slug: author.slug }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    return { title: 'Author Not Found' }
  }

  const bio = getMetafieldValue(author.metadata?.bio)

  return {
    title: author.title,
    description: bio || `Stories by ${author.title}`,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)

  const photoUrl = author.metadata?.photo?.imgix_url
  const bio = getMetafieldValue(author.metadata?.bio)
  const homeBreak = getMetafieldValue(author.metadata?.home_break)

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
        {photoUrl ? (
          <img
            src={`${photoUrl}?w=400&h=400&fit=crop&auto=format,compress`}
            alt={author.title}
            width={160}
            height={160}
            className="h-32 w-32 flex-shrink-0 rounded-full object-cover ring-4 ring-ocean-50 sm:h-40 sm:w-40"
          />
        ) : (
          <div className="h-32 w-32 flex-shrink-0 rounded-full bg-ocean-100 sm:h-40 sm:w-40" />
        )}
        <div>
          <h1 className="font-serif text-4xl font-bold text-ocean-950">{author.title}</h1>
          {homeBreak && (
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-teal-700">
              🏄 Home Break: {homeBreak}
            </p>
          )}
          {bio && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ocean-700">{bio}</p>}
        </div>
      </div>

      {posts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 font-serif text-2xl font-bold text-ocean-950">
            Stories by {author.title}
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}