# News Portal - Update Plan (v2.0)

## Current State Assessment

The portal is a **frontend-only** news site with **35 hardcoded mock articles**, no database, no authentication, and no admin panel. While the UI is well-built, it's essentially a static demo — not a real content management system. Below is a gap analysis and a phased roadmap to turn it into a production-grade news platform.

---

## Critical Gaps Identified

| # | Gap | Impact | Severity |
|---|-----|--------|----------|
| 1 | **No Database** — all data is hardcoded JSON in `mock-data.ts` | Can't add/edit/delete articles | Critical |
| 2 | **No Admin Panel** — zero content management capability | Editors can't manage content | Critical |
| 3 | **No Authentication** — no login, no roles, no protected routes | Anyone can access everything (or nothing) | Critical |
| 4 | **No Image Upload** — images are `picsum.photos` placeholders | No real editorial images | High |
| 5 | **Contact Form is Fake** — no backend, data goes nowhere | Users think they're submitting but nothing happens | High |
| 6 | **Newsletter is Fake** — no email integration | Subscribers are lost | High |
| 7 | **No View/Read Tracking** — no analytics on articles | Can't measure popularity or engagement | Medium |
| 8 | **No Comments System** — zero reader engagement | Readers can't interact with content | Medium |
| 9 | **No Breaking News Feature** — planned in Phase 3 but never built | Missing from homepage | Medium |
| 10 | **No RSS Feed** — news sites are expected to have feeds | Missing standard feature | Medium |
| 11 | **No Tags/Sub-categories** — only 7 broad categories | Poor content discovery | Medium |
| 12 | **No Author Profiles** — author is just a string | No author pages or bios | Low |
| 13 | **No Reading Time Estimate** — common in modern news sites | Minor UX gap | Low |
| 14 | **No Bookmarks/Save** — users can't save articles | No personalization | Low |

---

## Feature Suggestions (Beyond Gap Fixes)

### High-Impact Features
- **Rich Text Editor** (TipTap/Novel) for writing articles in admin
- **Draft/Publish Workflow** — save drafts, schedule publishing
- **Breaking News Ticker** — real-time banner on homepage
- **Reading Progress Bar** — visual indicator on article pages
- **Related Articles (Smart)** — based on tags + category, not just category
- **Social Media OG Image Generation** — auto-generate share images
- **Multi-author Support** — multiple writers with their own dashboards

### Nice-to-Have Features
- **Push Notifications** — notify subscribers of breaking news
- **Multilingual Support** (i18n) — Bangla/English toggle
- **Print-Friendly View** — clean print stylesheet for articles
- **Article Table of Contents** — auto-generated from headings
- **Infinite Scroll Option** — alternative to pagination
- **Dark Mode Per-Section** — editor preference in admin
- **Content Versioning** — revision history for articles
- **Bulk Import** — CSV/JSON article import tool

---

## Tech Stack Additions

| Need | Technology | Why |
|------|-----------|-----|
| Database | **PostgreSQL + Prisma ORM** | Type-safe, great Next.js integration |
| Authentication | **NextAuth.js v5 (Auth.js)** | Built for Next.js, supports credentials + OAuth |
| Image Upload | **UploadThing** or **Cloudinary** | Easy file uploads with CDN |
| Rich Text Editor | **TipTap** or **Novel** | Modern block editor, outputs HTML/JSON |
| Email | **Resend** + **React Email** | Transact emails + newsletter |
| Admin UI | **Custom (Shadcn)** | Consistent with existing design |
| Charts/Analytics | **Recharts** | Lightweight, React-native charts |
| Form Validation | **Zod + React Hook Form** | Schema validation with type inference |
| Background Jobs | **Inngest** or **cron** | Scheduled publishing, email digests |

---

## Database Schema (Prisma)

