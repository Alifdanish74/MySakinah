# MySakinah Admin System (`@sakinah/admin`)

A modern, high-performance, dark-themed admin dashboard for tracking and managing user enquiry form submissions across all MySakinah portal modules (**kohasil**, **kopetro**, **krtb**, **kotamas**, **albarzah**).

---

## 🚀 Key Features

1. **Multi-Module Categorization**: Automatically categorizes incoming form entries by module.
2. **Flexible & Scalable Database Schema**: Single central `submissions` table storing module-specific form responses in a `jsonb` payload. Adding new modules requires **zero code or migration changes**—simply `INSERT` a new row into the `modules` table!
3. **Role-Based Access Control (RBAC)**:
   - **Super Admin**: Access to view, edit, and delete entries across all modules.
   - **Module Editor**: Access to view and edit entries for their assigned module(s).
   - **Module Viewer**: Access to view entries for their assigned module(s) in read-only mode.
4. **Interactive Data Table**: Quick search across all payload fields, pagination, dynamic column generation, and status filtering (`pending`, `reviewed`, `contacted`, `completed`, `archived`).
5. **Inline Management**: Edit submission status, admin notes, and field payload values directly inside a glassmorphism modal, or permanently remove entries with safety confirmation.
6. **Form Ingest API**: Dedicated `POST /api/submissions` endpoint that landing page applications can call directly to store enquiries centrally.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database & Auth**: Supabase (PostgreSQL + `@supabase/ssr` Cookie-based Auth)
- **Styling**: Tailwind CSS v4 + Custom Dark System Design (Glassmorphism & Micro-animations)
- **Animations**: Framer Motion
- **Icons**: Lucide React

---

## 📁 Supabase Database Setup

1. Open your Supabase project dashboard -> **SQL Editor**.
2. Run the script located in `apps/admin/supabase/schema.sql`.

This creates:
- `modules` table (seeded with `kohasil`, `kopetro`, `krtb`, `kotamas`, `albarzah`)
- `submissions` table (with GIN index on `form_data` JSONB)
- `admin_roles` table (mapping `user_id` -> `role` & `module_id`)
- Row Level Security (RLS) policies protecting data access based on authenticated user ID and assigned role.

### Granting Super Admin Privileges

To grant a user Super Admin privileges, run this SQL in Supabase:

```sql
INSERT INTO admin_roles (user_id, role, module_id)
VALUES ('<USER_UUID_FROM_SUPABASE_AUTH>', 'super', NULL);
```

To grant a user access to a specific module (e.g. `kohasil`):

```sql
INSERT INTO admin_roles (user_id, role, module_id)
SELECT '<USER_UUID>', 'editor', id FROM modules WHERE slug = 'kohasil';
```

---

## ⚙️ Environment Variables

Create `.env.local` inside `apps/admin/`:

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
```

---

## 🏃 Running the Admin App

From the monorepo root:

```bash
# Start the admin dev server on http://localhost:3005
npm run dev:admin
```

Or from `apps/admin/`:

```bash
npm run dev
```

---

## 🔌 Integrating Landing Page Forms

Any front-end landing page (`apps/kohasil`, `apps/kopetro`, etc.) can submit user form entries by sending a `POST` request to `/api/submissions`:

```ts
await fetch("http://localhost:3005/api/submissions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    module_slug: "kohasil", // or "kopetro", "krtb", "kotamas", "albarzah"
    submitted_by: "Ahmad Danish",
    form_data: {
      email: "ahmad@example.com",
      phone: "+60123456789",
      amount_requested: "RM 50,000",
      investment_type: "Raudhah Fund",
    },
  }),
});
```
