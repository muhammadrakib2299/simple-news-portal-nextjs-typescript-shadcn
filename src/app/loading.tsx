import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="py-10 space-y-8">
      {/* Hero skeleton */}
      <Skeleton className="w-full h-[300px] rounded-xl" />

      {/* Content skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="w-full h-48 rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}
