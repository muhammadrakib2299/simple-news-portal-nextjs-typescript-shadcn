"use client"

import { useState } from "react"
import { Link2, Check, Twitter, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareButtonsProps {
  title: string
  slug: string
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/news/${slug}`
      : `/news/${slug}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback silently
    }
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-1">Share:</span>
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleCopy}>
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Link2 className="h-3.5 w-3.5" />
        )}
        <span className="sr-only">Copy link</span>
      </Button>
      <Button variant="outline" size="icon" className="h-8 w-8" asChild>
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <Twitter className="h-3.5 w-3.5" />
          <span className="sr-only">Share on Twitter</span>
        </a>
      </Button>
      <Button variant="outline" size="icon" className="h-8 w-8" asChild>
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
          <Facebook className="h-3.5 w-3.5" />
          <span className="sr-only">Share on Facebook</span>
        </a>
      </Button>
    </div>
  )
}
