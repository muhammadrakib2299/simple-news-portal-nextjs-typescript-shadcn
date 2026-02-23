"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

const categories = [
  { name: "General", slug: "general" },
  { name: "Business", slug: "business" },
  { name: "Technology", slug: "technology" },
  { name: "Sports", slug: "sports" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Health", slug: "health" },
  { name: "Science", slug: "science" },
]

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle className="text-left text-xl font-bold">
            Daily News
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 mt-6">
          <Link
            href="/"
            onClick={closeMenu}
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Home
          </Link>
          <Link
            href="/news"
            onClick={closeMenu}
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Latest News
          </Link>

          <Separator className="my-2" />
          <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Categories
          </p>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              onClick={closeMenu}
              className="rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors"
            >
              {cat.name}
            </Link>
          ))}

          <Separator className="my-2" />
          <Link
            href="/contact"
            onClick={closeMenu}
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/about"
            onClick={closeMenu}
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            About
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
