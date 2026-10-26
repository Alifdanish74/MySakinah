import { generateReceiptPdf, ReceiptData, MemberInfo } from '../apps/kohasil/src/lib/generateReceipt.ts';

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

// Dummy receipt data
const dummyData: ReceiptData = {
  packageName: 'Premium Plan',
  packageCategory: 'Family',
  monthlyFee: 30,
  coverage: 'Full Coverage',
  ahli: dummyMember,
  namaWaris: 'Abu Bin Ali',
  telefonWaris: '0198765432',
  statusKeahlian: 'Active',
  members: {},
  submittedAt: new Date(),
  category: "Individu"
};

// Generate the PDF
generateReceiptPdf(dummyData);
