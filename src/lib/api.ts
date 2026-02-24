import { prisma } from "@/lib/prisma"
import type { Article, Category, CategoryInfo, NewsApiResponse } from "@/types/news"

const DEFAULT_PAGE_SIZE = 9

/**
 * Convert a Prisma article (with included author + category) to the public Article type.
 */
function toPubArticle(row: {
  slug: string
  title: string
  description: string
  content: string
  imageUrl: string
  source: string
  isFeatured: boolean
  isTrending: boolean
  publishedAt: Date | null
  author: { name: string | null }
  category: { slug: string }
}): Article {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    content: row.content,
    imageUrl: row.imageUrl,
    source: row.source,
    category: row.category.slug as Category,
    author: row.author.name ?? "Unknown",
    publishedAt: row.publishedAt?.toISOString() ?? new Date().toISOString(),
    url: "#",
    isFeatured: row.isFeatured,
    isTrending: row.isTrending,
  }
}

/** Common include for article queries */
const articleInclude = {
  author: { select: { name: true } },
  category: { select: { slug: true } },
} as const

/**
 * Get top headlines, optionally filtered by category.
 */
export async function getTopHeadlines(
  category?: Category,
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE
): Promise<NewsApiResponse> {
  const where = {
    status: "PUBLISHED" as const,
    ...(category ? { category: { slug: category } } : {}),
  }

  const [totalResults, rows] = await Promise.all([
    prisma.article.count({ where }),
    prisma.article.findMany({
      where,
      include: articleInclude,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ])

  return { totalResults, articles: rows.map(toPubArticle) }
}

/**
 * Get a single article by its slug.
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const row = await prisma.article.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: articleInclude,
  })
  return row ? toPubArticle(row) : null
}

/**
 * Get articles filtered by category.
 */
export async function getNewsByCategory(
  category: Category,
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE
): Promise<NewsApiResponse> {
  return getTopHeadlines(category, page, pageSize)
}

/**
 * Search articles by query string (matches title, description, content, author, category).
 */
export async function searchNews(
  query: string,
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE
): Promise<NewsApiResponse> {
  const q = query.trim()

  if (!q) {
    return { totalResults: 0, articles: [] }
  }

  const where = {
    status: "PUBLISHED" as const,
    OR: [
      { title: { contains: q, mode: "insensitive" as const } },
      { description: { contains: q, mode: "insensitive" as const } },
      { content: { contains: q, mode: "insensitive" as const } },
      { author: { name: { contains: q, mode: "insensitive" as const } } },
      { category: { name: { contains: q, mode: "insensitive" as const } } },
    ],
  }

  const [totalResults, rows] = await Promise.all([
    prisma.article.count({ where }),
    prisma.article.findMany({
      where,
      include: articleInclude,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ])

  return { totalResults, articles: rows.map(toPubArticle) }
}

/**
 * Get the featured article (most recent featured).
 */
export async function getFeaturedArticle(): Promise<Article | null> {
  const row = await prisma.article.findFirst({
    where: { status: "PUBLISHED", isFeatured: true },
    include: articleInclude,
    orderBy: { publishedAt: "desc" },
  })
  return row ? toPubArticle(row) : null
}

/**
 * Get trending articles.
 */
export async function getTrendingNews(limit: number = 5): Promise<Article[]> {
  const rows = await prisma.article.findMany({
    where: { status: "PUBLISHED", isTrending: true },
    include: articleInclude,
    orderBy: { publishedAt: "desc" },
    take: limit,
  })
  return rows.map(toPubArticle)
}

/**
 * Get latest articles (for homepage).
 */
export async function getLatestNews(limit: number = 6): Promise<Article[]> {
  const rows = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    include: articleInclude,
    orderBy: { publishedAt: "desc" },
    take: limit,
  })
  return rows.map(toPubArticle)
}

/**
 * Get all available categories.
 */
export async function getCategories(): Promise<CategoryInfo[]> {
  const rows = await prisma.category.findMany({ orderBy: { name: "asc" } })
  return rows.map((r) => ({
    name: r.name,
    slug: r.slug as unknown as Category,
    description: r.description,
    color: r.color,
  }))
}

/**
 * Get related articles (same category, excluding current).
 */
export async function getRelatedArticles(
  slug: string,
  limit: number = 3
): Promise<Article[]> {
  const current = await prisma.article.findFirst({
    where: { slug, status: "PUBLISHED" },
    select: { categoryId: true },
  })
  if (!current) return []

  const rows = await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      categoryId: current.categoryId,
      slug: { not: slug },
    },
    include: articleInclude,
    orderBy: { publishedAt: "desc" },
    take: limit,
  })
  return rows.map(toPubArticle)
}
