import jsPDF from "jspdf";

export interface MemberInfo {
  nama: string;
  telefon: string;
  ic: string;
  alamat1: string;
  alamat2: string;
  alamat3: string;
  negeri: string;
  jenisTanggungan?: string;
}

export interface ReceiptData {
  packageName: string;
  packageCategory: string;
  monthlyFee: number;
  coverage: string;
  ahli: MemberInfo;
  namaWaris: string;
  telefonWaris: string;
  statusKeahlian: string;
  members: Record<string, MemberInfo>;
  submittedAt: Date;
}

function generateReferenceNumber(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `KOHASIL-${yyyy}${mm}${dd}-${hh}${min}-${rand}`;
}

function formatIC(ic: string): string {
  const clean = ic.replace(/\D/g, "");
  if (clean.length === 12) {
    return `${clean.slice(0, 6)}-${clean.slice(6, 8)}-${clean.slice(8)}`;
  }
  return ic;
}

function formatPhone(phone: string): string {
  const clean = phone.replace(/\D/g, "");
  if (clean.length === 10) return `${clean.slice(0, 3)}-${clean.slice(3, 7)}-${clean.slice(7)}`;
  if (clean.length === 11) return `${clean.slice(0, 3)}-${clean.slice(3, 7)}-${clean.slice(7)}`;
  return phone;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("ms-MY", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("ms-MY", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function generateReceiptPdf(data: ReceiptData): void {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const refNo = generateReferenceNumber(data.submittedAt);
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // ── Helper functions ──────────────────────────────────────────────
  let curY = 0;

  const addLine = (thickness = 0.3, color: [number, number, number] = [200, 200, 200]) => {
    doc.setDrawColor(...color);
    doc.setLineWidth(thickness);
    doc.line(margin, curY, pageWidth - margin, curY);
    curY += 4;
  };

  const checkPageBreak = (neededHeight = 12) => {
    if (curY + neededHeight > pageHeight - 20) {
      doc.addPage();
      curY = 20;
    }
  };

  const sectionTitle = (text: string) => {
    checkPageBreak(12);
    doc.setFillColor(34, 85, 53); // brand green
    doc.roundedRect(margin, curY, contentWidth, 8, 2, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(text.toUpperCase(), margin + 4, curY + 5.5);
    curY += 11;
    doc.setTextColor(30, 30, 30);
  };

  const field = (label: string, value: string, col: "left" | "right" = "left") => {
    checkPageBreak(8);
    const colX = col === "left" ? margin : pageWidth / 2 + 2;
    const colW = contentWidth / 2 - 4;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 100, 100);
    doc.text(label, colX, curY);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(20, 20, 20);
    const lines = doc.splitTextToSize(value || "-", colW);
    doc.text(lines, colX, curY + 4);
    const lineHeight = lines.length * 4.5;
    return lineHeight + 4;
  };

  const rowPair = (
    label1: string, val1: string,
    label2: string, val2: string
  ) => {
    checkPageBreak(14);
    const leftH = field(label1, val1, "left");
    field(label2, val2, "right");
    const maxH = Math.max(leftH, 9);
    curY += maxH;
  };

  const singleField = (label: string, value: string) => {
    checkPageBreak(10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 100, 100);
    doc.text(label, margin, curY);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(20, 20, 20);
    const lines = doc.splitTextToSize(value || "-", contentWidth);
    doc.text(lines, margin, curY + 4);
    curY += lines.length * 4.5 + 5;
  };

  // ── HEADER ───────────────────────────────────────────────────────
  curY = 18;

  // Green header bar
  doc.setFillColor(34, 85, 53);
  doc.rect(0, 0, pageWidth, 14, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("SKIM KHAIRAT KOHASIL RAUDHAH", pageWidth / 2, 6, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text("Diuruskan oleh BJSB Sdn. Bhd. • www.mysakinahpro.com.my", pageWidth / 2, 10.5, { align: "center" });

  // Title block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(34, 85, 53);
  doc.text("SURAT PENGESAHAN PERMOHONAN", pageWidth / 2, curY, { align: "center" });
  curY += 6;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text("Confirmation of Application – Skim Khairat Kematian & Pengurusan Jenazah", pageWidth / 2, curY, { align: "center" });
  curY += 8;

  addLine(0.5, [34, 85, 53]);

  // Reference + date row
  doc.setFillColor(245, 250, 247);
  doc.rect(margin, curY - 1, contentWidth, 12, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(34, 85, 53);
  doc.text(`No. Rujukan: ${refNo}`, margin + 3, curY + 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text(
    `Tarikh: ${formatDate(data.submittedAt)}   Masa: ${formatTime(data.submittedAt)}`,
    pageWidth - margin - 3,
    curY + 5,
    { align: "right" }
  );
  curY += 15;

  // ── PACKAGE BANNER ────────────────────────────────────────────────
  doc.setFillColor(217, 119, 6); // amber
  doc.roundedRect(margin, curY, contentWidth, 14, 3, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text(data.packageName.toUpperCase(), pageWidth / 2, curY + 7, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(`RM${data.monthlyFee}.00 / Sebulan  •  ${data.coverage}`, pageWidth / 2, curY + 12, { align: "center" });
  curY += 19;

  // ── APPLICANT INFO ────────────────────────────────────────────────
  curY += 2;
  sectionTitle("A. Maklumat Ahli (Pemohon Utama)");

  rowPair("Nama Penuh", data.ahli.nama.toUpperCase(), "No. Kad Pengenalan", formatIC(data.ahli.ic));
  rowPair("No. Telefon", formatPhone(data.ahli.telefon), "Negeri", data.ahli.negeri.toUpperCase());
  singleField("Alamat", [data.ahli.alamat1, data.ahli.alamat2, data.ahli.alamat3].filter(Boolean).join(", ").toUpperCase());

  curY += 2;
  addLine();

  // ── WARIS ─────────────────────────────────────────────────────────
  sectionTitle("B. Maklumat Waris (Penama)");
  rowPair("Nama Waris", data.namaWaris.toUpperCase(), "No. Telefon Waris", formatPhone(data.telefonWaris));
  singleField("Status Keahlian Waris", data.statusKeahlian.toUpperCase());

  curY += 2;
  addLine();

  // ── OTHER MEMBERS ─────────────────────────────────────────────────
  const otherMembers = Object.entries(data.members).filter(([key]) => key !== "ahli");
  if (otherMembers.length > 0) {
    sectionTitle("C. Maklumat Ahli Keluarga / Tanggungan");

    otherMembers.forEach(([key, member], index) => {
      checkPageBreak(18);
      const label = key.startsWith("tanggungan")
        ? `Tanggungan ${index + 1}${member.jenisTanggungan ? ` (${member.jenisTanggungan})` : ""}`
        : key.charAt(0).toUpperCase() + key.slice(1);

      doc.setFillColor(240, 248, 243);
      doc.rect(margin, curY, contentWidth, 5, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(34, 85, 53);
      doc.text(label, margin + 3, curY + 3.5);
      curY += 7;

      rowPair("Nama Penuh", member.nama.toUpperCase(), "No. Kad Pengenalan", formatIC(member.ic));
      if (member.telefon) {
        singleField("No. Telefon", formatPhone(member.telefon));
      }
      curY += 2;
    });

    addLine();
  }

  // ── PACKAGE BENEFITS SUMMARY ──────────────────────────────────────
  sectionTitle("D. Maklumat Pakej");
  rowPair("Nama Pakej", data.packageName, "Kategori", data.packageCategory.toUpperCase());
  rowPair("Caruman Bulanan", `RM${data.monthlyFee}.00`, "Skop Perlindungan", data.coverage);
  curY += 2;
  addLine();

  // ── DISCLAIMER ────────────────────────────────────────────────────
  checkPageBreak(28);
  sectionTitle("E. Nota Penting");

  const notes = [
    "1. Surat ini adalah pengesahan bahawa permohonan anda telah berjaya diterima oleh sistem.",
    "2. Perlindungan bermula selepas 30 hari dari tarikh 01/15hb terdekat selepas pengesahan bayaran potongan gaji.",
    "3. Pegawai kami akan menghubungi anda dalam masa terdekat bagi tujuan pengesahan lanjut.",
    "4. Untuk sebarang pertanyaan, sila hubungi 011-1300 1999 (WhatsApp) atau emel ke info@bjsb.com.my.",
    "5. Dokumen ini dijana secara automatik. Sila simpan sebagai rekod peribadi anda.",
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(60, 60, 60);
  notes.forEach((note) => {
    checkPageBreak(8);
    const lines = doc.splitTextToSize(note, contentWidth - 4);
    doc.text(lines, margin + 2, curY);
    curY += lines.length * 4.5 + 1.5;
  });

  curY += 4;
  addLine();

  // ── FOOTER ────────────────────────────────────────────────────────
  checkPageBreak(18);
  doc.setFillColor(34, 85, 53);
  doc.rect(0, pageHeight - 14, pageWidth, 14, "F");

  doc.setFont("helvetica", "italic");
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text(
    "Skim Khairat Kohasil Raudhah • Diuruskan oleh BJSB Sdn. Bhd. • Daftar Syarikat: 201801031648 (1295100-A)",
    pageWidth / 2,
    pageHeight - 8,
    { align: "center" }
  );
  doc.text(
    `No. Rujukan: ${refNo}  •  Dijana pada: ${formatDate(data.submittedAt)} ${formatTime(data.submittedAt)}`,
    pageWidth / 2,
    pageHeight - 4,
    { align: "center" }
  );

  // ── DOWNLOAD ──────────────────────────────────────────────────────
  const filename = `Pengesahan_Permohonan_${data.ahli.nama.replace(/\s+/g, "_")}_${refNo}.pdf`;
  doc.save(filename);
}