```prisma
model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  password      String    // hashed
  role          Role      @default(EDITOR)
  avatar        String?
  bio           String?
  articles      Article[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Article {
  id            String    @id @default(cuid())
  slug          String    @unique
  title         String
  description   String
  content       String    // Rich text HTML
  imageUrl      String?
  author        User      @relation(fields: [authorId], references: [id])
  authorId      String
  category      Category  @relation(fields: [categoryId], references: [id])
  categoryId    String
  tags          Tag[]
  status        ArticleStatus @default(DRAFT)
  isFeatured    Boolean   @default(false)
  isTrending    Boolean   @default(false)
  isBreaking    Boolean   @default(false)
  views         Int       @default(0)
  publishedAt   DateTime?
  scheduledAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Category {
  id            String    @id @default(cuid())
  name          String    @unique
  slug          String    @unique
  description   String?
  color         String    // Tailwind color class
  icon          String?   // Lucide icon name
  articles      Article[]
  order         Int       @default(0)
}

model Tag {
  id            String    @id @default(cuid())
  name          String    @unique
  slug          String    @unique
  articles      Article[]
}

model Comment {
  id            String    @id @default(cuid())
  content       String
  authorName    String
  authorEmail   String
  articleId     String
  article       Article   @relation(fields: [articleId], references: [id])
  isApproved    Boolean   @default(false)
  createdAt     DateTime  @default(now())
}

model Subscriber {
  id            String    @id @default(cuid())
  email         String    @unique
  isActive      Boolean   @default(true)
  subscribedAt  DateTime  @default(now())
}

model ContactMessage {
  id            String    @id @default(cuid())
  name          String
  email         String
  subject       String
  message       String
  isRead        Boolean   @default(false)
  createdAt     DateTime  @default(now())
}

model SiteSettings {
  id            String    @id @default("default")
  siteName      String    @default("Daily News")
  tagline       String?
  logo          String?
  favicon       String?
  socialLinks   Json?     // { twitter, facebook, instagram, youtube }
  footerText    String?
  adsEnabled    Boolean   @default(false)
}

enum Role {
  ADMIN
  EDITOR
  AUTHOR
}

enum ArticleStatus {
  DRAFT
  PUBLISHED
  SCHEDULED
  ARCHIVED
}
```

---

## Admin Panel Design

### Routes Structure

```
/admin                          → Dashboard (stats overview)
/admin/login                    → Admin login page
/admin/articles                 → Article list (table view)
/admin/articles/new             → Create new article
/admin/articles/[id]/edit       → Edit article
/admin/categories               → Manage categories
/admin/tags                     → Manage tags
/admin/comments                 → Moderate comments
/admin/subscribers              → Newsletter subscribers
/admin/messages                 → Contact form submissions
/admin/users                    → User management (Admin only)
/admin/settings                 → Site settings
/admin/media                    → Media library (uploaded images)
```

### Dashboard Widgets
- Total articles (published / drafts / scheduled)
- Total views (today / this week / this month)
- Recent articles (last 5)
- Top performing articles (most views)
- New subscribers count
- Unread contact messages
- Quick actions (New Article, View Site)
- Traffic chart (views over time - line chart)

### Article Editor Features
- Title input with auto-slug generation
- Rich text editor (TipTap) with:
  - Headings (H1-H4)
  - Bold, italic, underline, strikethrough
  - Bullet & numbered lists
  - Blockquotes
  - Code blocks
  - Image embedding
  - Links
  - YouTube embeds
- Featured image upload with drag & drop
- Category selector (dropdown)
- Tags input (multi-select with create)
- Status toggle (Draft / Published / Scheduled)
- Schedule date picker
- Featured article toggle
- Breaking news toggle
- SEO preview (title + description)
- Auto-save drafts

### Role-Based Access

| Feature | Admin | Editor | Author |
|---------|-------|--------|--------|
| Dashboard | Full stats | Own stats | Own stats |
| Create articles | Yes | Yes | Yes |
| Edit own articles | Yes | Yes | Yes |
| Edit all articles | Yes | Yes | No |
| Delete articles | Yes | Yes | No |
| Publish articles | Yes | Yes | No (submit for review) |
| Manage categories | Yes | Yes | No |
| Manage tags | Yes | Yes | No |
| Moderate comments | Yes | Yes | No |
| View subscribers | Yes | Yes | No |
| View messages | Yes | Yes | No |
| Manage users | Yes | No | No |
| Site settings | Yes | No | No |

