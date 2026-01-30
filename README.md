# 9jaSettlement Admin UI

Admin dashboard for 9jaSettlement. Built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **pnpm**.

## Reference

Structure and patterns follow [9jasettlement-admin-dashboard](../9jasettlement-admin-dashboard/) in this repo.

## Setup

```bash
pnpm install
```

## Scripts

- `pnpm dev` — Start development server (default: http://localhost:3000)
- `pnpm build` — Build for production
- `pnpm start` — Start production server
- `pnpm lint` — Run ESLint

## Folder structure

```
admin-ui/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (theme, fonts)
│   ├── page.tsx            # Home / login entry
│   ├── globals.css         # Tailwind + CSS variables
│   └── dashboard/          # Dashboard routes
│       └── page.tsx
├── components/
│   ├── theme-provider.tsx  # next-themes
│   └── ui/                 # Shared UI (button, card, …)
├── hooks/
│   └── use-mobile.ts
├── lib/
│   └── utils.ts            # cn() etc.
├── public/
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
└── postcss.config.mjs
```

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS** + `tailwindcss-animate`
- **next-themes** (light/dark)
- **Radix Slot** (Button asChild)
- **class-variance-authority** (button variants)
- **clsx** + **tailwind-merge** (className utils)

Add more UI from the reference dashboard (sidebar, charts, tables, auth) as needed.
