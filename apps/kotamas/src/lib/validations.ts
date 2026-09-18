// File: src/lib/validations.ts
import { z } from "zod";

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
      .regex(/^(\+?6?0|\+?60|0)?[1-9]\d{7,9}$/, "Sila masukkan nombor telefon Malaysia yang sah")
  ),
  noAhli: z.string().optional(),
  pakej: z.string().min(1, "Sila pilih pakej yang diminati"),
  lindungiIbuBapa: z.enum(["ya", "tidak"]).optional().default("tidak"),
  kaedahHubungi: z.enum(["telefon", "whatsapp", "email"]).optional().default("whatsapp"),
  persetujuan: z.preprocess(
    (val) => (val === true || val === "true" || val === 1 || val === "1" ? true : val),
    z
      .boolean({
        message: "Anda perlu bersetuju untuk dihubungi oleh pihak Kota Mas",
      })
      .optional()
      .default(true)
  ),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
