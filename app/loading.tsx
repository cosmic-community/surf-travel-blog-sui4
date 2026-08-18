export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-ocean-200 border-t-ocean-600" />
        <p className="text-sm font-medium text-ocean-600">Catching the next wave...</p>
      </div>
    </div>
  )
}