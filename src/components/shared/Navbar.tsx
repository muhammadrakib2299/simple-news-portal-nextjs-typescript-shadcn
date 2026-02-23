"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { MobileMenu } from "@/components/shared/MobileMenu"

const categories = [
  {
    name: "General",
    slug: "general",
    description: "Top headlines and breaking stories from around the world.",
  },
  {
    name: "Business",
    slug: "business",
    description: "Markets, finance, economy, and corporate news.",
  },
  {
    name: "Technology",
    slug: "technology",
    description: "Latest in tech, startups, gadgets, and innovation.",
  },
  {
    name: "Sports",
    slug: "sports",
    description: "Scores, highlights, and stories from the sports world.",
  },
  {
    name: "Entertainment",
    slug: "entertainment",
    description: "Movies, music, celebrities, and pop culture.",
  },
  {
    name: "Health",
    slug: "health",
    description: "Wellness, medicine, fitness, and health research.",
  },
  {
    name: "Science",
    slug: "science",
    description: "Discoveries, space, environment, and scientific research.",
  },
]

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav aria-label="Main navigation" className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile Menu + Logo */}
        <div className="flex items-center gap-2">
          <MobileMenu />
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold tracking-tight hover:text-primary/80 transition-colors"
          >
            Daily News
          </Link>
        </div>

        {/* Center: Desktop Menu */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {/* Home */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Latest News */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/news"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  Latest News
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Categories Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2">
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/category/${cat.slug}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {cat.name}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {cat.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Contact */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/contact"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right: Search + Theme Toggle */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
            <Link href="/search">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
