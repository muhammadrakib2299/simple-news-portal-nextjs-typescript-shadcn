import { Badge } from "@/components/ui/badge"
import type { Category } from "@/types/news"
import { cn } from "@/lib/utils"

const categoryColors: Record<Category, string> = {
  general: "bg-slate-500 hover:bg-slate-600",
  business: "bg-blue-500 hover:bg-blue-600",
  technology: "bg-violet-500 hover:bg-violet-600",
  sports: "bg-green-500 hover:bg-green-600",
  entertainment: "bg-pink-500 hover:bg-pink-600",
  health: "bg-red-500 hover:bg-red-600",
  science: "bg-amber-500 hover:bg-amber-600",
}

interface CategoryBadgeProps {
  category: Category
  className?: string
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <Badge
      className={cn(
        "text-white border-transparent capitalize",
        categoryColors[category],
        className
      )}
    >
      {category}
    </Badge>
  )
}
