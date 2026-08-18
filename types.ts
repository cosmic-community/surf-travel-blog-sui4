// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// Reusable media/file metafield shape
export interface CosmicMedia {
  url: string
  imgix_url: string
}

// Authors object type
export interface Author extends CosmicObject {
  type: 'authors'
  metadata: {
    bio?: string
    home_break?: string
    photo?: CosmicMedia
  }
}

// Destinations object type
export interface Destination extends CosmicObject {
  type: 'destinations'
  metadata: {
    description?: string
    country?: string
    best_season?: string
    wave_difficulty?: string
    hero_image?: CosmicMedia
    gallery?: CosmicMedia[]
  }
}

// Posts object type
export interface Post extends CosmicObject {
  type: 'posts'
  metadata: {
    excerpt?: string
    content?: string
    featured_image?: CosmicMedia
    published_date?: string
    author?: Author
    destination?: Destination
  }
}

// Type guards for runtime validation
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts'
}

export function isDestination(obj: CosmicObject): obj is Destination {
  return obj.type === 'destinations'
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors'
}