---

## Implementation Phases

### Phase 8: Database & Authentication (Foundation)
**Priority: Critical | Complexity: High**

- [ ] Set up PostgreSQL (local + Neon/Supabase for prod)
- [ ] Install and configure Prisma ORM
- [ ] Create database schema (all models above)
- [ ] Run initial migrations
- [ ] Seed database with existing mock data (35 articles)
- [ ] Install and configure NextAuth.js v5
- [ ] Create credentials provider (email/password)
- [ ] Create login page at `/admin/login`
- [ ] Add session provider to root layout
- [ ] Create auth middleware for `/admin/*` routes
- [ ] Create initial admin user via seed script
- [ ] Replace `src/lib/api.ts` to query database instead of mock data
- [ ] Remove `mock-data.ts` after migration

**New files:**
```
prisma/
  schema.prisma
  seed.ts
src/
  lib/db.ts                    (Prisma client singleton)
  lib/auth.ts                  (NextAuth config)
  app/admin/login/page.tsx
  middleware.ts                (route protection)
```

---

### Phase 9: Admin Panel - Core Layout & Dashboard
**Priority: Critical | Complexity: Medium**

- [ ] Create admin layout with sidebar navigation
  - Logo/brand at top
  - Nav links: Dashboard, Articles, Categories, Tags, Comments, Subscribers, Messages, Users, Settings
  - Collapse/expand sidebar
  - User avatar + logout at bottom
- [ ] Install additional Shadcn components: `table`, `dialog`, `select`, `tabs`, `toast`, `avatar`, `popover`, `calendar`, `command`, `label`, `switch`, `alert`
- [ ] Build dashboard page with stat cards
- [ ] Add Recharts for views-over-time chart
- [ ] Quick action buttons (New Article, View Site)
- [ ] Recent articles table widget
- [ ] Unread messages indicator

**New files:**
```
src/app/admin/
  layout.tsx                   (admin shell with sidebar)
  page.tsx                     (dashboard)
src/components/admin/
  AdminSidebar.tsx
  StatCard.tsx
  ViewsChart.tsx
  RecentArticlesWidget.tsx
```

---

### Phase 10: Article Management (CRUD)
**Priority: Critical | Complexity: High**

- [ ] Article listing page with data table
  - Columns: Title, Category, Status, Author, Views, Date, Actions
  - Sort by any column
  - Filter by status (All / Published / Draft / Scheduled / Archived)
  - Filter by category
  - Search within articles
  - Bulk actions (delete, archive, publish)
- [ ] Create article page
  - Install and configure TipTap editor
  - Title input with live slug preview
  - Rich text editor (full toolbar)
  - Featured image upload (UploadThing)
  - Category dropdown
  - Tags multi-select (with create new)
  - Publish controls (Draft / Publish / Schedule)
  - Date picker for scheduling
  - Featured & Breaking toggles
  - SEO meta fields (title override, description)
  - Preview button (opens in new tab)
  - Auto-save every 30 seconds
- [ ] Edit article page (same form, pre-filled)
- [ ] Delete article (with confirmation dialog)
- [ ] API routes for all CRUD operations

**New files:**
```
src/app/admin/articles/
  page.tsx                     (article list)
  new/page.tsx                 (create)
  [id]/edit/page.tsx           (edit)
src/components/admin/
  ArticleForm.tsx              (shared create/edit form)
  ArticleTable.tsx
  RichTextEditor.tsx           (TipTap wrapper)
  ImageUpload.tsx
  TagInput.tsx
  SlugInput.tsx
  PublishControls.tsx
src/app/api/
  articles/route.ts            (GET list, POST create)
  articles/[id]/route.ts       (GET, PUT, DELETE)
  upload/route.ts              (image upload)
```

---

### Phase 11: Category, Tag & Media Management
**Priority: High | Complexity: Medium**

