export const dynamic = "force-dynamic"

import { HeroSection } from "@/components/home/HeroSection"
import { LatestNewsSection } from "@/components/home/LatestNewsSection"
import { CategorySection } from "@/components/home/CategorySection"
import { NewsletterSection } from "@/components/home/NewsletterSection"
import { TrendingNews } from "@/components/news/TrendingNews"
import {
  getFeaturedArticle,
  getLatestNews,
  getTrendingNews,
  getCategories,
} from "@/lib/api"

export default async function Home() {
  const [featured, latest, trending, categories] = await Promise.all([
    getFeaturedArticle(),
    getLatestNews(6),
    getTrendingNews(5),
    getCategories(),
  ])

  return (
    <div className="py-6 space-y-12">
      {/* Hero - Featured Article */}
      {featured && <HeroSection article={featured} />}

      {/* Latest News + Trending Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <LatestNewsSection articles={latest} />
        <aside className="hidden lg:block">
          <TrendingNews articles={trending} />
        </aside>
      </div>

      {/* Browse by Category */}
      <CategorySection categories={categories} />

      {/* Newsletter CTA */}
      <NewsletterSection />
    </div>
  )
}
