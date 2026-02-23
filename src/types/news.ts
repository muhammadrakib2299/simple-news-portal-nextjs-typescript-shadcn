export type Category =
  | "general"
  | "business"
  | "technology"
  | "sports"
  | "entertainment"
  | "health"
  | "science"

export interface Article {
  slug: string
  title: string
  description: string
  content: string
  author: string
  source: string
  category: Category
  imageUrl: string
  publishedAt: string
  url: string
  isFeatured?: boolean
  isTrending?: boolean
}

export interface NewsApiResponse {
  totalResults: number
  articles: Article[]
}

export interface SearchParams {
  query?: string
  category?: Category
  page?: number
  pageSize?: number
}

export interface CategoryInfo {
  name: string
  slug: Category
  description: string
  color: string
}
