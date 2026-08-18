import Link from 'next/link'
import type { Destination } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import WaveDifficultyBadge from '@/components/WaveDifficultyBadge'

interface DestinationCardProps {
  destination: Destination
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const imageUrl = destination.metadata?.hero_image?.imgix_url
  const country = getMetafieldValue(destination.metadata?.country)
  const bestSeason = getMetafieldValue(destination.metadata?.best_season)
  const difficulty = getMetafieldValue(destination.metadata?.wave_difficulty)
  const description = getMetafieldValue(destination.metadata?.description)

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ocean-100 transition-shadow hover:shadow-lg"
    >
      <div className="relative h-64 w-full overflow-hidden">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={destination.title}
            width={400}
            height={300}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-ocean-100" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-serif text-2xl font-bold text-white">{destination.title}</h3>
          {country && <p className="text-sm font-medium text-sand-100">{country}</p>}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        {description && <p className="line-clamp-2 text-sm text-ocean-700">{description}</p>}
        <div className="mt-auto flex flex-wrap items-center gap-2">
          {difficulty && <WaveDifficultyBadge difficulty={difficulty} />}
          {bestSeason && (
            <span className="rounded-full bg-sand-100 px-3 py-1 text-xs font-medium text-sand-700">
              Best: {bestSeason}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}