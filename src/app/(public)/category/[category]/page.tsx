import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { NewsCard } from "@/components/news/NewsCard"
import { Pagination } from "@/components/news/Pagination"
import { getNewsByCategory, getCategories } from "@/lib/api"
import type { Category } from "@/types/news"

const validCategories: Category[] = [
  "general",
  "business",
  "technology",
  "sports",
  "entertainment",
  "health",
  "science",
]

const PAGE_SIZE = 9

interface CategoryPageProps {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const categories = await getCategories()
  const cat = categories.find((c) => c.slug === category)

  if (!cat) return { title: "Category Not Found" }

  return {
    title: `${cat.name} News`,
    description: cat.description,
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params
  const sp = await searchParams

  if (!validCategories.includes(category as Category)) {
    notFound()
  }

  const categories = await getCategories()
  const catInfo = categories.find((c) => c.slug === category)!
  const page = Math.max(1, Number(sp.page) || 1)

  const { articles, totalResults } = await getNewsByCategory(
    category as Category,
    page,
    PAGE_SIZE
  )
  const totalPages = Math.ceil(totalResults / PAGE_SIZE)

  return (
    <div className="py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/news" className="hover:text-foreground transition-colors">
          News
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">{catInfo.name}</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{catInfo.name} News</h1>
        <p className="text-muted-foreground mt-1">{catInfo.description}</p>
      </div>

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
            No articles found in this category yet.
          </p>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        baseUrl={`/category/${category}`}
      />
    </div>
  )
}
