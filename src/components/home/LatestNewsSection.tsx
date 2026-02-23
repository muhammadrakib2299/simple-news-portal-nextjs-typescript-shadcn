import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewsCard } from "@/components/news/NewsCard"
import type { Article } from "@/types/news"

interface LatestNewsSectionProps {
  articles: Article[]
}

export function LatestNewsSection({ articles }: LatestNewsSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Latest News</h2>
        <Button variant="ghost" size="sm" className="gap-1" asChild>
          <Link href="/news">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
