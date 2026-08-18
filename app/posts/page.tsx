import type { Metadata } from 'next'
import { getPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = {
  title: 'Stories',
  description: 'Read the latest surf trip stories and travel tales from surfers around the world.',
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mb-12 max-w-2xl">
        <h1 className="font-serif text-4xl font-bold text-ocean-950 sm:text-5xl">Stories</h1>
        <p className="mt-4 text-lg text-ocean-600">
          Trip reports, travel tales, and everything in between from our community of traveling surfers.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-ocean-600">No stories published yet. Check back soon!</p>
      )}
    </div>
  )
}