- [ ] Category management page
  - List all categories (sortable table)
  - Create/edit category (name, slug, description, color, icon)
  - Reorder categories (drag & drop)
  - Delete category (with article reassignment)
- [ ] Tag management page
  - List all tags
  - Create/edit/delete tags
  - Show article count per tag
  - Merge duplicate tags
- [ ] Media library
  - Grid view of all uploaded images
  - Upload new images
  - Delete images
  - Copy image URL
  - Image used-in tracking

**New files:**
```
src/app/admin/categories/page.tsx
src/app/admin/tags/page.tsx
src/app/admin/media/page.tsx
src/app/api/categories/route.ts
src/app/api/tags/route.ts
src/app/api/media/route.ts
```

---

### Phase 12: Comments, Messages & Subscribers
**Priority: Medium | Complexity: Medium**

- [ ] **Comments system (public side)**
  - Comment form on article pages (name, email, comment)
  - Display approved comments under articles
  - Comment count on article cards
- [ ] **Comment moderation (admin side)**
  - List all comments with status filter
  - Approve / reject / delete actions
  - Reply to comments
  - Bulk moderation
- [ ] **Contact messages (admin side)**
  - List all messages (table)
  - Mark as read/unread
  - Reply via email (if Resend configured)
  - Delete old messages
  - Wire up public contact form to actually save to DB
- [ ] **Subscriber management (admin side)**
  - List all subscribers
  - Export as CSV
  - Add/remove subscribers
  - Wire up public newsletter form to save to DB
  - Send test email capability

**New files:**
```
src/app/admin/comments/page.tsx
src/app/admin/messages/page.tsx
src/app/admin/subscribers/page.tsx
src/components/news/CommentSection.tsx
src/components/news/CommentForm.tsx
src/app/api/comments/route.ts
src/app/api/subscribers/route.ts
src/app/api/contact/route.ts
```

---

### Phase 13: User Management & Settings
**Priority: Medium | Complexity: Medium**

- [ ] **User management (Admin only)**
  - List all users with role badges
  - Create new user (invite by email)
  - Edit user role (Admin / Editor / Author)
  - Deactivate/delete users
  - Password reset
- [ ] **Site settings page**
  - Site name & tagline
  - Logo upload
  - Social media links
  - Footer text customization
  - SEO defaults (meta description, keywords)
  - Enable/disable comments globally
  - Enable/disable newsletter
- [ ] **User profile**
  - Edit own profile (name, bio, avatar)
  - Change password
  - View own article stats

**New files:**
```
src/app/admin/users/page.tsx
src/app/admin/settings/page.tsx
src/app/admin/profile/page.tsx
src/app/api/users/route.ts
src/app/api/settings/route.ts
```

---

### Phase 14: Public Site Enhancements
**Priority: Medium | Complexity: Medium**

- [ ] **Tags on public site**
  - Tag badges on article cards and detail pages
  - Tag page: `/tag/[slug]` — filtered articles
  - Tag cloud widget in sidebar
- [ ] **Author profiles**
  - Author page: `/author/[slug]` — bio + their articles
  - Author card on article detail page
- [ ] **Breaking news ticker**
  - Horizontal scrolling banner on homepage
  - Red accent, auto-scroll
  - Pulls from articles with `isBreaking: true`
- [ ] **Reading progress bar**
  - Thin progress bar at top of article pages
  - Fills as user scrolls through content
- [ ] **Reading time estimate**
  - Calculate from word count (~200 words/min)
  - Display on article cards and detail pages
- [ ] **View count tracking**
  - Increment on article page visit
  - Show view count on articles
  - "Most Read" section on homepage
- [ ] **RSS Feed**
  - `/feed.xml` — standard RSS 2.0 feed
  - Category-specific feeds: `/feed/[category].xml`
- [ ] **Improved related articles**
  - Match by tags + category (weighted)
  - Show 3-4 related articles at bottom of detail page

**New files:**
```
src/app/tag/[slug]/page.tsx
src/app/author/[slug]/page.tsx
src/app/feed.xml/route.ts
src/components/news/BreakingNewsTicker.tsx
src/components/news/ReadingProgressBar.tsx
src/components/news/AuthorCard.tsx
src/components/news/TagCloud.tsx
```

