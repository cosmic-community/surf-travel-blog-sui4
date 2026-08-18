// app/posts/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getPosts, getMetafieldValue } from '@/lib/cosmic'
import MarkdownContent from '@/components/MarkdownContent'
import WaveDifficultyBadge from '@/components/WaveDifficultyBadge'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return { title: 'Story Not Found' }
  }

  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const imageUrl = post.metadata?.featured_image?.imgix_url

  return {
    title: post.title,
    description: excerpt || post.title,
    openGraph: {
      title: post.title,
      description: excerpt || post.title,
      images: imageUrl ? [`${imageUrl}?w=1200&h=630&fit=crop&auto=format,compress`] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const imageUrl = post.metadata?.featured_image?.imgix_url
  const content = getMetafieldValue(post.metadata?.content)
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
    <article>
      {imageUrl && (
        <div className="relative h-[50vh] min-h-[350px] w-full overflow-hidden">
          <img
            src={`${imageUrl}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt={post.title}
            width={1200}
            height={700}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-ocean-950/20 to-transparent" />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-ocean-500">
          {destination && (
            <Link
              href={`/destinations/${destination.slug}`}
              className="rounded-full bg-teal-50 px-3 py-1 font-semibold uppercase tracking-wide text-teal-700 hover:bg-teal-100"
            >
              {destination.title}
            </Link>
          )}
          {destination?.metadata?.wave_difficulty && (
            <WaveDifficultyBadge difficulty={getMetafieldValue(destination.metadata.wave_difficulty)} />
          )}
          {formattedDate && <span>{formattedDate}</span>}
        </div>

        <h1 className="font-serif text-4xl font-bold text-ocean-950 sm:text-5xl">{post.title}</h1>

        {author && (
          <Link
            href={`/authors/${author.slug}`}
            className="mt-6 flex items-center gap-3 text-sm font-medium text-ocean-700 hover:text-ocean-950"
          >
            {author.metadata?.photo?.imgix_url ? (
              <img
                src={`${author.metadata.photo.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
                alt={author.title}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-ocean-100" />
            )}
            <span>By {author.title}</span>
          </Link>
        )}

        <div className="mt-10">
          <MarkdownContent content={content} />
        </div>
      </div>
    </article>
  )
}