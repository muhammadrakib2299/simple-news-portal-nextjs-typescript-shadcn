import type { Metadata } from "next"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard",
    template: "%s | Admin - Daily News",
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SessionProvider>{children}</SessionProvider>
}
