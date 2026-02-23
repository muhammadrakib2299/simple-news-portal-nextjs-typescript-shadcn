import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryBadge } from "@/components/news/CategoryBadge"
import type { Article } from "@/types/news"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

interface HeroSectionProps {
  article: Article
}

export function HeroSection({ article }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-xl">
      <Link href={`/news/${article.slug}`} className="group block">
        {/* Background image */}
        <div className="relative aspect-[16/7] sm:aspect-[16/6] lg:aspect-[16/5]">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="100vw"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
            <div className="max-w-2xl space-y-3">
              <CategoryBadge category={article.category} />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                {article.title}
              </h1>
              <p className="text-sm sm:text-base text-white/80 line-clamp-2 hidden sm:block">
                {article.description}
              </p>
              <div className="flex items-center gap-4 text-xs sm:text-sm text-white/70">
                <span>{article.author}</span>
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="gap-1 mt-2 pointer-events-none"
              >
                Read Full Story
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </section>
  )
}
