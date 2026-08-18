import type { Metadata } from 'next'
import { getDestinations } from '@/lib/cosmic'
import DestinationCard from '@/components/DestinationCard'

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Explore surf destinations around the world with guides on country, best season, and wave difficulty.',
}

export default async function DestinationsPage() {
  const destinations = await getDestinations()

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <h1 className="font-serif text-4xl font-bold text-ocean-950 sm:text-5xl">Destinations</h1>
        <p className="mt-4 text-lg text-ocean-600">
          Discover the best surf spots on the planet, from beginner-friendly beach breaks to expert-only reefs.
        </p>
      </div>

      {destinations.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      ) : (
        <p className="text-ocean-600">No destinations added yet.</p>
      )}
    </div>
  )
}