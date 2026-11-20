import {
  generateReceiptPdf,
  generateReceiptReferenceNumber,
  type MemberInfo,
  type ReceiptData,
} from "../packages/ui/src/lib/kohasil-receipt.ts";

// Helper to create dummy member info
const dummyMember: MemberInfo = {
  nama: 'Ali Bin Ahmad',
  telefon: '0123456789',
  ic: '900101-01-1234',
  alamat1: 'No. 1 Jalan Example',
  alamat2: 'Taman Sample',
  alamat3: 'Kuala Lumpur',
  negeri: 'Selangor',
  // optional field
  jenisTanggungan: undefined,
};

const submittedAt = new Date();

// Dummy receipt data
const dummyData: ReceiptData = {
  referenceNumber: generateReceiptReferenceNumber(submittedAt, 1),
  packageName: 'Premium Plan',
  packageCategory: 'Family',
  monthlyFee: 30,
  coverage: 'Full Coverage',
  ahli: dummyMember,
  namaWaris: 'Abu Bin Ali',
  telefonWaris: '0198765432',
  statusKeahlian: 'Active',
  members: {},
  submittedAt,
  category: "Individu"
};

// Generate the PDF
generateReceiptPdf(dummyData);
