interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  if (!content) {
    return null
  }

  return (
    <div
      className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-ocean-950 prose-a:text-teal-700 prose-img:rounded-xl"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}