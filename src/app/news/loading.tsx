import { Skeleton } from "@/components/ui/skeleton"
import { NewsCardSkeleton } from "@/components/news/NewsCardSkeleton"

export default function NewsLoading() {
  return (
    <div className="py-8 space-y-8">
      {/* Header skeleton */}
      <div>
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-80 mt-2" />
      </div>

      {/* Filter skeleton */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-md" />
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
