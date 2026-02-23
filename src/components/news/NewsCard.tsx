import Link from "next/link"
import Image from "next/image"
import { Clock, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { CategoryBadge } from "@/components/news/CategoryBadge"
import type { Article } from "@/types/news"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

interface NewsCardProps {
  article: Article
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Link href={`/news/${article.slug}`} className="group">
      <Card className="overflow-hidden py-0 gap-0 h-full transition-shadow hover:shadow-md">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <CategoryBadge category={article.category} />
          </div>
        </div>

        {/* Content */}
        <CardContent className="flex flex-col gap-2 p-4">
          <h3 className="font-semibold leading-snug line-clamp-2 group-hover:text-primary/80 transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {article.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-2">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(article.publishedAt)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
