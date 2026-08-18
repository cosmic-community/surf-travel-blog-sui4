import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const imageUrl = post.metadata?.featured_image?.imgix_url
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const author = post.metadata?.author
  const destination = post.metadata?.destination
  const publishedDate = post.metadata?.published_date

  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ocean-100 transition-shadow hover:shadow-lg">
      <Link href={`/posts/${post.slug}`} className="block overflow-hidden">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={post.title}
            width={400}
            height={300}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-56 w-full bg-ocean-100" />
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        {destination && (
          <Link
            href={`/destinations/${destination.slug}`}
            className="mb-2 inline-block w-fit rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700 hover:bg-teal-100"
          >
            {destination.title}
          </Link>
        )}
        <h2 className="font-serif text-xl font-bold text-ocean-950">
          <Link href={`/posts/${post.slug}`} className="hover:text-ocean-700">
            {post.title}
          </Link>
        </h2>
        {excerpt && <p className="mt-3 line-clamp-3 flex-1 text-sm text-ocean-700">{excerpt}</p>}
        <div className="mt-4 flex items-center justify-between border-t border-ocean-100 pt-4 text-sm text-ocean-500">
          {author && (
            <Link href={`/authors/${author.slug}`} className="font-medium text-ocean-700 hover:text-ocean-900">
              {author.title}
            </Link>
          )}
          {formattedDate && <span>{formattedDate}</span>}
        </div>
      </div>
    </article>
  )
}