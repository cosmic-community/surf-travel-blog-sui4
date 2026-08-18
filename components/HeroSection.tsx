import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface HeroSectionProps {
  post: Post
}

export default function HeroSection({ post }: HeroSectionProps) {
  const imageUrl = post.metadata?.featured_image?.imgix_url
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const destinationTitle = post.metadata?.destination?.title

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {imageUrl ? (
        <img
          src={`${imageUrl}?w=2400&h=1400&fit=crop&auto=format,compress`}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover"
          width={1200}
          height={700}
        />
      ) : (
        <div className="absolute inset-0 h-full w-full bg-ocean-900" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/90 via-ocean-950/40 to-ocean-950/10" />
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-coral-500/90 px-4 py-1 text-sm font-medium uppercase tracking-wide text-white">
            Latest Story
          </span>
          {destinationTitle && (
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-sand-200">
              {destinationTitle}
            </p>
          )}
          <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          {excerpt && <p className="mt-4 max-w-xl text-lg text-sand-100">{excerpt}</p>}
          <Link
            href={`/posts/${post.slug}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ocean-900 transition-colors hover:bg-sand-100"
          >
            Read the Story
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}