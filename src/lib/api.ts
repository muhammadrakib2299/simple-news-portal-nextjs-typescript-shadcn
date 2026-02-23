import { mockArticles, categories } from "@/lib/mock-data"
import type { Article, Category, CategoryInfo, NewsApiResponse } from "@/types/news"

const DEFAULT_PAGE_SIZE = 9

/**
 * Get top headlines, optionally filtered by category.
 */
export function getTopHeadlines(
  category?: Category,
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE
): NewsApiResponse {
  let articles = [...mockArticles]

  if (category) {
    articles = articles.filter((a) => a.category === category)
  }

  // Sort by date (newest first)
  articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  const totalResults = articles.length
  const start = (page - 1) * pageSize
  const paged = articles.slice(start, start + pageSize)

  return { totalResults, articles: paged }
}

/**
 * Get a single article by its slug.
 */
export function getArticleBySlug(slug: string): Article | null {
  return mockArticles.find((a) => a.slug === slug) ?? null
}

/**
 * Get articles filtered by category.
 */
export function getNewsByCategory(
  category: Category,
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE
): NewsApiResponse {
  return getTopHeadlines(category, page, pageSize)
}

/**
 * Search articles by query string (matches title, description, content).
 */
export function searchNews(
  query: string,
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE
): NewsApiResponse {
  const q = query.toLowerCase().trim()

  if (!q) {
    return { totalResults: 0, articles: [] }
  }

  const matched = mockArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q) ||
      a.author.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
  )

  // Sort by date (newest first)
  matched.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  const totalResults = matched.length
  const start = (page - 1) * pageSize
  const paged = matched.slice(start, start + pageSize)

  return { totalResults, articles: paged }
}

/**
 * Get the featured article (most recent featured).
 */
export function getFeaturedArticle(): Article | null {
  const featured = mockArticles
    .filter((a) => a.isFeatured)
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

  return featured[0] ?? null
}

/**
 * Get trending articles.
 */
export function getTrendingNews(limit: number = 5): Article[] {
  return mockArticles
    .filter((a) => a.isTrending)
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit)
}

/**
 * Get latest articles (for homepage).
 */
export function getLatestNews(limit: number = 6): Article[] {
  return [...mockArticles]
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit)
}

/**
 * Get all available categories.
 */
export function getCategories(): CategoryInfo[] {
  return categories
}

/**
 * Get related articles (same category, excluding current).
 */
export function getRelatedArticles(slug: string, limit: number = 3): Article[] {
  const current = getArticleBySlug(slug)
  if (!current) return []

  return mockArticles
    .filter((a) => a.category === current.category && a.slug !== slug)
    .sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit)
}
