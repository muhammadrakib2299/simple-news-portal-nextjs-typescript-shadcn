"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Category } from "@/types/news"

const allCategories: { name: string; slug: Category | "all" }[] = [
  { name: "All", slug: "all" },
  { name: "General", slug: "general" },
  { name: "Business", slug: "business" },
  { name: "Technology", slug: "technology" },
  { name: "Sports", slug: "sports" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Health", slug: "health" },
  { name: "Science", slug: "science" },
]

interface CategoryFilterProps {
  active?: string
  basePath?: string
}

export function CategoryFilter({
  active = "all",
  basePath = "/news",
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map((cat) => {
        const isActive = active === cat.slug
        const href =
          cat.slug === "all" ? basePath : `${basePath}?category=${cat.slug}`

        return (
          <Button
            key={cat.slug}
            variant={isActive ? "default" : "outline"}
            size="sm"
            className={cn("capitalize", !isActive && "text-muted-foreground")}
            asChild
          >
            <Link href={href}>{cat.name}</Link>
          </Button>
        )
      })}
    </div>
  )
}
