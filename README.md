# MySakinahPro — Monorepo

A **Turborepo** monorepo housing all MySakinahPro customer-facing web applications, built with Next.js 16 and a shared design system.

---

## Apps & Packages

### Apps (`apps/`)

| App | Brand | Audience | Dev Port | URL Path |
|-----|-------|----------|----------|----------|
| `apps/kohasil` | KOHASiL Raudhah | LHDN / KOHASiL staff | 3000 | `/kohasil` |
| `apps/krtb` | KRTB Care | KRTB staff | 3001 | `/krtb` |
| `apps/kotamas` | Kota Mas | Kota Mas staff | 3002 | `/kotamas` |
| `apps/kopetro` | KOPETRO | PETRONAS staff | 3003 | `/kopetro` |
| `apps/albarzah` | Albarzah | General public | 3004 | `/albarzah` |

> **Albarzah is different** from the other 4 — it targets the general public with **yearly subscription plans** (RM80/RM120 per year), has no parent-protection section, and posts form data to an admin dashboard ingest endpoint instead of Google Sheets.

### Shared Packages (`packages/`)

| Package | Purpose |
|---------|---------|
| `@sakinah/ui` | 11 shared React components + `motion.ts` + `utils.ts` |
| `@sakinah/api-types` | Shared Zod validation schemas for enquiry forms |
| `@sakinah/typescript-config` | Shared `tsconfig` base and Next.js preset |

---

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | >= 20 | Check with `node -v` |
| npm | >= 10 | Comes with Node 20. Check with `npm -v` |
| Turborepo | (auto-installed) | Installed as a dev dep in root |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_ORG/MySakinahPro.git
cd MySakinahPro
```

### 2. Install all dependencies

Run this **once from the root**. npm workspaces hoist all packages into a single `node_modules/`.

```bash
npm install
```

> ⚠️ Do **not** run `npm install` inside individual `apps/` or `packages/` folders. Always install from the root.

### 3. Set up environment variables

Each app has its own `.env.local`. Copy the example and fill in the values:

```bash
# For KOHASiL, KRTB, KotaMas, KOPETRO (Google Sheets webhook)
cp apps/kohasil/.env.example apps/kohasil/.env.local
cp apps/krtb/.env.example    apps/krtb/.env.local
cp apps/kotamas/.env.example apps/kotamas/.env.local
cp apps/kopetro/.env.example apps/kopetro/.env.local

# For Albarzah (admin dashboard ingest)
cp apps/albarzah/.env.example apps/albarzah/.env.local
```

See the [Environment Variables](#environment-variables) section below for what to fill in.

---

## Running in Development

### Run a single app

```bash
npm run dev:kohasil    # → http://localhost:3000
npm run dev:krtb       # → http://localhost:3001
npm run dev:kotamas    # → http://localhost:3002
npm run dev:kopetro    # → http://localhost:3003
npm run dev:albarzah   # → http://localhost:3004
```

### Run all 5 apps simultaneously

```bash
npm run dev
```

Turborepo runs all apps in parallel. Each app opens on its assigned port.

---

## Building for Production

### Build all apps

```bash
npm run build
```

Turborepo builds all apps in parallel and caches the output. Re-running `npm run build` will use the cache if nothing has changed.

### Build a single app

```bash
npx turbo run build --filter=@sakinah/kohasil
npx turbo run build --filter=@sakinah/albarzah
```

---

## Environment Variables

### KOHASiL, KRTB, KotaMas, KOPETRO

These 4 apps submit enquiry forms to a Google Sheets Apps Script webhook.

Create `apps/<app>/.env.local`:

```env
# Google Sheets Apps Script Web App URL
# Get this from: Extensions → Apps Script → Deploy → Web App → URL
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```

### Albarzah

Albarzah submits to the MySakinahPro admin dashboard ingest endpoint.

Create `apps/albarzah/.env.local`:

```env
# Admin dashboard ingest API base URL (no trailing slash)
INGEST_WEBHOOK_URL="https://admin.mysaKInahpro.com/api/ingest"

# Secret key for webhook authentication
INGEST_WEBHOOK_SECRET="your-secret-key-here"
```

> 💡 Leave these empty during local development — form submissions will just be logged to the console.

---

## Project Structure

```
MySakinahPro/
├── package.json                  ← Root workspace config + npm scripts
├── turbo.json                    ← Turborepo pipeline (build/dev/lint)
├── vercel.json                   ← Vercel path rewrite rules
├── .gitignore
│
├── packages/
│   ├── ui/                       ← @sakinah/ui
│   │   └── src/
│   │       ├── index.ts          ← Barrel export (import everything from here)
│   │       ├── components/       ← 11 shared React components
│   │       └── lib/
│   │           ├── motion.ts     ← Framer Motion variants
│   │           └── utils.ts      ← cn() helper + scrollToSection()
│   │
│   ├── api-types/                ← @sakinah/api-types
│   │   └── src/
│   │       └── enquiry.ts        ← Zod schemas (base, employer, albarzah)
│   │
│   └── typescript-config/        ← @sakinah/typescript-config
│       ├── base.json
│       └── nextjs.json
│
└── apps/
    ├── kohasil/
    │   └── src/
    │       ├── app/              ← Next.js App Router pages + API routes
    │       ├── components/
    │       │   ├── layout/       ← Header, Footer, Navigation
    │       │   └── sections/     ← Page sections (Hero, Package, FAQ, etc.)
    │       ├── data/             ← packages.ts, faq.ts (app-specific content)
    │       └── lib/
    │           ├── constants.ts  ← BRAND (name, hotline, etc.) + SECTION_IDS
    │           └── validations.ts ← App-specific Zod form schema
    │
    ├── krtb/      ← Same structure as kohasil
    ├── kotamas/   ← Same structure as kohasil
    ├── kopetro/   ← Same structure as kohasil
    └── albarzah/  ← Same structure, but different sections & API route
