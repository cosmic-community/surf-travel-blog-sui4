interface WaveDifficultyBadgeProps {
  difficulty: string
}

const DIFFICULTY_STYLES: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-orange-100 text-orange-700',
  expert: 'bg-red-100 text-red-700',
}

export default function WaveDifficultyBadge({ difficulty }: WaveDifficultyBadgeProps) {
  if (!difficulty) {
    return null
  }

  const key = difficulty.toLowerCase()
  const style = DIFFICULTY_STYLES[key] || 'bg-ocean-100 text-ocean-700'

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${style}`}>
      🌊 {difficulty}
    </span>
  )
}