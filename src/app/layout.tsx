import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
