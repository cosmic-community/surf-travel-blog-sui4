import Link from 'next/link'
import { getPosts, getDestinations } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import PostCard from '@/components/PostCard'
import DestinationCard from '@/components/DestinationCard'

export default async function HomePage() {
  const [posts, destinations] = await Promise.all([getPosts(), getDestinations()])

  const [latestPost, ...otherPosts] = posts
  const featuredPosts = otherPosts.slice(0, 3)
  const featuredDestinations = destinations.slice(0, 3)

  return (
    <div>
      {latestPost && <HeroSection post={latestPost} />}

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-ocean-950 sm:text-4xl">
              Latest Stories
            </h2>
            <p className="mt-2 text-ocean-600">
              Fresh trip reports and surf tales from around the globe.
            </p>
          </div>
          <Link
            href="/posts"
            className="hidden text-sm font-semibold text-teal-700 hover:text-teal-900 sm:block"
          >
            View all stories →
          </Link>
        </div>

        {featuredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-ocean-600">No stories published yet. Check back soon!</p>
        )}
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl font-bold text-ocean-950 sm:text-4xl">
                Popular Destinations
              </h2>
              <p className="mt-2 text-ocean-600">
                Find your next surf trip from our curated destination guides.
              </p>
            </div>
            <Link
              href="/destinations"
              className="hidden text-sm font-semibold text-teal-700 hover:text-teal-900 sm:block"
            >
              View all destinations →
            </Link>
          </div>

          {featuredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredDestinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          ) : (
            <p className="text-ocean-600">No destinations added yet.</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-ocean-950 sm:text-4xl">
          Ready for your next swell?
        </h2>
        <p className="mt-4 text-lg text-ocean-600">
          Explore stories, destination guides, and surfer profiles to plan your perfect surf trip.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/posts"
            className="rounded-full bg-ocean-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ocean-800"
          >
            Read Stories
          </Link>
          <Link
            href="/destinations"
            className="rounded-full border border-ocean-200 px-6 py-3 text-sm font-semibold text-ocean-900 transition-colors hover:bg-ocean-50"
          >
            Browse Destinations
          </Link>
        </div>
      </section>
    </div>
  )
}