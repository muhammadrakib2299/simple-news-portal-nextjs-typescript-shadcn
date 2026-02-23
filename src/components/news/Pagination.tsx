import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  searchParams?: Record<string, string>
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams = {},
}: PaginationProps) {
  if (totalPages <= 1) return null

  function buildUrl(page: number) {
    const params = new URLSearchParams(searchParams)
    if (page > 1) {
      params.set("page", String(page))
    } else {
      params.delete("page")
    }
    const qs = params.toString()
    return qs ? `${baseUrl}?${qs}` : baseUrl
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        asChild={currentPage > 1}
      >
        {currentPage > 1 ? (
          <Link href={buildUrl(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Link>
        ) : (
          <span>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </span>
        )}
      </Button>

      <span className="text-sm text-muted-foreground px-3">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage >= totalPages}
        asChild={currentPage < totalPages}
      >
        {currentPage < totalPages ? (
          <Link href={buildUrl(currentPage + 1)}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        ) : (
          <span>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </span>
        )}
      </Button>
    </div>
  )
}
