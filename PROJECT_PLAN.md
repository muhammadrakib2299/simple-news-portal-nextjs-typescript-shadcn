# Daily News Portal - Complete Project Plan

## Current Status: ALL PHASES COMPLETE

### All 7 Phases Delivered
- Phase 1: Foundation & Core UI - DONE
- Phase 2: TypeScript Types & API Layer - DONE
- Phase 3: Home Page - DONE
- Phase 4: News Pages (listing + detail + category) - DONE
- Phase 5: Search Functionality - DONE
- Phase 6: Contact & About Pages - DONE
- Phase 7: Polish & Optimization - DONE

### Build Output (10 routes, 0 errors)
```
○ /                    (static)
○ /about               (static)
○ /contact             (static)
ƒ /news                (dynamic)
ƒ /news/[slug]         (dynamic)
ƒ /category/[category] (dynamic)
ƒ /search              (dynamic)
○ /robots.txt          (static)
○ /sitemap.xml         (static)
○ /_not-found           (static)
```

---

## Tech Stack

| Layer          | Technology                          |
| -------------- | ----------------------------------- |
| Framework      | Next.js 16 (App Router)             |
| Language       | TypeScript                          |
| Styling        | Tailwind CSS 4 + Shadcn UI          |
| Icons          | Lucide React                        |
| Theming        | next-themes                         |
| Font           | Geist Sans / Geist Mono             |
| Data Fetching  | Next.js Server Components + fetch   |
| News API       | [NewsAPI.org](https://newsapi.org/) (free tier) or [GNews API](https://gnews.io/) |
| Deployment     | Vercel (recommended)                |

---

## Folder Structure (Final)

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (Navbar + Footer)
│   ├── page.tsx                      # Home page (hero + latest news)
│   ├── globals.css                   # Global styles
│   ├── loading.tsx                   # Global loading skeleton
│   ├── not-found.tsx                 # Custom 404 page
│   ├── error.tsx                     # Global error boundary
│   │
│   ├── news/
│   │   ├── page.tsx                  # All news listing with filters
│   │   ├── loading.tsx               # News listing skeleton
│   │   └── [slug]/
│   │       ├── page.tsx              # Single news article detail
│   │       └── loading.tsx           # Article detail skeleton
│   │
│   ├── category/
│   │   └── [category]/
│   │       ├── page.tsx              # News filtered by category
│   │       └── loading.tsx
│   │
│   ├── search/
│   │   └── page.tsx                  # Search results page
│   │
│   ├── contact/
│   │   └── page.tsx                  # Contact form page
│   │
│   └── about/
│       └── page.tsx                  # About page
│
├── components/
│   ├── shared/
│   │   ├── Navbar.tsx                # (exists) - needs mobile menu fix
│   │   ├── Footer.tsx                # Site footer
│   │   ├── SearchBar.tsx             # Search input component
│   │   ├── ThemeToggle.tsx           # Proper dark mode toggle
│   │   └── MobileMenu.tsx            # Mobile hamburger/sheet menu
│   │
│   ├── news/
│   │   ├── NewsCard.tsx              # News article card
│   │   ├── NewsCardSkeleton.tsx      # Loading skeleton for card
│   │   ├── NewsList.tsx              # Grid of news cards
│   │   ├── FeaturedNews.tsx          # Hero/featured article section
│   │   ├── CategoryBadge.tsx         # Category label badge
│   │   ├── TrendingNews.tsx          # Trending/popular sidebar
│   │   └── BreakingNewsBanner.tsx    # Breaking news ticker/banner
│   │
│   ├── home/
│   │   ├── HeroSection.tsx           # Homepage hero section
│   │   ├── LatestNewsSection.tsx     # Latest news grid
│   │   ├── CategorySection.tsx       # Browse by category
│   │   └── NewsletterSection.tsx     # Email subscribe CTA
│   │
│   └── ui/                           # Shadcn UI components
│       ├── navigation-menu.tsx       # (exists)
│       ├── switch.tsx                # (exists)
│       ├── button.tsx                # (to install)
│       ├── card.tsx                  # (to install)
│       ├── badge.tsx                 # (to install)
│       ├── input.tsx                 # (to install)
│       ├── skeleton.tsx              # (to install)
│       ├── sheet.tsx                 # (to install) - for mobile menu
│       ├── separator.tsx             # (to install)
│       ├── textarea.tsx              # (to install)
│       └── dropdown-menu.tsx         # (to install)
│
├── lib/
│   ├── utils.ts                      # (exists) cn() helper
│   └── api.ts                        # News API fetch functions
│
├── types/
│   └── news.ts                       # TypeScript interfaces
│
└── hooks/
    ├── useDebounce.ts                # Debounce hook for search
    └── useMounted.ts                 # SSR hydration safety hook
```

---

## Phase-by-Phase Implementation

### Phase 1: Fix Foundation & Core UI Components

**Goal:** Fix existing issues and install necessary Shadcn components.

#### Tasks:
1. **Wire up dark mode properly**
   - Use `next-themes` `ThemeProvider` in `layout.tsx`
   - Connect the Switch in Navbar to `useTheme()` hook
   - Add `suppressHydrationWarning` to `<html>` tag

2. **Install required Shadcn UI components**
   ```bash
   npx shadcn@latest add button card badge input skeleton sheet separator textarea dropdown-menu
   ```

3. **Add mobile responsive menu**
   - Create `MobileMenu.tsx` using Shadcn `Sheet` component
   - Hamburger icon button (visible on mobile, hidden on desktop)
   - Slide-out drawer with all nav links

4. **Create Footer component**
   - Site branding & description
   - Quick links (Home, News, Categories, Contact, About)
   - Social media icon links
   - Copyright notice
   - Add to root `layout.tsx`

5. **Create custom 404 page** (`not-found.tsx`)
6. **Create global error boundary** (`error.tsx`)
7. **Update site metadata** in layout (title, description, open graph)

---

### Phase 2: TypeScript Types & API Layer

**Goal:** Define data types and create the news fetching layer.

#### Types (`src/types/news.ts`)
```typescript
export interface Article {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  source: string;
  category: Category;
  imageUrl: string;
  publishedAt: string;
  url: string;
}

export type Category =
  | "general"
  | "business"
  | "technology"
  | "sports"
  | "entertainment"
  | "health"
  | "science";

export interface NewsApiResponse {
  totalResults: number;
  articles: Article[];
}

export interface SearchParams {
  query?: string;
  category?: Category;
  page?: number;
  pageSize?: number;
}
```

#### API Functions (`src/lib/api.ts`)
- `getTopHeadlines(category?, page?)` - Fetch top headlines
- `searchNews(query, page?)` - Search articles by keyword
- `getArticleBySlug(slug)` - Get single article
- `getCategories()` - Return available categories
- Error handling with proper TypeScript return types

#### API Choice (pick one):
| API            | Free Tier           | Notes                          |
| -------------- | ------------------- | ------------------------------ |
| NewsAPI.org    | 100 req/day         | Best data, dev only on free    |
| GNews.io       | 100 req/day         | Works in production on free    |
| NewsData.io    | 200 req/day         | Good free tier                 |
| Mock/Static    | Unlimited           | Good for demo/portfolio        |

> **Recommendation:** Start with **mock/static JSON data** for development, then swap to a real API later. This way the UI works without API limits.

---

### Phase 3: Home Page

**Goal:** Build a complete, visually appealing homepage.

#### Sections (top to bottom):
1. **Breaking News Banner** (optional)
   - Horizontal scrolling ticker for breaking news
   - Red accent color, auto-scroll

2. **Hero / Featured Article**
   - Large featured image with overlay text
   - Title, description, category badge, read more button
   - Full-width or 2/3 + 1/3 layout

3. **Latest News Grid**
   - Heading: "Latest News"
   - 3-column responsive grid of `NewsCard` components
   - Each card: image, category badge, title, excerpt, date, author
   - "View All News" button at bottom

4. **Category Browse Section**
   - Heading: "Browse by Category"
   - Grid of category cards with icons
   - Categories: General, Business, Technology, Sports, Entertainment, Health, Science

5. **Trending / Most Read Sidebar or Section**
   - Numbered list of trending articles
   - Small thumbnail + title + date

6. **Newsletter CTA**
   - Email input + subscribe button
   - Short description text

---

### Phase 4: News Pages

**Goal:** Build the news listing and detail pages.

#### News Listing Page (`/news`)
- Page title & description
- **Filter bar:** Category tabs/buttons to filter
- **Search bar** at the top
- **News grid:** Responsive grid of `NewsCard` components
- **Pagination** or "Load More" button
- **Loading skeleton** while fetching

#### Single Article Page (`/news/[slug]`)
- Back button to go to news list
- Article image (full width or contained)
- Category badge + published date + author
- Article title (large heading)
- Article content (formatted paragraphs)
- Share buttons (copy link, Twitter/X, Facebook)
- "Related Articles" section at bottom
- Loading skeleton

#### Category Page (`/category/[category]`)
- Category name as heading
- Filtered news grid (same layout as `/news`)
- Breadcrumb: Home > Category > [Name]

---

### Phase 5: Search Functionality

**Goal:** Allow users to search for news articles.

#### Implementation:
1. **SearchBar component** in Navbar (desktop) and mobile menu
2. **Search results page** (`/search?q=query`)
   - Shows search query at top
   - Results in same grid layout
   - "No results found" state
   - Loading skeleton
3. **useDebounce hook** for search input (300ms delay)
4. Use URL search params (`useSearchParams`) for shareable URLs

---

### Phase 6: Contact & About Pages

#### Contact Page (`/contact`)
- Page heading & description
- Contact form:
  - Name (input)
  - Email (input)
  - Subject (input)
  - Message (textarea)
  - Submit button
- Form validation (client-side)
- Success/error toast notification
- Optional: contact info sidebar (email, phone, address)

#### About Page (`/about`)
- About the news portal
- Mission/vision text
- Team section (optional)
- Simple static content page

---

### Phase 7: Polish & Optimization

**Goal:** Final touches for production readiness.

#### Tasks:
1. **SEO & Metadata**
   - Dynamic `metadata` for each page using `generateMetadata()`
   - Open Graph images for social sharing
   - `robots.txt` and `sitemap.xml`

2. **Performance**
   - Use `next/image` for all images with proper sizes
   - Implement loading skeletons for every data-fetching page
   - Lazy load below-the-fold sections

3. **Accessibility**
   - Proper heading hierarchy (h1 > h2 > h3)
   - Alt text on all images
   - Keyboard navigation support
   - ARIA labels where needed

4. **Responsive Design Audit**
   - Test on mobile (375px), tablet (768px), desktop (1280px+)
   - Ensure all grids collapse properly
   - Touch-friendly tap targets

5. **Final UI Polish**
   - Consistent spacing and typography
   - Smooth page transitions
   - Hover/focus states on all interactive elements
   - Scroll to top on navigation

---

## Page-by-Page Summary

| Page                  | Route                | Status      | Priority |
| --------------------- | -------------------- | ----------- | -------- |
| Home                  | `/`                  | Done        | High     |
| News Listing          | `/news`              | Done        | High     |
| Article Detail        | `/news/[slug]`       | Done        | High     |
| Category Filter       | `/category/[category]`| Done       | Medium   |
| Search Results        | `/search`            | Done        | Medium   |
| Contact               | `/contact`           | Done        | Medium   |
| About                 | `/about`             | Done        | Low      |
| 404 Not Found         | `*`                  | Done        | Low      |
| robots.txt            | `/robots.txt`        | Done        | Low      |
| sitemap.xml           | `/sitemap.xml`       | Done        | Low      |

---

## Component Checklist

### Shared Components
- [x] Navbar (mobile menu + Categories dropdown + theme toggle + search icon)
- [x] Footer (brand, quick links, categories, contact info)
- [x] SearchBar (with debounce + auto-submit)
- [x] ThemeToggle (sun/moon icon button via next-themes)
- [x] MobileMenu (Sheet-based slide-out drawer)
- [x] ThemeProvider (next-themes wrapper)
- [x] ScrollToTop (auto scroll on route change)
- [x] BackToTop (floating button after 400px scroll)
- [x] Skip to content link (accessibility)

### News Components
- [x] NewsCard (image, badge, title, excerpt, author, date)
- [x] NewsCardSkeleton (loading placeholder)
- [x] CategoryBadge (7 category-specific colors)
- [x] CategoryFilter (pill-style filter tabs)
- [x] TrendingNews (numbered list with thumbnails)
- [x] ShareButtons (copy link, Twitter, Facebook)
- [x] Pagination (prev/next with page counter)

### Home Sections
- [x] HeroSection (featured article with image overlay)
- [x] LatestNewsSection (3-column grid + View All)
- [x] CategorySection (4-column grid with icons)
- [x] NewsletterSection (email subscribe CTA)

### Contact Components
- [x] ContactForm (validated form with success state)

---

## Navbar (Updated)

**Nav Items:**
- Home
- Latest News
- Categories (dropdown): General, Business, Technology, Sports, Entertainment, Health, Science
- Contact
- Search icon
- Dark mode toggle (sun/moon)
- Mobile hamburger menu (Sheet-based)

---

## Color Palette Suggestion

Already using **zinc** base from Shadcn. Recommended accent colors for news categories:

| Category      | Color     | Tailwind Class     |
| ------------- | --------- | ------------------ |
| General       | Slate     | `bg-slate-500`     |
| Business      | Blue      | `bg-blue-500`      |
| Technology    | Violet    | `bg-violet-500`    |
| Sports        | Green     | `bg-green-500`     |
| Entertainment | Pink      | `bg-pink-500`      |
| Health        | Red       | `bg-red-500`       |
| Science       | Amber     | `bg-amber-500`     |

---

## Environment Variables Needed

```env
# .env.local
NEWS_API_KEY=your_api_key_here
NEWS_API_BASE_URL=https://newsapi.org/v2
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Estimated Work Breakdown

| Phase | Description                      | Complexity |
| ----- | -------------------------------- | ---------- |
| 1     | Fix Foundation & Core UI         | Small      |
| 2     | Types & API Layer                | Small      |
| 3     | Home Page                        | Medium     |
| 4     | News Pages (list + detail)       | Medium     |
| 5     | Search Functionality             | Small      |
| 6     | Contact & About Pages            | Small      |
| 7     | Polish & Optimization            | Medium     |

---

## Quick Start Commands

```bash
# Install new Shadcn components
npx shadcn@latest add button card badge input skeleton sheet separator textarea dropdown-menu

# Run development server
npm run dev

# Build for production
npm run build
```

---

## Notes

- All data fetching should happen in **Server Components** (no "use client" needed for fetching)
- Use **loading.tsx** files for instant loading states (Next.js Suspense boundaries)
- Keep "use client" only for interactive components (search input, theme toggle, mobile menu)
- Images from external APIs need domains added to `next.config.ts` under `images.remotePatterns`
- Start with mock data, swap to real API when UI is complete
