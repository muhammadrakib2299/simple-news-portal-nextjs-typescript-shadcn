import type { Metadata } from "next"
import { SearchX } from "lucide-react"
import { SearchBar } from "@/components/shared/SearchBar"
import { NewsCard } from "@/components/news/NewsCard"
import { Pagination } from "@/components/news/Pagination"
import { searchNews } from "@/lib/api"

const PAGE_SIZE = 9

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `Search: ${q}` : "Search",
    description: q
      ? `Search results for "${q}"`
      : "Search for news articles across all categories.",
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q?.trim() ?? ""
  const page = Math.max(1, Number(params.page) || 1)

  const { articles, totalResults } = query
    ? searchNews(query, page, PAGE_SIZE)
    : { articles: [], totalResults: 0 }

  const totalPages = Math.ceil(totalResults / PAGE_SIZE)

  const paginationParams: Record<string, string> = {}
  if (query) paginationParams.q = query

  return (
    <div className="py-8 space-y-8">
      {/* Header + Search */}
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">Search News</h1>
        <SearchBar autoSubmit />
      </div>

      {/* Results */}
      {query ? (
        <>
          <p className="text-sm text-muted-foreground">
            {totalResults > 0
              ? `Found ${totalResults} result${totalResults !== 1 ? "s" : ""} for `
              : "No results for "}
            <span className="font-medium text-foreground">&quot;{query}&quot;</span>
          </p>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <NewsCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <SearchX className="h-12 w-12 text-muted-foreground/40 mb-4" />
              <p className="text-lg font-medium">No articles found</p>
              <p className="text-sm text-muted-foreground mt-1 max-w-md">
                Try searching with different keywords or browse by category.
              </p>
            </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            baseUrl="/search"
            searchParams={paginationParams}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-muted-foreground">
            Enter a keyword to search across all news articles.
          </p>
        </div>
      )}
    </div>
  )
}
