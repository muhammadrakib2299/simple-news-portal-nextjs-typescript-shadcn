import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CategoryBadge } from "@/components/news/CategoryBadge"
import { ShareButtons } from "@/components/news/ShareButtons"
import { NewsCard } from "@/components/news/NewsCard"
import { getArticleBySlug, getRelatedArticles } from "@/lib/api"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return { title: "Article Not Found" }
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [article.imageUrl],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(slug, 3)

  return (
    <article className="py-8">
      {/* Back button */}
      <Button variant="ghost" size="sm" className="gap-1 mb-6" asChild>
        <Link href="/news">
          <ArrowLeft className="h-4 w-4" />
          Back to News
        </Link>
      </Button>

      <div className="max-w-3xl mx-auto">
        {/* Category + Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <CategoryBadge category={article.category} />
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {formatDate(article.publishedAt)}
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            {article.author}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-2">
          {article.title}
        </h1>

        {/* Source */}
        <p className="text-sm text-muted-foreground mb-6">
          Source: {article.source}
        </p>

        {/* Featured Image */}
        <div className="relative aspect-video overflow-hidden rounded-xl mb-8">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          {article.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed mb-4 text-foreground/90">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Share */}
        <Separator className="my-8" />
        <ShareButtons title={article.title} slug={article.slug} />
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="mt-12">
          <Separator className="mb-8" />
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <NewsCard key={related.slug} article={related} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
