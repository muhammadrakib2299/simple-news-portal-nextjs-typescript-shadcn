import { Skeleton } from "@/components/ui/skeleton"
import { NewsCardSkeleton } from "@/components/news/NewsCardSkeleton"

export default function CategoryLoading() {
  return (
    <div className="py-8 space-y-8">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Header skeleton */}
      <div>
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-5 w-96 mt-2" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
