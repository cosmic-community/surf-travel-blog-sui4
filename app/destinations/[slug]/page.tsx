// app/destinations/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getDestination,
  getDestinations,
  getPostsByDestination,
  getMetafieldValue,
} from '@/lib/cosmic'
import GalleryGrid from '@/components/GalleryGrid'
import WaveDifficultyBadge from '@/components/WaveDifficultyBadge'
import PostCard from '@/components/PostCard'

interface DestinationPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const destinations = await getDestinations()
  return destinations.map((destination) => ({ slug: destination.slug }))
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params
  const destination = await getDestination(slug)

  if (!destination) {
    return { title: 'Destination Not Found' }
  }

  const description = getMetafieldValue(destination.metadata?.description)
  const imageUrl = destination.metadata?.hero_image?.imgix_url

  return {
    title: destination.title,
    description: description || destination.title,
    openGraph: {
      title: destination.title,
      description: description || destination.title,
      images: imageUrl ? [`${imageUrl}?w=1200&h=630&fit=crop&auto=format,compress`] : [],
    },
  }
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params
  const destination = await getDestination(slug)

  if (!destination) {
    notFound()
  }

  const posts = await getPostsByDestination(destination.id)

  const imageUrl = destination.metadata?.hero_image?.imgix_url
  const description = getMetafieldValue(destination.metadata?.description)
  const country = getMetafieldValue(destination.metadata?.country)
  const bestSeason = getMetafieldValue(destination.metadata?.best_season)
  const difficulty = getMetafieldValue(destination.metadata?.wave_difficulty)
  const gallery = destination.metadata?.gallery || []

  return (
    <div>
      <div className="relative h-[45vh] min-h-[320px] w-full overflow-hidden">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt={destination.title}
            width={1200}
            height={700}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-ocean-100" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-ocean-950/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 lg:px-8">
          <div className="mx-auto max-w-5xl">
            {country && (
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-sand-200">
                {country}
              </p>
            )}
            <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">{destination.title}</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          {difficulty && <WaveDifficultyBadge difficulty={difficulty} />}
          {bestSeason && (
            <span className="rounded-full bg-sand-100 px-3 py-1 text-xs font-semibold text-sand-700">
              Best Season: {bestSeason}
            </span>
          )}
        </div>

        {description && (
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ocean-700">{description}</p>
        )}

        {gallery.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 font-serif text-2xl font-bold text-ocean-950">Photo Gallery</h2>
            <GalleryGrid images={gallery} title={destination.title} />
          </div>
        )}

        {posts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 font-serif text-2xl font-bold text-ocean-950">
              Stories from {destination.title}
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}