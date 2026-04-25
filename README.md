# JobTrackr — Job Application Tracker

A full-featured career pipeline manager built with React, Redux Toolkit, React Router, and Recharts.

---

## Tech Stack

| Tech | Purpose |
|---|---|
| React 18 + Vite | Frontend framework |
| Redux Toolkit | Global state management |
| React Router v6 | Client-side routing |
| Recharts | Charts and analytics |
| CSS Modules | Scoped styling |
| localStorage | Data persistence |

---

## Advanced Features Implemented

- ✅ Search + Filter + Sort (debounced search)
- ✅ Dashboard with Charts (Pie, Bar, Horizontal Bar)
- ✅ Pagination (8 jobs per page)
- ✅ Dark Mode / Light Mode toggle
- ✅ Error boundary (form validation)
- ✅ Performance optimization with React.memo + useMemo
- ✅ Lazy loading of all pages (React.lazy + Suspense)
- ✅ Multi-step form with validation (Add/Edit modal)
- ✅ CRUD Operations (Create, Read, Update, Delete)

---

## Project Structure

```
src/
├── app/
│   └── store.js                  ← Redux store
├── features/
│   ├── jobs/
│   │   └── jobsSlice.js          ← Jobs state + selectors
│   └── ui/
│       └── uiSlice.js            ← Modal + theme state
├── components/
│   ├── Layout.jsx / .module.css  ← Sidebar + topbar
│   ├── JobModal.jsx / .module.css← Add/Edit form modal
│   ├── StatsBar.jsx / .module.css← Metric cards
│   ├── StatusBadge.jsx           ← Colored status badge
│   ├── SearchFilterBar.jsx       ← Search + filter controls
│   └── Pagination.jsx            ← Page controls
├── pages/
│   ├── Dashboard.jsx             ← Overview + recent jobs
│   ├── Applications.jsx          ← Full table with CRUD
│   ├── Analytics.jsx             ← Charts page
│   └── Notes.jsx                 ← Per-job notes editor
├── hooks/
│   ├── useDebounce.js            ← Debounce hook
│   └── usePagination.js          ← Pagination hook
├── App.jsx                       ← Routes + lazy loading
├── main.jsx                      ← Entry point
└── index.css                     ← Global CSS variables
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Build for production
npm run build

# 4. Deploy to Vercel
npx vercel
```

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/dashboard` | Dashboard | Stats overview, recent apps, pipeline chart |
| `/applications` | Applications | Full CRUD table with search/filter/sort/pagination |
| `/analytics` | Analytics | Pie chart, bar charts, key metrics |
| `/notes` | Notes | Per-application notes editor |

---

## Deployment

Push to GitHub and connect to [Vercel](https://vercel.com) — it auto-detects Vite and deploys in under a minute.
