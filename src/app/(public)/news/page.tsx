import type { Metadata } from "next"
import { NewsCard } from "@/components/news/NewsCard"
import { CategoryFilter } from "@/components/news/CategoryFilter"
import { Pagination } from "@/components/news/Pagination"
import { getTopHeadlines } from "@/lib/api"
import type { Category } from "@/types/news"

export const metadata: Metadata = {
  title: "Latest News",
  description:
    "Browse the latest news articles across all categories including business, technology, sports, entertainment, health, and science.",
}

const PAGE_SIZE = 9
const validCategories: Category[] = [
  "general",
  "business",
  "technology",
  "sports",
  "entertainment",
  "health",
  "science",
]

interface NewsPageProps {
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams
  const categoryParam = params.category
  const category = validCategories.includes(categoryParam as Category)
    ? (categoryParam as Category)
    : undefined
  const page = Math.max(1, Number(params.page) || 1)

  const { articles, totalResults } = await getTopHeadlines(category, page, PAGE_SIZE)
  const totalPages = Math.ceil(totalResults / PAGE_SIZE)

  // Build search params for pagination links
  const paginationParams: Record<string, string> = {}
  if (category) paginationParams.category = category

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Latest News</h1>
        <p className="text-muted-foreground mt-1">
          Stay informed with the latest stories from around the world.
        </p>
      </div>

      {/* Category Filter */}
      <CategoryFilter active={category ?? "all"} basePath="/news" />

      {/* News Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            No articles found in this category.
          </p>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        baseUrl="/news"
        searchParams={paginationParams}
      />
    </div>
  )
}