```

---

## Shared Components (`@sakinah/ui`)

Import all shared components and utilities from the single package:

```typescript
import {
  // UI Components
  ResponsiveContainer,
  SectionHeading,
  FormField,
  HotlineCard,
  OrnamentalDivider,
  BenefitCard,
  AudioPlayer,
  AutoScrollManager,
  ParticleComponent,
  ScrollToTop,
  TimelineStep,

  // Utilities
  cn,
  scrollToSection,

  // Framer Motion variants
  staggerContainer,
  cardReveal,
  viewportOnce,
  viewportEager,
  riseUp,
} from "@sakinah/ui";
```

> ⚠️ Never import from `@/components/ui/*` or `@/lib/utils` / `@/lib/motion` inside apps. All of these have been removed and consolidated into `@sakinah/ui`.

### HotlineCard — props required

Because `HotlineCard` no longer reads from a `BRAND` constant, you must pass hotline info as props:

```tsx
import { BRAND } from "@/lib/constants";
import { HotlineCard } from "@sakinah/ui";

<HotlineCard
  hotline={BRAND.hotline}
  hotlineTel={BRAND.hotlineTel}
  label="Hotline 24 Jam"
  variant="dark"
/>
```

---

## Adding a New App

1. Copy an existing app as a starting point:
   ```bash
   rsync -av --exclude='node_modules' --exclude='.next' apps/kohasil/ apps/newapp/
   ```

2. Update `apps/newapp/package.json`:
   ```json
   {
     "name": "@sakinah/newapp",
     "scripts": {
       "dev": "next dev --port 3005"
     }
   }
   ```

3. Add a dev script to the root `package.json`:
   ```json
   "dev:newapp": "turbo run dev --filter=@sakinah/newapp"
   ```

4. Update brand details in `apps/newapp/src/lib/constants.ts`.

5. Run `npm install` from the root to register the new workspace package.

---

## Deployment (Vercel)

Each app is deployed as a **separate Vercel project**. They are linked together via path rewrites on the main domain.

### Per-app Vercel setup

For each app:

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import from GitHub
2. Select the `MySakinahPro` repo
3. In **Root Directory**, set to `apps/kohasil` (or the respective app)
4. Set **Framework Preset** to `Next.js`
5. Add environment variables (see [Environment Variables](#environment-variables))
6. Deploy

### Vercel project names (recommended)

| App | Vercel project name |
|-----|-------------------|
| kohasil | `sakinah-kohasil` |
| krtb | `sakinah-krtb` |
| kotamas | `sakinah-kotamas` |
| kopetro | `sakinah-kopetro` |
| albarzah | `sakinah-albarzah` |

### Domain routing

The root `vercel.json` maps each URL path to its dedicated deployment:

```
www.MySakinahPro.com/kohasil  →  sakinah-kohasil.vercel.app
www.MySakinahPro.com/krtb     →  sakinah-krtb.vercel.app
www.MySakinahPro.com/kotamas  →  sakinah-kotamas.vercel.app
www.MySakinahPro.com/kopetro  →  sakinah-kopetro.vercel.app
www.MySakinahPro.com/albarzah →  sakinah-albarzah.vercel.app
```

---

## Key Differences — Albarzah vs. Other Apps

| Feature | KOHASiL / KRTB / KotaMas / KOPETRO | Albarzah |
|---------|-------------------------------------|---------|
| Target audience | Government / employer staff | General public |
| Pricing | Monthly salary deduction (RM10–RM20/mo) | Yearly plans (RM80 or RM120/yr) |
| Package display | Category tabs with multiple plans | 2 side-by-side plan cards |
| Parent protection section | ✅ Yes | ❌ No |
| Shariah section | ✅ Yes | ❌ No |
| `lindungiIbuBapa` form field | ✅ Yes | ❌ No |
| API endpoint | Google Sheets webhook | Admin dashboard ingest |
| Env variable | `GOOGLE_SHEETS_WEBHOOK_URL` | `INGEST_WEBHOOK_URL` + `INGEST_WEBHOOK_SECRET` |

---

## Tech Stack

| Technology | Version | Role |
|-----------|---------|------|
| [Next.js](https://nextjs.org) | 16.2.12 | App framework (App Router) |
| [React](https://react.dev) | 19.2.4 | UI library |
| [TypeScript](https://typescriptlang.org) | ^5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | ^4 | Styling (CSS variables via `@theme`) |
| [Framer Motion](https://framer.motion) | ^12 | Animations |
| [Zod](https://zod.dev) | ^4 | Form validation schemas |
| [React Hook Form](https://react-hook-form.com) | ^7 | Form state management |
| [Lucide React](https://lucide.dev) | ^1 | Icons |
| [Turborepo](https://turborepo.dev) | ^2 | Monorepo build system |

---

## Contact & Ownership

**Bumijez Sdn Bhd**
No 11, Tingkat 1, Jalan PP 2/1, Taman Putra Prima, 47130 Puchong, Selangor
📧 info@bumijez.com.my
📞 011-1300 1999 (24 jam bersyarat)
# mysakinah
