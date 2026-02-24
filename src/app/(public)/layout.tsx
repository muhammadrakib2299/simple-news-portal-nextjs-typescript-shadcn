import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import { ScrollToTop } from "@/components/shared/ScrollToTop"
import { BackToTop } from "@/components/shared/BackToTop"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:border focus:shadow-sm"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <Navbar />
      <main
        id="main-content"
        className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {children}
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
