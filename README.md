# Surf Travel Blog

![App Preview](https://imgix.cosmicjs.com/5f8c8690-9b50-11f1-b808-2563a0e22776-autopilot-photo-1455729552865-3658a5d39692-1787090492784.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A clean, modern, image-forward surf travel blog built with Next.js and [Cosmic](https://www.cosmicjs.com). Discover surf trip stories, destination guides, and the authors behind them.

## Features

- 🌊 Hero homepage featuring the latest surf trip story
- 📝 Stories index with excerpts and featured images
- 📖 Individual story pages with rich-text content, author byline, and linked destination
- 🏝️ Destinations index and detail pages with country, best season, wave difficulty, hero image, and photo gallery
- ✍️ Author pages with bio, home break, and their published stories
- 🎨 Ocean-inspired, editorial design that's fully responsive
- ⚡ Fast, server-rendered pages with SEO metadata on every route
- 🔒 Type-safe TypeScript throughout with strict Cosmic content types

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a84d5f9b4776005423bf9db&clone_repository=6a84d7fbb4776005423bfa39)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: Surf travel blog"

### Code Generation Prompt

> Build a Next.js application for a company website called "Surf Travel Blog". The content is managed in Cosmic CMS with the following object types: destinations, authors, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A surf travel blog website. Homepage with a hero featuring the latest surf trip stories, a posts index with excerpts and featured images, individual post pages rendering rich-text content with author byline and linked destination, a destinations index and destination detail pages showing country, best season, wave difficulty, hero image and photo gallery, and author pages with bio, home break, and their posts. Clean, modern, image-forward editorial design with an ocean-inspired palette. Fully responsive, fast, SEO-friendly with metadata per page. Content comes from the existing Cosmic content types: posts, destinations, authors.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org/) — App Router, Server Components
- [Cosmic](https://www.cosmicjs.com) — Headless CMS for content management
- TypeScript — strict, fully typed content models
- Tailwind CSS — utility-first styling with an ocean-inspired design system

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing `posts`, `destinations`, and `authors` object types

### Installation

```bash
bun install
```

Set the following environment variables (see the environment variable prompts in your dashboard):

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Run the development server:

```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all posts with connected author and destination (depth 1)
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch a single destination by slug
const { object: destination } = await cosmic.objects
  .findOne({ type: 'destinations', slug: 'mentawai-islands' })
  .depth(1)

// Fetch posts related to a destination (query by object id)
const { objects: relatedPosts } = await cosmic.objects
  .find({ type: 'posts', 'metadata.destination': destination.id })
  .depth(1)
```

## Cosmic CMS Integration

This app reads content from three connected Cosmic object types:

- **destinations** — `description`, `country`, `best_season`, `wave_difficulty`, `hero_image`, `gallery`
- **authors** — `bio`, `home_break`, `photo`
- **posts** — `excerpt`, `content`, `featured_image`, `published_date`, `author` (object metafield), `destination` (object metafield)

All Cosmic API calls happen in Server Components via `lib/cosmic.ts`, keeping your API keys secure on the server.

## Deployment Options

### Vercel

1. Push this repository to GitHub
2. Import the project into [Vercel](https://vercel.com)
3. Add the environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push this repository to GitHub
2. Import the project into [Netlify](https://www.netlify.com)
3. Set the build command to `bun run build` and publish directory to `.next`
4. Add the environment variables in the Netlify dashboard
5. Deploy

For production, set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in your hosting platform's environment variable settings.
<!-- README_END -->