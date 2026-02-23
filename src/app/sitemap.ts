import type { MetadataRoute } from "next"
import { mockArticles } from "@/lib/mock-data"

const BASE_URL = "https://dailynews.com"

const categories = [
  "general",
  "business",
  "technology",
  "sports",
  "entertainment",
  "health",
  "science",
]

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "hourly", priority: 1.0 },
    { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ]

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }))

  // Article pages
  const articlePages: MetadataRoute.Sitemap = mockArticles.map((article) => ({
    url: `${BASE_URL}/news/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...categoryPages, ...articlePages]
}
