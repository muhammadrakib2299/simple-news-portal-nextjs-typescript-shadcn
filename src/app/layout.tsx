import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { BackToTop } from "@/components/shared/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Daily News - Your Trusted News Source",
    template: "%s | Daily News",
  },
  description:
    "Stay informed with the latest breaking news, top stories, and in-depth coverage across business, technology, sports, entertainment, health, and science.",
  keywords: [
    "news",
    "breaking news",
    "latest news",
    "world news",
    "technology",
    "sports",
    "business",
  ],
  metadataBase: new URL("https://dailynews.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Daily News",
    title: "Daily News - Your Trusted News Source",
    description:
      "Stay informed with the latest breaking news, top stories, and in-depth coverage.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily News - Your Trusted News Source",
    description:
      "Stay informed with the latest breaking news, top stories, and in-depth coverage.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
    </html>
  );
}
