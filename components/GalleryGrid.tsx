import type { CosmicMedia } from '@/types'

interface GalleryGridProps {
  images: CosmicMedia[]
  title: string
}

export default function GalleryGrid({ images, title }: GalleryGridProps) {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((image, index) => (
        <div key={index} className="aspect-square overflow-hidden rounded-xl">
          <img
            src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={`${title} gallery photo ${index + 1}`}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      ))}
    </div>
  )
}