---

### Phase 15: Polish, Performance & Deployment
**Priority: High | Complexity: Medium**

- [ ] **Performance**
  - Database query optimization (add indexes)
  - Implement ISR (Incremental Static Regeneration) for article pages
  - Add Redis caching for hot queries (optional)
  - Optimize images (WebP auto-conversion)
  - Lazy load heavy components (editor, charts)
- [ ] **Security**
  - Rate limiting on API routes
  - CSRF protection on forms
  - Input sanitization (XSS prevention)
  - SQL injection prevention (Prisma handles this)
  - Secure headers (CSP, HSTS)
- [ ] **Testing**
  - Unit tests for API functions (Vitest)
  - Component tests for critical UI (React Testing Library)
  - E2E tests for admin workflows (Playwright)
- [ ] **Deployment**
  - Set up Vercel project
  - Configure environment variables
  - Set up PostgreSQL on Neon or Supabase
  - Configure UploadThing for production
  - Set up Resend for emails
  - Domain and SSL setup
  - CI/CD pipeline (GitHub Actions)

---

## Phase Summary

| Phase | Name | Priority | Complexity | Dependencies |
|-------|------|----------|------------|--------------|
| 8 | Database & Auth | Critical | High | None |
| 9 | Admin Layout & Dashboard | Critical | Medium | Phase 8 |
| 10 | Article CRUD | Critical | High | Phase 9 |
| 11 | Categories, Tags & Media | High | Medium | Phase 10 |
| 12 | Comments, Messages, Subscribers | Medium | Medium | Phase 8 |
| 13 | Users & Settings | Medium | Medium | Phase 9 |
| 14 | Public Site Enhancements | Medium | Medium | Phase 8 |
| 15 | Polish & Deployment | High | Medium | All |

### Recommended Build Order
```
Phase 8 (DB + Auth)
    ├── Phase 9 (Admin Layout)
    │     ├── Phase 10 (Articles CRUD)  ← Most important
    │     │     └── Phase 11 (Categories/Tags/Media)
    │     └── Phase 13 (Users/Settings)
    ├── Phase 12 (Comments/Messages/Subscribers)
    └── Phase 14 (Public Enhancements)
          └── Phase 15 (Polish & Deploy)
```

---

## New Package Dependencies

```bash
# Database
pnpm add prisma @prisma/client

# Authentication
pnpm add next-auth@beta @auth/prisma-adapter

# Rich Text Editor
pnpm add @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder @tiptap/extension-youtube @tiptap/extension-underline

# File Upload
pnpm add uploadthing @uploadthing/react

# Email
pnpm add resend @react-email/components

# Forms & Validation
pnpm add react-hook-form @hookform/resolvers zod

# Charts
pnpm add recharts

# Date Handling
pnpm add date-fns

# Additional Shadcn Components
pnpm dlx shadcn@latest add table dialog select tabs toast avatar popover calendar command label alert form
```

---

## Environment Variables (Full)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/news_portal"

# Auth
NEXTAUTH_SECRET="generate-a-random-secret"
NEXTAUTH_URL="http://localhost:3000"

# Upload
UPLOADTHING_TOKEN="your-uploadthing-token"

# Email
RESEND_API_KEY="your-resend-api-key"

# Site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Daily News"
```

---

## Quick Wins (Can Do Right Now Without DB)

These improvements can be made immediately with zero backend:

1. **Reading time** — calculate from content string length, show on cards
2. **Reading progress bar** — pure CSS/JS scroll listener
3. **Breaking news ticker** — filter `isTrending` articles, animate horizontally
4. **Table of contents** — parse article headings, generate anchored links
5. **Print stylesheet** — `@media print` CSS rules
6. **Improved article typography** — prose styles for article content
7. **Breadcrumbs component** — reusable across pages
8. **RSS feed** — generate from existing mock data

---

*Last updated: 2026-02-24*
*Next action: Discuss priorities and start Phase 8*
