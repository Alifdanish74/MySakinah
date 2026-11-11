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

export interface SalaryDeductionAuthorization {
  noGaji: string;
  jabatanCawangan: string;
  noAnggotaKohasil: string;
  namaBank: string;
  namaBankLain?: string;
  noAkaunBank: string;
}

export interface ReceiptData {
  module?: "kohasil" | "albarzah";
  referenceNumber?: string;
  packageName: string;
  packageCategory: string;
  monthlyFee: number;
  contributionDescription?: string;
  coverage: string;
  ahli: MemberInfo;
  namaWaris: string;
  telefonWaris: string;
  statusKeahlian: string;
  members: Record<string, MemberInfo>;
  submittedAt: Date;
  category: string;
  salaryDeductionAuthorization?: SalaryDeductionAuthorization;
}

export function generateReceiptReferenceNumber(date: Date, module: ReceiptData["module"] = "kohasil"): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  const rand = Math.floor(1000 + Math.random() * 9000);
  const prefix = module === "albarzah" ? "ALBARZAH" : "KOHASIL";
  return `${prefix}-${yyyy}${mm}${dd}-${hh}${min}-${rand}`;
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

function drawKohasilReceiptPages(data: ReceiptData, refNo: string): void {
  const authorization = data.salaryDeductionAuthorization;
  if (!authorization) return;

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  const green: [number, number, number] = [34, 85, 53];
  const navy: [number, number, number] = [43, 48, 113];
  const members = Object.entries(data.members).filter(([, member]) => member.nama.trim() || member.ic.trim());
  const bankName = authorization.namaBank === "Lain-lain"
    ? authorization.namaBankLain || "Lain-lain"
    : authorization.namaBank;
  const monthlyDeduction = data.monthlyFee + (data.statusKeahlian === "Bukan Ahli" ? 1 : 0);

  const drawHeader = (title: string, pageNumber: number) => {
    doc.setFillColor(...navy);
    doc.rect(0, 0, pageWidth, 20, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("SKIM KHAIRAT KOHASIL RAUDHAH", pageWidth / 2, 8, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("Diuruskan oleh BJSB Sdn. Bhd. • www.mysakinahpro.com.my", pageWidth / 2, 14, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(...green);
    doc.text(title, pageWidth / 2, 31, { align: "center" });
    doc.setDrawColor(...green);
    doc.setLineWidth(0.6);
    doc.line(margin, 36, pageWidth - margin, 36);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(70, 70, 70);
    doc.text(`No. Rujukan: ${refNo}`, margin, 43);
    doc.text(
      `Tarikh: ${formatDate(data.submittedAt)}   Masa: ${formatTime(data.submittedAt)}   Halaman ${pageNumber} daripada 2`,
      pageWidth - margin,
      43,
      { align: "right" },
    );
  };

  const drawSectionTitle = (title: string, y: number) => {
    doc.setFillColor(...green);
    doc.roundedRect(margin, y, contentWidth, 7, 1.5, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(title.toUpperCase(), margin + 3, y + 4.8);
    return y + 10;
  };

  const drawFooter = (pageNumber: number) => {
    doc.setFillColor(...navy);
    doc.rect(0, pageHeight - 13, pageWidth, 13, "F");
    doc.setFont("helvetica", "italic");
    doc.setFontSize(6.5);
    doc.setTextColor(255, 255, 255);
    doc.text(
      `Skim Khairat KOHASiL Raudhah • BJSB Sdn. Bhd. • No. Rujukan: ${refNo} • ${pageNumber}/2`,
      pageWidth / 2,
      pageHeight - 5,
      { align: "center" },
    );
  };

  const drawWrapped = (text: string, x: number, y: number, width: number, fontSize = 8): number => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, width);
    doc.text(lines, x, y);
    return lines.length * (fontSize * 0.48);
  };

  const drawMemberRole = (key: string, member: MemberInfo, extraIndex: number) => {
    if (key.startsWith("tanggungan")) {
      return `Tambahan ${extraIndex}${member.jenisTanggungan ? ` (${member.jenisTanggungan})` : ""}`;
    }
    return key.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  // Page 1: a compact application receipt, sized to keep the authorization letter on page 2.
  drawHeader("SURAT PENGESAHAN PERMOHONAN", 1);
  let y = 50;

  doc.setFillColor(217, 119, 6);
  doc.roundedRect(margin, y, contentWidth, 16, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(data.packageName.toUpperCase(), pageWidth / 2, y + 6, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(`CARUMAN POTONGAN GAJI BULANAN • RM${monthlyDeduction.toFixed(2)}`, pageWidth / 2, y + 12, { align: "center" });
  y += 22;

  y = drawSectionTitle("Maklumat Ahli (Pemohon Utama)", y);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(30, 30, 30);
  doc.text("Nama", margin, y);
  doc.text("No. Kad Pengenalan", margin + 100, y);
  doc.setFont("helvetica", "normal");
  doc.text(data.ahli.nama.toUpperCase(), margin, y + 4);
  doc.text(formatIC(data.ahli.ic), margin + 100, y + 4);
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text("No. Telefon", margin, y);
  doc.text("Alamat", margin + 100, y);
  doc.setFont("helvetica", "normal");
  doc.text(formatPhone(data.ahli.telefon), margin, y + 4);
  const applicantAddress = [
    data.ahli.alamat1,
    data.ahli.alamat2,
    data.ahli.alamat3,
    data.ahli.negeri,
  ].filter(Boolean).join(", ");
  const addressHeight = drawWrapped(applicantAddress || "-", margin + 100, y + 4, contentWidth - 103, 7);
  y += Math.max(10, addressHeight + 5);

  y = drawSectionTitle("Maklumat Waris", y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(30, 30, 30);
  doc.text(`Nama: ${data.namaWaris.toUpperCase() || "-"}`, margin, y);
  doc.text(`No. Telefon: ${formatPhone(data.telefonWaris) || "-"}`, margin + 100, y);
  y += 7;

  y = drawSectionTitle("Maklumat Pendaftaran (lampiran)", y);
  const allMembers = Object.entries(data.members);
  let extraIndex = 0;
  allMembers.forEach(([key, member], index) => {
    if (!member.nama.trim() && !member.ic.trim()) return;
    if (key.startsWith("tanggungan")) extraIndex += 1;
    if (index % 2 === 0) {
      doc.setFillColor(245, 248, 246);
      doc.rect(margin, y - 3, contentWidth, 10, "F");
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...green);
    doc.text(drawMemberRole(key, member, extraIndex), margin + 2, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 30, 30);
    const display = `${member.nama || "-"}  •  KP ${formatIC(member.ic) || "-"}  •  Tel ${formatPhone(member.telefon) || "-"}`;
    doc.text(doc.splitTextToSize(display, contentWidth - 45).slice(0, 1), margin + 45, y);
    y += 8;
  });

  y += 2;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(70, 70, 70);
  drawWrapped(
    "Permohonan anda telah diterima untuk diproses. Maklumat lengkap ahli dan kebenaran potongan gaji disertakan pada halaman seterusnya.",
    margin,
    y,
    contentWidth,
    7,
  );
  drawFooter(1);

  // Page 2 follows the plain black-and-white salary-deduction authorization form.
  doc.addPage();
  y = 19;
  doc.setTextColor(0, 0, 0);
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.2);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const drawLabeledValue = (label: string, value: string, labelWidth: number) => {
    doc.setFont("helvetica", "bold");
    doc.text(label === "Saya" ? "Saya" : `${label} :`, margin, y);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(value || "........................................................", contentWidth - labelWidth);
    doc.text(lines, margin + labelWidth, y);
    y += Math.max(5, lines.length * 4.5);
  };
  const addressLines = [
    data.ahli.alamat1,
    data.ahli.alamat2,
    data.ahli.alamat3,
    data.ahli.negeri,
  ].filter(Boolean);

  drawLabeledValue("Nama", data.ahli.nama.toUpperCase(), 18);
  drawLabeledValue("Alamat", addressLines[0] || "", 18);
  addressLines.slice(1).forEach((line) => {
    doc.text(line, margin + 18, y);
    y += 5;
  });
  drawLabeledValue("Tarikh", formatDate(data.submittedAt), 18);
  y += 5;

  doc.text("Kepada", margin, y);
  y += 5;
  doc.setFont("helvetica", "bold");
  doc.text("Setiausaha", margin, y);
  y += 5;
  doc.text("Koperasi Hasil Dalam Negeri Malaysia Berhad", margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.text("Tuan/Puan,", margin, y);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  const purposeHeight = drawWrapped(
    "KEBENARAN POTONGAN GAJI UNTUK SKIM KESIHATAN DAN SIMPANAN PELBAGAI MANFAAT YANG AKAN DIBAYAR OLEH LEMBAGA HASIL DALAM NEGERI MALAYSIA",
    margin,
    y,
    contentWidth,
    9,
  );
  y += purposeHeight + 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  drawLabeledValue("Saya", `${data.ahli.nama.toUpperCase()} (Gunakan Huruf Besar)`, 18);
  drawLabeledValue("No. Kad Pengenalan", `${formatIC(data.ahli.ic)} ( Baru/Lama )`, 39);
  drawLabeledValue("No. Gaji", authorization.noGaji, 24);
  drawLabeledValue("Jabatan/Cawangan", authorization.jabatanCawangan, 39);
  drawLabeledValue("No. Anggota Kohasil", authorization.noAnggotaKohasil, 39);
  drawLabeledValue("No. Akaun/Nama Bank", `${authorization.noAkaunBank} / ${bankName}`, 39);
  y += 5;

  const declarationText = `Dengan ini membenarkan pihak tuan memotong gaji bulanan saya sebanyak RM ${monthlyDeduction.toFixed(2)} untuk diri saya / pasangan / anak saya sebagai sumbangan untuk skim berkelompok pelbagai manfaat GS. Saya mengambil maklum, Kos Pengurusan RM 1.00 secara bulanan akan dikenakan sekiranya saya belum menjadi anggota KOHASIL. Ianya akan berterusan sehingga dimaklumkan secara bertulis kepada KOHASIL.`;
  y += drawWrapped(declarationText, margin, y, contentWidth, 8) + 5;

  const nameColumnWidth = contentWidth * 0.62;
  const icColumnWidth = contentWidth * 0.25;
  const amountColumnWidth = contentWidth - nameColumnWidth - icColumnWidth;
  const icColumnX = margin + nameColumnWidth;
  const amountColumnX = icColumnX + icColumnWidth;
  const drawMemberRow = (member?: MemberInfo, prefix = "") => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    const name = `${prefix}${member?.nama || ""}`;
    const ic = member?.ic ? formatIC(member.ic) : "";
    doc.text(doc.splitTextToSize(name, nameColumnWidth - 2).slice(0, 1), margin, y);
    if (ic) doc.text(doc.splitTextToSize(ic, icColumnWidth - 2).slice(0, 1), icColumnX, y);
    doc.setLineDashPattern([0.2, 0.7], 0);
    doc.line(margin, y + 1.2, margin + nameColumnWidth - 2, y + 1.2);
    doc.line(icColumnX, y + 1.2, icColumnX + icColumnWidth - 2, y + 1.2);
    doc.line(amountColumnX, y + 1.2, amountColumnX + amountColumnWidth - 2, y + 1.2);
    doc.setLineDashPattern([], 0);
    y += 6;
  };
  const mainMember = members.find(([key]) => key === "ahli")?.[1] || data.ahli;
  const spouse = members.find(([key]) => key === "pasangan")?.[1];
  const children = members.filter(([key]) => key !== "ahli" && key !== "pasangan");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("Nama Sendiri/Ahli", margin, y);
  doc.text("No KP", icColumnX, y);
  doc.text("RM", amountColumnX, y);
  y += 5;
  drawMemberRow(mainMember);

  doc.setFont("helvetica", "bold");
  doc.text("Nama Pasangan", margin, y);
  y += 5;
  drawMemberRow(spouse);

  doc.setFont("helvetica", "bold");
  doc.text("Nama Anak-anak", margin, y);
  y += 5;
  const childCount = Math.max(5, children.length);
  for (let index = 0; index < childCount; index += 1) {
    drawMemberRow(children[index]?.[1], `${index + 1}. `);
  }

  doc.setFont("helvetica", "bold");
  doc.text("Jumlah", margin, y);
  doc.text(`RM ${monthlyDeduction.toFixed(2)}`, amountColumnX, y);
  y += 9;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  y += drawWrapped(
    "Jika terdapat sebarang pertanyaan, sila hubungi saya di nombor telefon yang telah diberikan.",
    margin,
    y,
    contentWidth,
    8,
  ) + 3;
  doc.text("Sekian, terima kasih.", margin, y);
  y += 8;
  const signatureFields = [
    "Tandatangan : ......................................",
    "Tarikh : ......................................",
    `No.Telefon : ${formatPhone(data.ahli.telefon)}`,
  ];
  signatureFields.forEach((field) => {
    doc.text(field, margin, y);
    y += 5;
  });

  const filename = `Pengesahan_Permohonan_${data.ahli.nama.replace(/\s+/g, "_")}_${refNo}.pdf`;
  doc.save(filename);
}

export function generateReceiptPdf(data: ReceiptData): void {
  if (data.module === "kohasil" && data.salaryDeductionAuthorization) {
    const refNo = data.referenceNumber || generateReceiptReferenceNumber(data.submittedAt, "kohasil");
    drawKohasilReceiptPages(data, refNo);
    return;
  }

  const isAlbarzah = data.module === "albarzah";
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const refNo = data.referenceNumber || generateReceiptReferenceNumber(data.submittedAt, data.module);
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

  const field = (label: string, value: string, col: "left" | "right" | "third" = "left") => {
    checkPageBreak(8);
    const colW = contentWidth / 3 - 3;
    let colX: number;
    if (col === "left") {
      colX = margin;
    } else if (col === "right") {
      colX = margin + contentWidth / 3 + 2;
    } else {
      colX = margin + (contentWidth / 3) * 2 + 2;
    }

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
    label2: string, val2: string,
    label3?: string, val3?: string
  ) => {
    checkPageBreak(14);
    const leftH = field(label1, val1, "left");
    const midH = label2 ? field(label2, val2, "right") : 0;
    let maxH = Math.max(leftH, midH);
    // Render optional third column if a label/value is provided
    if (label3 && val3) {
      const thirdH = field(label3, val3, "third");
      maxH = Math.max(maxH, thirdH);
    }
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

  const normalField = (label: string, value: string) => {
    checkPageBreak(10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(255, 0, 0);
    doc.text(label, margin, curY);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(255, 0, 0);
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
  doc.text(
    isAlbarzah ? "ALBARZAH • SKIM KHAIRAT KEMATIAN" : "SKIM KHAIRAT KOHASIL RAUDHAH",
    pageWidth / 2,
    6,
    { align: "center" },
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text("Diuruskan oleh BJSB Sdn. Bhd. • www.mysakinahpro.com.my", pageWidth / 2, 10.5, { align: "center" });

  // Title block
  // Add a small top margin before the title to avoid header overlap
  curY += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(34, 85, 53);
  doc.text("SURAT PENGESAHAN PERMOHONAN", pageWidth / 2, curY, { align: "center" });
  curY += 6;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(
    isAlbarzah
      ? "Pengesahan Permohonan Keahlian Albarzah"
      : "Confirmation of Application – Skim Khairat Kematian & Pengurusan Jenazah",
    pageWidth / 2,
    curY,
    { align: "center" },
  );
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
  doc.text(
    data.contributionDescription || `JUMLAH CARUMAN BULANAN • RM${data.monthlyFee}.00 / Sebulan`,
    pageWidth / 2,
    curY + 12,
    { align: "center" },
  );
  curY += 19;

  // ── APPLICANT INFO ────────────────────────────────────────────────
  curY += 2;
  sectionTitle(isAlbarzah ? "A. Maklumat Pemohon" : "A. Maklumat Ahli (Pemohon Utama)");

  rowPair("Nama Penuh", data.ahli.nama.toUpperCase(), "No. Kad Pengenalan", formatIC(data.ahli.ic), "Nama Pakej", data.packageName.toUpperCase());
  rowPair("No. Telefon", formatPhone(data.ahli.telefon), "Negeri", data.ahli.negeri.toUpperCase(), "Kategori", data.category.toUpperCase());
  rowPair(
    "Alamat",
    [data.ahli.alamat1, data.ahli.alamat2, data.ahli.alamat3].filter(Boolean).join(", ").toUpperCase(),
    "",
    "",
    isAlbarzah ? "Jumlah Manfaat" : "Skop Perlindungan",
    data.coverage.toUpperCase(),
  );
  singleField(
    isAlbarzah ? "Status Permohonan" : "Status Keahlian KOHASIL",
    data.statusKeahlian.toUpperCase(),
  );

  curY += 2;
  addLine();

  // ── WARIS ─────────────────────────────────────────────────────────
  sectionTitle("B. Maklumat Waris (Penama)");
  rowPair("Nama Waris", data.namaWaris.toUpperCase(), "No. Telefon Waris", formatPhone(data.telefonWaris), "", "");

  curY += 2;
  addLine();

  // ── OTHER MEMBERS ─────────────────────────────────────────────────
  const otherMembers = Object.entries(data.members).filter(([key]) => key !== "ahli");
  if (otherMembers.length > 0) {
    sectionTitle("C. Maklumat Ahli Keluarga / Tambahan (jika ada)");

    let tanggunanCount = 0;
    otherMembers.forEach(([key, member]) => {
      checkPageBreak(18);
      let label: string;
      if (key.startsWith("tanggungan")) {
        tanggunanCount += 1;
        label = `Kategori: Tambahan ${tanggunanCount}${member.jenisTanggungan ? ` (${member.jenisTanggungan})` : ""}`;
      } else {
        // e.g. "anak_1" → "Anak 1", "pasangan" → "Pasangan"
        label = key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      }

      doc.setFillColor(240, 248, 243);
      doc.rect(margin, curY, contentWidth, 5, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(34, 85, 53);
      doc.text(label, margin + 3, curY + 3.5);
      curY += 7;

      rowPair("Nama Penuh", member.nama.toUpperCase(), "No. Kad Pengenalan", formatIC(member.ic), "", "");
      if (member.telefon) {
        singleField("No. Telefon", formatPhone(member.telefon));
      }
      normalField("1. Waris untuk semua ahli tambahan adalah ahli / pemohon utama (Pemotong Gaji)", "2. Pakej untuk semua ahli tambahan adalah Individu 10 sahaja");
      curY += 2;
    });

    addLine();
  }

  // ── PACKAGE BENEFITS SUMMARY ──────────────────────────────────────
  sectionTitle(isAlbarzah ? "C. Maklumat Pendaftaran Pakej" : "D. Maklumat Pendaftaran Pakej");
  // Build package name display — only count tanggungan (add-ons), not base package members
  const extraCount = Object.keys(data.members).filter(k => k.startsWith("tanggungan")).length;
  const extraPart = extraCount > 0 ? " + " + Array(extraCount).fill("Individu 10").join(" + ") : "";
  if (isAlbarzah) {
    rowPair(
      "Nama Pakej",
      data.packageName.toUpperCase(),
      "Yuran Pakej",
      data.contributionDescription || `RM${data.monthlyFee}.00`,
    );
  } else {
    rowPair(
      "Nama Pakej",
      `${data.packageName.toUpperCase()}${extraPart}`,
      "Caruman Bulanan",
      `RM${data.monthlyFee}.00`,
    );
  }
  curY += 2;
  addLine();

  // ── DISCLAIMER ────────────────────────────────────────────────────
  checkPageBreak(28);
  sectionTitle(isAlbarzah ? "D. Nota Penting" : "E. Nota Penting");

  const notes = isAlbarzah
    ? [
        "1. Surat ini mengesahkan permohonan keahlian Albarzah telah diterima untuk diproses.",
        "2. Tarikh keahlian bermula pada 01 atau 15 haribulan. Manfaat bermula 30 hari selepas tarikh keahlian.",
        "3. Pembaharuan sebelum tarikh tamat mengekalkan manfaat tanpa tempoh menunggu; pembaharuan selepas tamat tertakluk kepada tempoh menunggu 30 hari.",
        "4. Untuk pertanyaan, hubungi Albarzah melalui WhatsApp di 017-3383884.",
        "5. Dokumen ini dijana secara automatik. Sila simpan sebagai rekod permohonan.",
      ]
    : [
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
    isAlbarzah
      ? "Albarzah • Skim Pengurusan Jenazah 24 Jam dan Manfaat Khairat Kematian"
      : "Skim Khairat KOHASiL Raudhah • Diuruskan oleh BJSB Sdn. Bhd. • Daftar Syarikat: 201801031648 (1295100-A)",
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
