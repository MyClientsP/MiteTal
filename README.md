# Mite Tal — Frontend

The official website for **Mite Tal**, a creative company blending education, animation, and emerging tech to spark curiosity and bring learning to life.

Built with **Next.js 15**, **TypeScript**, and **Tailwind CSS v4**. Content is served from a local mock data file — no backend or CMS connection required.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React + React Icons |
| Rich Text | React Markdown |
| Package Manager | npm |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd front-end

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Home
│   ├── about/page.tsx          # About Us
│   ├── contact/page.tsx        # Contact
│   ├── projects/page.tsx       # Projects listing
│   ├── project/[documentId]/   # Project detail (dynamic)
│   └── guide/page.tsx          # Guide
│
├── components/
│   └── custom/
│       ├── Header.tsx          # Global header / nav
│       ├── Footer.tsx          # Global footer
│       ├── LucideIcon.ts       # Icon map (Lucide + React Icons)
│       ├── home/               # Home page sections
│       ├── about/              # About page sections
│       ├── contact/            # Contact page sections
│       ├── projects/           # Projects listing sections
│       └── project-detail/     # Project detail sections
│
├── data/
│   └── mockData.ts             # All site content (single source of truth)
│
└── utils/
    └── fetchData.ts            # Data fetching utility (reads from mockData)
```

---

## Content Management

All content lives in **`src/data/mockData.ts`**. There is no CMS or API — editing this file updates the entire site.

### Pages and their data keys

| Page | Mock export |
|---|---|
| Global (header/footer) | `globalMock` |
| Home | `homeMock` |
| About | `aboutMock` |
| Projects listing | `projectsListMock` |
| Project detail | `projectDetailsMock` |
| Contact | `contactMock` |
| Guide | `guideMock` |

### Adding a project

1. Add an entry to `articlesMock` (shown on the home page showcase)
2. Add the same entry to `projectsListMock` (shown on the projects page)
3. Add a full detail entry to `projectDetailsMock` keyed by `documentId`

---

## Pages Overview

### Home
Four sections: **Hero** → **About Short** → **Services** → **CTA**

### About
**Hero** → **Mission** → **Our Story** → **Services** → **Core Values** → **Marketing CTA**

### Contact
**Hero** → **Contact Methods** → **Form + Sidebar**

The contact form opens the user's mail client via `mailto:` — no backend required.

### Projects
Filterable grid of projects. Renders an empty state when `projectsListMock` is empty.

### Project Detail
Dynamic route at `/project/[documentId]`. Renders content blocks (text, image, video, YouTube, rich markdown).

---

## Available Scripts

```bash
npm run dev        # Start development server (Turbopack)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## Environment Variables

No environment variables are required to run this project locally. The `.env.local` file is not needed.

If reconnecting to a Strapi backend in the future, add these to `.env.local`:

```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token_here
```

---

## Contact

**Mite Tal**
contact@mitetal.com