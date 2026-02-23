"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="rounded-xl bg-muted/50 border p-8 sm:p-10">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground">
            <Mail className="h-5 w-5" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Stay Updated</h2>
        <p className="text-muted-foreground mt-2">
          Get the latest news delivered straight to your inbox. No spam, unsubscribe anytime.
        </p>

        {submitted ? (
          <p className="mt-6 text-sm font-medium text-green-600 dark:text-green-400">
            Thanks for subscribing! Check your inbox to confirm.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 mt-6 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        )}
      </div>
    </section>
  )
}
