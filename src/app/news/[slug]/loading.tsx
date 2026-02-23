import { Skeleton } from "@/components/ui/skeleton"

export default function ArticleLoading() {
  return (
    <div className="py-8">
      <Skeleton className="h-8 w-32 mb-6" />

      <div className="max-w-3xl mx-auto">
        {/* Meta */}
        <div className="flex gap-3 mb-4">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-28" />
        </div>

        {/* Title */}
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-3/4 mb-2" />
        <Skeleton className="h-4 w-32 mb-6" />

        {/* Image */}
        <Skeleton className="aspect-video w-full rounded-xl mb-8" />

        {/* Content paragraphs */}
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
