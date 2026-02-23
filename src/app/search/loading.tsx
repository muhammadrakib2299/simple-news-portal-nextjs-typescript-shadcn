import { Skeleton } from "@/components/ui/skeleton"
import { NewsCardSkeleton } from "@/components/news/NewsCardSkeleton"

export default function SearchLoading() {
  return (
    <div className="py-8 space-y-8">
      <div className="max-w-2xl">
        <Skeleton className="h-9 w-44 mb-4" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <Skeleton className="h-4 w-56" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
