// packages/api-types/src/enquiry.ts
// Shared Zod validation schemas for MySakinahPro enquiry forms.
//
// Three schemas:
//   baseEnquirySchema        — fields common to ALL apps
//   employerEnquirySchema    — adds lindungiIbuBapa for KOHASiL / KRTB / KotaMas / KOPETRO
//   albarzahEnquirySchema    — Albarzah (public yearly plan) — no salary deduction fields

import { z } from "zod";

// ─── Base schema (all apps) ───────────────────────────────────────────────────
export const baseEnquirySchema = z.object({
  nama: z.string().min(2, "Nama perlu sekurang-kurangnya 2 aksara"),
  telefon: z.string().min(10, "Nombor telefon tidak sah"),
  ic: z.string().optional(),
  alamat1: z.string().optional(),
  alamat2: z.string().optional(),
  negeri: z.string().optional(),
  namaWaris: z.string().optional(),
  telefonWaris: z.string().optional(),
  pakej: z.string().min(1, "Sila pilih pakej"),
  statusKeahlian: z.string().optional(),
  noAhli: z.string().optional(),
  kaedahHubungi: z.enum(["whatsapp", "telefon", "email"]).optional(),
  persetujuan: z.literal(true, {
    errorMap: () => ({ message: "Anda perlu bersetuju sebelum menghantar" }),
  }),
});

// ─── Employer-linked apps: KOHASiL, KRTB, KotaMas, KOPETRO ──────────────────
// Adds the parent-protection field (lindungiIbuBapa)
export const employerEnquirySchema = baseEnquirySchema.extend({
  lindungiIbuBapa: z.boolean().optional(),
});

// ─── Albarzah (general public, yearly plan) ───────────────────────────────────
// No parent-protection field, persetujuan is optional
export const albarzahEnquirySchema = baseEnquirySchema
  .omit({ persetujuan: true })
  .extend({
    persetujuan: z.literal(true).optional(),
  });

// ─── TypeScript types ─────────────────────────────────────────────────────────
export type BaseEnquiryFormData = z.infer<typeof baseEnquirySchema>;
export type EmployerEnquiryFormData = z.infer<typeof employerEnquirySchema>;
export type AlbarzahEnquiryFormData = z.infer<typeof albarzahEnquirySchema>;
