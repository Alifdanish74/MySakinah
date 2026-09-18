// File: src/lib/validations.ts
import { z } from "zod";

// Relationship options for waris (family)
export const HUBUNGAN_WARIS_OPTIONS = [
  "Suami",
  "Isteri",
  "Ayah",
  "Ibu",
  "Ayah Mertua",
  "Ibu Mertua",
  "Anak",
  "Abang",
  "Kakak",
  "Adik",
  "Abang Ipar",
  "Kakak Ipar",
  "Adik Ipar",
] as const;

// Friend type options
export const JENIS_KAWAN_OPTIONS = [
  "Kawan Baik",
  "Kawan Rapat",
  "Kawan Sekerja",
  "Kawan Sekolah",
  "Kawan Serumah",
  "Kawan",
  "Kawan Sekampung",
] as const;

// All pakej IDs
export const PAKEJ_OPTIONS = [
  "pakej-80",
  "pakej-120",
  "pakej-180",
  "pakej-240",
  "pakej-1500-seumur-hidup",
] as const;

export const enquirySchema = z.object({
  // Step 1: Maklumat Diri
  nama: z
    .string()
    .min(2, "Nama penuh diperlukan (minimum 2 aksara)")
    .max(100, "Nama terlalu panjang"),
  ic: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const cleanIC = val.replace(/\D/g, "");
      return cleanIC.length === 12;
    }, "No. Kad Pengenalan mestilah 12 digit (cth: 001210-10-0267)"),
  umur: z.string().optional(), // auto-computed from IC, display only
  alamat: z
    .string()
    .min(5, "Sila masukkan alamat penuh")
    .max(300, "Alamat terlalu panjang")
    .optional()
    .or(z.literal("")),
  telefon: z.preprocess(
    (val) => (typeof val === "string" ? val.replace(/[\s-]/g, "") : val),
    z
      .string()
      .min(9, "Nombor telefon tidak sah (minimum 9 digit)")
      .max(16, "Nombor telefon tidak sah")
  ),

  // Step 2: Waris & Kawan
  namaWaris: z.string().optional(),
  telefonWaris: z.preprocess(
    (val) => (typeof val === "string" ? val.replace(/[\s-]/g, "") : val),
    z.string().optional()
  ),
  hubunganWaris: z.string().optional(),
  namaKawan: z.string().optional(),
  telefonKawan: z.preprocess(
    (val) => (typeof val === "string" ? val.replace(/[\s-]/g, "") : val),
    z.string().optional()
  ),
  jenisKawan: z.string().optional(),

  // Step 3: Pakej & Bayaran
  pakej: z.string().min(1, "Sila pilih pakej yang diminati"),
  kaedahHubungi: z
    .enum(["telefon", "whatsapp", "email"])
    .optional()
    .default("whatsapp"),
  persetujuan: z.preprocess(
    (val) => (val === true || val === "true" || val === 1 || val === "1" ? true : val),
    z
      .boolean({
        message: "Anda perlu bersetuju untuk dihubungi oleh pihak Albarzah",
      })
      .optional()
      .default(true)
  ),

  // Legacy fields (kept for compat)
  alamat1: z.string().optional(),
  alamat2: z.string().optional(),
  negeri: z.string().optional(),
  statusKeahlian: z.string().optional(),
  noAhli: z.string().optional(),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
