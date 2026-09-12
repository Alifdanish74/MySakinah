# MySakinah Admin System – User & Administrator Manual

This guide provides step-by-step instructions on how to use the **MySakinah Admin Dashboard**, add admin users, assign module access permissions, manage form entries, and export reports matching the [`CONTOH EXCEL JEMPUTAN (1).xlsx`](file:///Users/user/Documents/Coding/CommonSkill/CONTOH%20EXCEL%20JEMPUTAN%20(1).xlsx) template.

---

## 📖 Table of Contents
1. [Starting the Admin System](#1-starting-the-admin-system)
2. [User Management & IAM (Adding Admins)](#2-user-management--iam-adding-admins)
3. [Role Permissions Matrix](#3-role-permissions-matrix)
4. [Using the Admin Dashboard](#4-using-the-admin-dashboard)
5. [Exporting Reports to Excel / CSV](#5-exporting-reports-to-excel--csv)
6. [Connecting Landing Page Forms (Ingest API)](#6-connecting-landing-page-forms-ingest-api)

---

## 1. Starting the Admin System

### Launching the Dashboard locally
From the monorepo root folder (`MySakinahPro`), run:

```bash
npm run dev:admin
```

The admin panel will be accessible at:
👉 **[http://localhost:3005](http://localhost:3005)**

*(Unauthenticated users will be automatically redirected to `http://localhost:3005/login`)*

---

## 2. User Management & IAM (Adding Admins)

Adding new admin users involves **2 quick steps** in your [Supabase Dashboard](https://supabase.com/dashboard):

### Step 1: Create the User Account in Supabase Auth
1. Go to your **Supabase Dashboard** -> Select your Project.
2. Click **Authentication** in the left sidebar -> **Users**.
3. Click **Add User** -> Choose **Create User**.
4. Enter the user's **Email** and **Password** (or send an email invite).
5. Click **Create User**.
6. **Copy the User ID (UUID)** generated for that user (looks like `a1b2c3d4-e5f6-7890-abcd-ef1234567890`).

---

### Step 2: Grant Admin Role & Module Permissions

Go to **SQL Editor** in Supabase and run one of the following queries:

#### Option A: Create a Super Admin (Access to ALL modules)
```sql
INSERT INTO public.admin_roles (user_id, role, module_id)
VALUES ('<PASTE_USER_UUID_HERE>', 'super', NULL);
```

#### Option B: Create a Module Editor (e.g. KOHASiL Editor)
*Can view, edit, and delete entries only for the KOHASiL module:*
```sql
INSERT INTO public.admin_roles (user_id, role, module_id)
SELECT '<PASTE_USER_UUID_HERE>', 'editor', id 
FROM public.modules 
WHERE slug = 'kohasil';
```

#### Option C: Create a Module Viewer (Read-Only access)
*Can view entries only for a specific module (e.g. KOPETRO):*
```sql
INSERT INTO public.admin_roles (user_id, role, module_id)
SELECT '<PASTE_USER_UUID_HERE>', 'viewer', id 
FROM public.modules 
WHERE slug = 'kopetro';
```

---

## 3. Role Permissions Matrix

| Role | Overview Stats | View Submissions | Edit & Update Status | Delete Records | Module Scope |
|---|:---:|:---:|:---:|:---:|---|
| **Super Admin** | ✅ Yes | ✅ All Modules | ✅ All Modules | ✅ All Modules | All 5 Modules |
| **Module Editor** | ✅ Yes | ✅ Assigned Only | ✅ Assigned Only | ✅ Assigned Only | Assigned Module(s) |
| **Module Viewer** | ✅ Yes | ✅ Assigned Only | ❌ Read-Only | ❌ Read-Only | Assigned Module(s) |

---

## 4. Using the Admin Dashboard

### Overview Dashboard (`/`)
- Displays system activity status and total submission metrics.
- Shows animated cards for each active module (**KOHASiL Raudhah**, **KOPETRO**, **KRTB**, **KOTAMAS**, **Al-Barzah**) with real-time submission counts.

### Submissions Data Table (`/[module]`)
When you click on any module card (e.g. `/kohasil`), you enter the data management view:

1. **Live Search**:
   - Type in the search box to filter entries instantly by **Nama**, **No KP (IC)**, **Phone Number**, **Pakej**, **Negeri**, or **Status**.
2. **Status Badges**:
   - `pending` (Yellow)
   - `reviewed` / `contacted` (Blue)
   - `completed` (Green)
   - `archived` (Gray)
3. **Editing a Record**:
   - Click the **Pencil icon** (✏️) on any row.
   - A modal opens allowing you to edit **Nama**, **No KP**, **Umur**, **Kategori** (*AHLI, PASANGAN, ANAK, IBU, etc.*), **No Ahli**, **No Telefon**, **Alamat**, **Pakej**, **Utama**, and **Internal Admin Notes**.
   - Click **Save Record Changes**.
4. **Deleting a Record**:
   - Click the **Trash icon** (🗑️) on any row.
   - Confirm in the dialog.

---

## 5. Exporting Reports to Excel / CSV

To export your entries in the exact format of [`CONTOH EXCEL JEMPUTAN (1).xlsx`](file:///Users/user/Documents/Coding/CommonSkill/CONTOH%20EXCEL%20JEMPUTAN%20(1).xlsx):

1. Open the target module page (e.g., `/kohasil`).
2. Click the **Export Excel / CSV** button in the top right.
3. A `.csv` file named `EXCEL_JEMPUTAN_EXPORT_YYYY-MM-DD.csv` will automatically download.
4. Open the downloaded file in Microsoft Excel or Google Sheets. It includes all 15 template columns:
   ```csv
   NO, NAMA, NO KP, UMUR, KATEGORI, NO AHLI, BUKAN ANGGOTA, NO TELEFON, ALAMAT 1, ALAMAT 2, POSKOD, NEGERI, PAKEJ, TARIKH DAFTAR, UTAMA, STATUS
   ```

---

## 6. Connecting Landing Page Forms (Ingest API)

Front-end portal apps can send incoming user enquiry form submissions directly to the admin system:

### Example API Request:
```ts
await fetch("http://localhost:3005/api/submissions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    module_slug: "kohasil", // kohasil | kopetro | krtb | kotamas | albarzah
    submitted_by: "HAMZAH BIN ALI",
    form_data: {
      no: "1",
      nama: "HAMZAH BIN ALI",
      no_kp: "870654032121",
      umur: "37",
      kategori: "AHLI",
      no_ahli: "1234567",
      bukan_anggota: "",
      no_telefon: "013 1300 1998",
      alamat1: "NO 2",
      alamat2: "KG RAJA",
      poskod: "18500",
      negeri: "KELANTAN",
      pakej: "KELUARGA 20",
      tarikh_daftar: "21/10/2026",
      utama: "HAMZAH BIN ALI"
    }
  })
});
```
