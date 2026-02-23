import Link from "next/link"
import Image from "next/image"
import { TrendingUp } from "lucide-react"
import type { Article } from "@/types/news"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

interface TrendingNewsProps {
  articles: Article[]
}

export function TrendingNews({ articles }: TrendingNewsProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-red-500" />
        <h2 className="text-2xl font-bold">Trending</h2>
      </div>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <Link
            key={article.slug}
            href={`/news/${article.slug}`}
            className="group flex gap-3 items-start"
          >
            {/* Number */}
            <span className="text-2xl font-bold text-muted-foreground/40 leading-none mt-1 min-w-[28px]">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Thumbnail */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary/80 transition-colors">
                {article.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDate(article.publishedAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
