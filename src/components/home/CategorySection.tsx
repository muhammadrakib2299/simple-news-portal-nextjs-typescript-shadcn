import Link from "next/link"
import {
  Globe,
  Briefcase,
  Cpu,
  Trophy,
  Clapperboard,
  Heart,
  FlaskConical,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { CategoryInfo } from "@/types/news"
import { cn } from "@/lib/utils"

const categoryIcons: Record<string, React.ReactNode> = {
  general: <Globe className="h-6 w-6" />,
  business: <Briefcase className="h-6 w-6" />,
  technology: <Cpu className="h-6 w-6" />,
  sports: <Trophy className="h-6 w-6" />,
  entertainment: <Clapperboard className="h-6 w-6" />,
  health: <Heart className="h-6 w-6" />,
  science: <FlaskConical className="h-6 w-6" />,
}

interface CategorySectionProps {
  categories: CategoryInfo[]
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/category/${cat.slug}`} className="group">
            <Card className="py-0 gap-0 h-full transition-all hover:shadow-md hover:-translate-y-0.5">
              <CardContent className="flex flex-col items-center text-center gap-3 p-6">
                <div
                  className={cn(
                    "flex items-center justify-center h-12 w-12 rounded-full text-white transition-transform group-hover:scale-110",
                    cat.color
                  )}
                >
                  {categoryIcons[cat.slug]}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 hidden sm:block">
                    {cat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
