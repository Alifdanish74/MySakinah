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

const potonganGajiSchema = z.object({
  noGaji: z.string().trim().min(1, "No. Gaji diperlukan"),
  jabatanCawangan: z.string().trim().min(1, "Jabatan/Cawangan diperlukan"),
  noAnggotaKohasil: z.string().trim().optional(),
  namaBank: z.string().trim().min(1, "Nama bank diperlukan"),
  namaBankLain: z.string().trim().optional(),
  noAkaunBank: z.string().trim().min(1, "No. akaun bank diperlukan"),
}).superRefine((data, ctx) => {
  if (data.namaBank === "Lain-lain" && !data.namaBankLain) {
    ctx.addIssue({
      code: "custom",
      path: ["namaBankLain"],
      message: "Sila masukkan nama bank",
    });
  }
});

const isNonMember = (statusKeahlian: string) =>
  ["bukan ahli", "bukan_ahli", "bukan anggota"].includes(statusKeahlian.trim().toLowerCase());

const receiptDataSchema = z.object({
  referenceNumber: z.string().min(1).optional(),
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
  module: z.enum(["kohasil", "albarzah"]).optional(),
  salaryDeductionAuthorization: potonganGajiSchema.optional(),
}).superRefine((data, ctx) => {
  if (!isNonMember(data.statusKeahlian) && !data.salaryDeductionAuthorization?.noAnggotaKohasil) {
    ctx.addIssue({
      code: "custom",
      path: ["salaryDeductionAuthorization", "noAnggotaKohasil"],
      message: "No. Anggota Kohasil diperlukan",
    });
  }
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
  potonganGaji: potonganGajiSchema.optional(),
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
}).superRefine((data, ctx) => {
  if (
    data.potonganGaji &&
    !isNonMember(data.statusKeahlian || "") &&
    !data.potonganGaji.noAnggotaKohasil
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["potonganGaji", "noAnggotaKohasil"],
      message: "No. Anggota Kohasil diperlukan",
    });
  }
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
