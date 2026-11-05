// File: src/lib/validations.ts
import { z } from "zod";

const receiptMemberSchema = z.object({
  nama: z.string(),
  telefon: z.string(),
  ic: z.string(),
  alamat1: z.string(),
  alamat2: z.string(),
  alamat3: z.string(),
  negeri: z.string(),
  jenisTanggungan: z.string().optional(),
});

const receiptDataSchema = z.object({
  referenceNumber: z.string().min(1),
  packageName: z.string().min(1),
  packageCategory: z.string(),
  monthlyFee: z.number().finite().nonnegative(),
  coverage: z.string(),
  ahli: receiptMemberSchema,
  namaWaris: z.string(),
  telefonWaris: z.string(),
  statusKeahlian: z.string(),
  members: z.record(z.string(), receiptMemberSchema),
  submittedAt: z.iso.datetime(),
  category: z.string(),
});

export const enquirySchema = z.object({
  nama: z
    .string()
    .min(2, "Nama penuh diperlukan (minimum 2 aksara)")
    .max(100, "Nama terlalu panjang"),
  telefon: z.preprocess(
    (val) => (typeof val === "string" ? val.replace(/[\s-]/g, "") : val),
    z
      .string()
      .min(9, "Nombor telefon tidak sah (minimum 9 digit)")
      .max(16, "Nombor telefon tidak sah")
  ),
  ic: z.preprocess(
    (val) => (typeof val === "string" ? val.replace(/\D/g, "") : val),
    z.string().optional()
  ),
  alamat1: z.string().optional(),
  alamat2: z.string().optional(),
  negeri: z.string().optional(),
  namaWaris: z.string().optional(),
  telefonWaris: z.preprocess(
    (val) => (typeof val === "string" ? val.replace(/[\s-]/g, "") : val),
    z.string().optional()
  ),
  statusKeahlian: z.string().optional(),
  noAhli: z.string().optional(),
  pakej: z.string().min(1, "Sila pilih pakej yang diminati"),
  lindungiIbuBapa: z.enum(["ya", "tidak"]).optional().default("tidak"),
  kaedahHubungi: z.enum(["telefon", "whatsapp", "email"]).optional().default("whatsapp"),
  persetujuan: z.preprocess(
    (val) => (val === true || val === "true" || val === 1 || val === "1" ? true : val),
    z
      .boolean({
        message: "Anda perlu bersetuju untuk dihubungi oleh pihak Kohasil",
      })
      .optional()
      .default(true)
  ),
  receiptData: receiptDataSchema.optional(),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
