# 9jaSettlement Admin UI

Admin dashboard for 9jaSettlement. Built as a **React + TypeScript** app with **Vite**, **React Router**, **Tailwind CSS**, and **pnpm**.

**Reference:** The UI and flows are inspired by **9jasettlement-admin-dashboard** (Next.js); this project is a standalone React TypeScript application, not a Next.js app.

## Setup

```bash
pnpm install
```

## Scripts...

- `pnpm dev` — Start Vite dev server (default: http://localhost:5173)
- `pnpm build` — Type-check and build for production
- `pnpm preview` — Preview production build locally
- `pnpm lint` — Run ESLint

## Folder structure

```
admin-ui/
├── index.html              # Entry HTML
├── src/
│   ├── main.tsx            # React root + BrowserRouter
│   ├── App.tsx             # Route definitions
│   ├── index.css           # Tailwind + CSS variables
│   ├── pages/              # Route-level components
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   └── dashboard/      # Dashboard sub-routes
│   ├── components/
│   │   ├── layouts/        # DashboardLayout (sidebar + Outlet)
│   │   ├── shared/         # Logo, LoginForm
│   │   └── ui/             # Button, Card, Sheet, Input, Label, Badge
│   ├── api/                # API client layer (paradigm)
│   ├── services/           # Business logic (paradigm)
│   ├── store/              # Global state (paradigm)
│   ├── dtos/               # Data transfer types (paradigm)
│   ├── types/              # Shared types (paradigm)
│   ├── utils/              # Helpers (paradigm)
│   ├── _data/              # Static/mock data (paradigm)
│   ├── lib/                # cn() etc.
│   └── hooks/              # use-mobile, etc.
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.mjs
```

## Stack

- **Vite 6** — Build tool and dev server
- **React 18** + **TypeScript**
- **React Router 7** — Client-side routing (/, /auth/signup, /dashboard, /dashboard/users, …)
- **Tailwind CSS** + `tailwindcss-animate`
- **Radix UI** — Dialog (Sheet), Label, Slot
- **Recharts** — Dashboard charts
- **class-variance-authority** — Component variants
- **clsx** + **tailwind-merge** — className utils

## Routes

- `/` — Login
- `/auth/signup` — Create admin account (placeholder)
- `/dashboard` — Analytics (metrics, charts, recent activity)
- `/dashboard/users` — Users (placeholder)
- `/dashboard/businesses` — Businesses (placeholder)
- `/dashboard/agents` — Agents (placeholder)
- `/dashboard/transactions` — Transactions (placeholder)
- `/dashboard/virtual-accounts` — Virtual accounts (placeholder)
- `/dashboard/settlements` — Settlements (placeholder)
- `/dashboard/country-currency-config` — Country/currency config (placeholder)
- `/dashboard/settings` — Settings (placeholder)
- `/dashboard/superadmin` — Super admin (placeholder)
