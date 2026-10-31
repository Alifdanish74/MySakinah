"use client";
// File: src/components/submission-table.tsx
// Data table for listing module submissions aligned with CONTOH EXCEL JEMPUTAN (1).xlsx

import { useState, useRef, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Submission } from "@/lib/types";
import { getUmurDisplay, getAlamatDisplay, getPoskodDisplay, getNegeriDisplay, formatIC, formatPhone } from "@/lib/utils";
import { EditModal } from "./edit-modal";
import { DeleteDialog } from "./delete-dialog";
import { FilterModal, type FilterState, EMPTY_FILTER, countActiveFilters } from "./filter-modal";
import { Pencil, Trash2, ChevronLeft, ChevronRight, Download, FileSpreadsheet, SlidersHorizontal, X as XIcon } from "lucide-react";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";

interface SubmissionTableProps {
  submissions: Submission[];
  canEdit: boolean;
  onRefresh: () => void;
  moduleName?: string;
  moduleSlug?: string;
  loadError?: string | null;
}

const PAGE_SIZE = 20;

// Column definitions: generic modules (KOHASiL, KOPETRO, KRTB, KOTAMAS)
const COLS = [
  { label: "NO", center: true },
  { label: "NAMA", center: false },
  { label: "NO KP", center: false },
  { label: "UMUR", center: true },
  { label: "KATEGORI", center: false },
  { label: "NO AHLI / ANGGOTA", center: false },
  { label: "NO TELEFON", center: false },
  { label: "NAMA WARIS", center: false },
  { label: "TELEFON WARIS", center: false },
  { label: "ALAMAT", center: false },
  { label: "POSKOD", center: false },
  { label: "NEGERI", center: false },
  { label: "PAKEJ", center: false },
  { label: "TARIKH DAFTAR", center: false },
  { label: "UTAMA", center: false },
  { label: "TEMPOH KEAHLIAN", center: true },
  { label: "TEMPOH MANFAAT", center: true },
  { label: "STATUS", center: false },
] as const;

// Al-Barzah specific columnsS
const ALBARZAH_COLS = [
  { label: "MOHON", center: false },
  { label: "DAFTAR", center: false },
  { label: "NAMA", center: false },
  { label: "NO KP", center: false },
  { label: "UMUR", center: true },
  { label: "NO TELEFON", center: false },
  { label: "PAKEJ", center: false },
  { label: "NAMA WARIS", center: false },
  { label: "HUBUNGAN", center: false },
  { label: "TEL WARIS", center: false },
  { label: "NAMA KAWAN", center: false },
  { label: "KATEGORI KAWAN", center: false },
  { label: "DIPERKENALKAN OLEH", center: false },
  { label: "NO TEL", center: false },
  { label: "ALAMAT", center: false },
  { label: "POSKOD", center: true },
  { label: "DAERAH/BANDAR", center: false },
  { label: "NEGERI", center: false },
  { label: "TEMPOH KEAHLIAN", center: true },
  { label: "TEMPOH MANFAAT", center: true },
  { label: "STATUS", center: false },
] as const;

export function SubmissionTable({ submissions, canEdit, onRefresh, moduleName, moduleSlug, loadError }: SubmissionTableProps) {
  const router = useRouter();
  const isAlbarzah = moduleSlug === "albarzah";
  const activeCols = isAlbarzah ? ALBARZAH_COLS : COLS;
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTER);
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [editingItem, setEditingItem] = useState<Submission | null>(null);
  const [deletingItem, setDeletingItem] = useState<Submission | null>(null);

  // Derive unique option lists from data for the filter dropdowns
  const pakejOptions = useMemo(() => {
    const set = new Set<string>();
    submissions.forEach((s) => { const p = s.form_data?.pakej; if (p) set.add(p); });
    return Array.from(set).sort();
  }, [submissions]);

  const negeriOptions = useMemo(() => {
    const set = new Set<string>();
    submissions.forEach((s) => {
      const n = getNegeriDisplay(s.form_data || {});
      if (n && n !== "N/A") set.add(n);
    });
    return Array.from(set).sort();
  }, [submissions]);

  const statusOptions = useMemo(
    () => Array.from(new Set(submissions.map((submission) => submission.status))).sort(),
    [submissions],
  );

  function handleApplyFilter(f: FilterState) {
    setFilters({ ...f, search });
    setPage(1);
  }

  function clearOneFilter(key: keyof FilterState) {
    const next = { ...filters, [key]: "" };
    setFilters(next);
    if (key === "search") setSearch("");
    setPage(1);
  }

  // ── Column resize ──────────────────────────────────────────
  // null = not yet measured (renders with tableLayout:auto to get natural widths)
  const [colWidths, setColWidths] = useState<number[] | null>(null);
  const theadRowRef = useRef<HTMLTableRowElement>(null);
  const dragState = useRef<{ colIdx: number; startX: number; startW: number } | null>(null);

  // Reset measured widths whenever the module (column layout) changes
  useEffect(() => {
    setColWidths(null);
  }, [moduleSlug]);

  // Measure each th's natural width after first render, then lock to fixed layout
  useEffect(() => {
    if (colWidths !== null || !theadRowRef.current) return;
    const ths = Array.from(theadRowRef.current.querySelectorAll("th")).slice(0, activeCols.length);
    setColWidths(ths.map((th) => Math.ceil(th.getBoundingClientRect().width)));
  }, [colWidths]); // eslint-disable-line react-hooks/exhaustive-deps

  function onResizeStart(colIdx: number, e: React.PointerEvent) {
    if (!colWidths) return;
    e.preventDefault();
    dragState.current = { colIdx, startX: e.clientX, startW: colWidths[colIdx] };

    function onPointerMove(ev: PointerEvent) {
      if (!dragState.current) return;
      const { colIdx, startX, startW } = dragState.current;
      const delta = ev.clientX - startX;
      const newW = Math.max(40, Math.min(1200, startW + delta));
      setColWidths((prev) => {
        if (!prev) return prev;
        const next = [...prev];
        next[colIdx] = newW;
        return next;
      });
    }
    function onPointerUp() {
      dragState.current = null;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    }
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }
  // ──────────────────────────────────────────────────────────

  // Refs for syncing top & bottom scrollbars
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const topScrollRef = useRef<HTMLDivElement>(null);
  const innerDummyRef = useRef<HTMLDivElement>(null);

  // Keep inner dummy width in sync with actual table width
  useEffect(() => {
    const wrapper = tableWrapperRef.current;
    const dummy = innerDummyRef.current;
    if (!wrapper || !dummy) return;
    const syncWidth = () => {
      const table = wrapper.querySelector("table");
      dummy.style.width = table ? `${table.scrollWidth}px` : "100%";
    };
    syncWidth();
    const ro = new ResizeObserver(syncWidth);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  // Sync scroll: top bar → table wrapper
  function onTopScroll() {
    if (tableWrapperRef.current && topScrollRef.current) {
      tableWrapperRef.current.scrollLeft = topScrollRef.current.scrollLeft;
    }
  }
  // Sync scroll: table wrapper → top bar
  function onBottomScroll() {
    if (tableWrapperRef.current && topScrollRef.current) {
      topScrollRef.current.scrollLeft = tableWrapperRef.current.scrollLeft;
    }
  }

  // ── Helper: parse "DD/MM/YYYY" or "DD/MM/YYYY - ..." → Date | null ───────
  function parseDMY(dmy: string): Date | null {
    if (!dmy) return null;
    const [d, m, y] = dmy.split("/");
    if (!d || !m || !y) return null;
    const dt = new Date(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`);
    return isNaN(dt.getTime()) ? null : dt;
  }
  function startDateOfTempoh(raw?: string): Date | null {
    if (!raw) return null;
    return parseDMY(raw.split(" - ")[0].trim());
  }

  // ── Combined filter logic ────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const f = filters;
    return submissions.filter((s) => {
      const fd = s.form_data || {};
      const umurStr = getUmurDisplay(fd);
      const negeriStr = getNegeriDisplay(fd);

      // ── Text search (across key fields) ──────────────────────────────
      if (q) {
        const haystack = [
          fd.nama ?? s.submitted_by ?? "",
          fd.no_kp ?? "",
          umurStr,
          fd.kategori ?? "",
          fd.no_ahli ?? "",
          fd.no_telefon ?? "",
          getAlamatDisplay(fd),
          getPoskodDisplay(fd),
          negeriStr,
          fd.pakej ?? "",
          fd.utama ?? "",
          s.status,
          s.tempoh_keahlian ?? "",
          s.tempoh_manfaat ?? "",
        ].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      // ── Nama ─────────────────────────────────────────────────────────
      if (f.nama) {
        const nama = (fd.nama ?? s.submitted_by ?? "").toLowerCase();
        if (!nama.includes(f.nama.toLowerCase())) return false;
      }

      // ── No KP ────────────────────────────────────────────────────────
      if (f.no_kp) {
        const kp = (fd.no_kp ?? fd.ic ?? "").replace(/\D/g, "");
        if (!kp.startsWith(f.no_kp.replace(/\D/g, ""))) return false;
      }

      // ── Status ───────────────────────────────────────────────────────
      if (f.status && s.status !== f.status) return false;

      // ── Pakej ────────────────────────────────────────────────────────
      if (f.pakej && !(fd.pakej ?? "").toLowerCase().includes(f.pakej.toLowerCase())) return false;

      // ── Negeri ───────────────────────────────────────────────────────
      if (f.negeri && !negeriStr.toLowerCase().includes(f.negeri.toLowerCase())) return false;

      // ── Umur range ───────────────────────────────────────────────────
      const umurNum = parseInt(umurStr, 10);
      if (f.umurMin && !isNaN(umurNum) && umurNum < parseInt(f.umurMin, 10)) return false;
      if (f.umurMax && !isNaN(umurNum) && umurNum > parseInt(f.umurMax, 10)) return false;

      // ── Tarikh Daftar range ──────────────────────────────────────────
      if (f.tarikhFrom || f.tarikhTo) {
        const rawTarikh = fd.tarikh_daftar || s.created_at;
        // parse both DD/MM/YYYY and ISO
        let tarikhDate: Date | null = parseDMY(rawTarikh);
        if (!tarikhDate) {
          const d = new Date(rawTarikh);
          tarikhDate = isNaN(d.getTime()) ? null : d;
        }
        if (tarikhDate) {
          if (f.tarikhFrom && tarikhDate < new Date(f.tarikhFrom)) return false;
          if (f.tarikhTo) {
            const toEnd = new Date(f.tarikhTo);
            toEnd.setDate(toEnd.getDate() + 1);
            if (tarikhDate >= toEnd) return false;
          }
        }
      }

      // ── Tempoh Keahlian start range ───────────────────────────────────
      if (f.tkFrom || f.tkTo) {
        const dt = startDateOfTempoh(s.tempoh_keahlian);
        if (dt) {
          if (f.tkFrom && dt < new Date(f.tkFrom)) return false;
          if (f.tkTo) {
            const toEnd = new Date(f.tkTo);
            toEnd.setDate(toEnd.getDate() + 1);
            if (dt >= toEnd) return false;
          }
        } else {
          // no tempoh set → exclude if filter is active
          if (f.tkFrom || f.tkTo) return false;
        }
      }

      // ── Tempoh Manfaat start range ────────────────────────────────────
      if (f.tmFrom || f.tmTo) {
        const dt = startDateOfTempoh(s.tempoh_manfaat);
        if (dt) {
          if (f.tmFrom && dt < new Date(f.tmFrom)) return false;
          if (f.tmTo) {
            const toEnd = new Date(f.tmTo);
            toEnd.setDate(toEnd.getDate() + 1);
            if (dt >= toEnd) return false;
          }
        } else {
          if (f.tmFrom || f.tmTo) return false;
        }
      }

      return true;
    });
  }, [submissions, search, filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (loadError) {
    return (
      <section className="error-state" role="alert" aria-labelledby="submission-load-error-title">
        <h3 id="submission-load-error-title" style={{ margin: "0 0 0.375rem", color: "var(--color-admin-text)" }}>
          Unable to load submissions
        </h3>
        <p style={{ margin: "0 0 1rem" }}>{loadError}</p>
        <button type="button" className="btn-ghost" onClick={() => router.refresh()}>
          Try again
        </button>
      </section>
    );
  }

  function formatDate(iso: string) {
    if (!iso) return "N/A";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-MY", {
      day: "2-digit", month: "2-digit", year: "numeric",
    });
  }

  function exportToCSV() {
    const headers = [
      "NO",
      "NAMA",
      "NO KP",
      "UMUR",
      "KATEGORI",
      "PAKEJ",
      "UTAMA",
      "TARIKH DAFTAR",
      "STATUS",
      "NO AHLI",
      "BUKAN ANGGOTA",
      "NO TELEFON",
      "NAMA WARIS",
      "TELEFON WARIS",
      "ALAMAT 1",
      "POSKOD",
      "NEGERI",
      "TEMPOH KEAHLIAN",
      "TEMPOH MANFAAT",
    ];

    const rows = filtered.map((s, index) => {
      const fd = s.form_data || {};
      const no = fd.no || (index + 1).toString();
      const nama = fd.nama || s.submitted_by || "";
      const no_kp = fd.no_kp || fd.ic || fd.no_ic || "";
      const umur = getUmurDisplay(fd);
      const kategori = fd.kategori || fd.statusKeahlian || "AHLI";
      const pakej = fd.pakej || "";
      const utama = fd.utama || nama;
      const tarikh_daftar = fd.tarikh_daftar || formatDate(s.created_at);
      const status = s.status;
      const no_ahli = fd.no_ahli || "";
      const bukan_anggota = fd.bukan_anggota || (no_ahli ? "" : "BUKAN ANGGOTA");
      const no_telefon = fd.no_telefon || fd.telefon || fd.phone || "";
      const nama_waris = fd.namaWaris || fd.nama_waris || "";
      const telefon_waris = fd.telefonWaris || fd.telefon_waris || "";
      const alamat1 = fd.alamat1 || fd.alamat || "";
      const alamat2 = fd.alamat2 || "";
      const poskod = getPoskodDisplay(fd) === "N/A" ? "" : getPoskodDisplay(fd);
      const negeri = getNegeriDisplay(fd) === "N/A" ? "" : getNegeriDisplay(fd);
      const tk = s.tempoh_keahlian || "";
      const tkParts = tk.split(" - ").map((p: string) => p.trim());
      const tempoh_keahlian = tk
        ? (tkParts.length === 1 || !tkParts[1] ? `${tkParts[0]} - Hingga Tamat Perkhidmatan` : tk)
        : "";
      const tempoh_manfaat = s.tempoh_manfaat || "";

      return [
        no,
        `"${nama.replace(/"/g, '""')}"`,
        `="${no_kp}"`,   // ="..." forces Excel to treat as text, prevents 9.00E+11 notation
        `"${umur === "N/A" ? "" : umur}"`,
        `"${kategori}"`,
        `"${pakej}"`,
        `"${utama.replace(/"/g, '""')}"`,
        `"${tarikh_daftar}"`,
        `"${status}"`,
        `"${no_ahli}"`,
        `"${bukan_anggota}"`,
        `"${no_telefon}"`,
        `"${nama_waris.replace(/"/g, '""')}"`,
        `"${telefon_waris}"`,
        `"${alamat1.replace(/"/g, '""')}"`,
        `"${poskod}"`,
        `"${negeri}"`,
        `"${tempoh_keahlian}"`,
        `"${tempoh_manfaat}"`,
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const module_name = moduleName || "Module";
    const date = new Date().toISOString().slice(0, 10);
    link.setAttribute("download", `Export_${module_name}_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function exportAlbarzahCSV() {
    const headers = [
      "TARIKH DAFTAR",
      "TARIKH MOHON",
      "NAMA",
      "NO KP",
      "UMUR",
      "NO TELEFON",
      "PAKEJ",
      "NAMA WARIS",
      "HUBUNGAN",
      "TEL WARIS",
      "NAMA KAWAN",
      "KATEGORI KAWAN",
      "DIPERKENALKAN OLEH",
      "NO TEL DIPERKENALKAN",
      "ALAMAT",
      "POSKOD",
      "DAERAH/BANDAR",
      "NEGERI",
      "TEMPOH KEAHLIAN",
      "TEMPOH MANFAAT",
      "STATUS",
    ];

    const rows = filtered.map((s) => {
      const fd = s.form_data || {};
      const nama = fd.nama || s.submitted_by || "";
      const no_kp = fd.no_kp || fd.ic || fd.no_ic || "";
      const umur = getUmurDisplay(fd);
      const no_telefon = fd.no_telefon || fd.telefon || fd.phone || "";
      const pakej = fd.pakej || "";
      const tarikh_daftar = fd.tarikh_daftar || formatDate(s.created_at);
      const tarikh_mohon = fd.tarikh_mohon || "";
      const nama_waris = fd.namaWaris || fd.nama_waris || "";
      const hubungan_waris = fd.hubunganWaris || fd.hubungan_waris || "";
      const telefon_waris = fd.telefonWaris || fd.telefon_waris || "";
      const nama_kawan = fd.namaKawan || fd.nama_kawan || "";
      const jenis_kawan = fd.jenisKawan || fd.jenis_kawan || "";
      const nama_perkenalkan = fd.namaPerkenalkan || fd.nama_perkenalkan || "";
      const tel_perkenalkan = fd.telefonPerkenalkan || fd.telefon_perkenalkan || "";
      const alamat = fd.alamat1 || fd.alamat || "";
      const poskod = getPoskodDisplay(fd) === "N/A" ? "" : getPoskodDisplay(fd);
      const daerah = fd.alamat3 || fd.daerah || "";
      const negeri = getNegeriDisplay(fd) === "N/A" ? "" : getNegeriDisplay(fd);

      return [
        `"${tarikh_daftar}"`,
        `"${tarikh_mohon}"`,
        `"${nama.replace(/"/g, '""')}"`,
        `="${no_kp}"`,
        `"${umur === "N/A" ? "" : umur}"`,
        `"${no_telefon}"`,
        `"${pakej}"`,
        `"${nama_waris.replace(/"/g, '""')}"`,
        `"${hubungan_waris}"`,
        `"${telefon_waris}"`,
        `"${nama_kawan.replace(/"/g, '""')}"`,
        `"${jenis_kawan}"`,
        `"${nama_perkenalkan.replace(/"/g, '""')}"`,
        `"${tel_perkenalkan}"`,
        `"${alamat.replace(/"/g, '""')}"`,
        `"${poskod}"`,
        `"${daerah}"`,
        `"${negeri}"`,
        `"${s.tempoh_keahlian || ""}"`,
        `"${s.tempoh_manfaat || ""}"`,
        `"${s.status}"`,
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    const module_name = moduleName || "AlBarzah";
    const date = new Date().toISOString().slice(0, 10);
    link.setAttribute("download", `Export_${module_name}_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

      {/* Top Search & Actions Bar */}
      <div className="search-action-bar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
        {/* Search input */}
        {/* <div style={{ position: "relative", flex: 1, minWidth: 220, maxWidth: 420 }}>
          <Search size={15} style={{
            position: "absolute", left: "0.875rem", top: "50%",
            transform: "translateY(-50%)",
            color: "var(--color-admin-text-muted)", pointerEvents: "none",
          }} />
          <input
            id="submission-search"
            type="search"
            placeholder="Search by nama, IC, negeri, pakej..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="form-input"
            style={{ paddingLeft: "2.5rem" }}
          />
        </div> */}

        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          {/* Filter button */}
          <button
            id="open-filter-btn"
            onClick={() => setFilterOpen(true)}
            className={clsx("btn-ghost", countActiveFilters(filters) > 0 && "btn-primary")}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.5rem 1rem",
              position: "relative",
              ...(countActiveFilters(filters) > 0 ? {} : {
                borderColor: "var(--color-admin-border-bright)",
                color: "var(--color-admin-text)",
              }),
            }}
          >
            <SlidersHorizontal size={15} aria-hidden="true" />
            <span>Filter</span>
            {countActiveFilters(filters) > 0 && (
              <span style={{
                background: "var(--color-admin-primary-soft)",
                color: "var(--color-admin-primary-strong)",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.6875rem", fontWeight: 700, padding: "0.05rem 0.45rem",
              }}>{countActiveFilters(filters)}</span>
            )}
          </button>

          {/* Export */}
          <button
            id="export-csv-btn"
            onClick={isAlbarzah ? exportAlbarzahCSV : exportToCSV}
            className="btn-ghost"
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.5rem 1rem",
              borderColor: "var(--color-admin-border-bright)",
              color: "var(--color-admin-text)",
            }}
          >
            <FileSpreadsheet size={16} aria-hidden="true" style={{ color: "var(--color-admin-accent)" }} />
            <span>Export CSV</span>
            <Download size={14} aria-hidden="true" style={{ opacity: 0.7 }} />
          </button>

        </div>
      </div>

      {/* Active filter chips */}
      {(() => {
        const chips: { key: keyof FilterState; label: string }[] = [];
        if (filters.nama) chips.push({ key: "nama", label: `Nama: ${filters.nama}` });
        if (filters.no_kp) chips.push({ key: "no_kp", label: `No KP: ${filters.no_kp}` });
        if (filters.status) chips.push({ key: "status", label: `Status: ${filters.status}` });
        if (filters.pakej) chips.push({ key: "pakej", label: `Pakej: ${filters.pakej}` });
        if (filters.negeri) chips.push({ key: "negeri", label: `Negeri: ${filters.negeri}` });
        if (filters.umurMin) chips.push({ key: "umurMin", label: `Umur ≥ ${filters.umurMin}` });
        if (filters.umurMax) chips.push({ key: "umurMax", label: `Umur ≤ ${filters.umurMax}` });
        if (filters.tarikhFrom) chips.push({ key: "tarikhFrom", label: `Tarikh ≥ ${filters.tarikhFrom}` });
        if (filters.tarikhTo) chips.push({ key: "tarikhTo", label: `Tarikh ≤ ${filters.tarikhTo}` });
        if (filters.tkFrom) chips.push({ key: "tkFrom", label: `T.Keahlian ≥ ${filters.tkFrom}` });
        if (filters.tkTo) chips.push({ key: "tkTo", label: `T.Keahlian ≤ ${filters.tkTo}` });
        if (filters.tmFrom) chips.push({ key: "tmFrom", label: `T.Manfaat ≥ ${filters.tmFrom}` });
        if (filters.tmTo) chips.push({ key: "tmTo", label: `T.Manfaat ≤ ${filters.tmTo}` });
        if (chips.length === 0) return null;
        return (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--color-admin-text-muted)", marginRight: 2 }}>
              Active filters:
            </span>
            {chips.map(({ key, label }) => (
              <span
                key={key}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.25rem",
                  background: "var(--color-admin-primary-soft)",
                  border: "1px solid var(--color-admin-border-bright)",
                  color: "var(--color-admin-primary)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.7rem", fontWeight: 600,
                  padding: "0.2rem 0.5rem 0.2rem 0.625rem",
                }}
              >
                {label}
                <button
                  type="button"
                  className="filter-chip-remove"
                  onClick={() => clearOneFilter(key)}
                  style={{
                    color: "inherit",
                  }}
                  aria-label={`Remove ${label} filter`}
                >
                  <XIcon size={14} aria-hidden="true" />
                </button>
              </span>
            ))}
            <button
              type="button"
              className="filter-clear-all"
              onClick={() => { setFilters(EMPTY_FILTER); setSearch(""); setPage(1); }}
              style={{
                cursor: "pointer",
              }}
            >
              Clear all
            </button>
          </div>
        );
      })()}

      {/* Top Mirror Scrollbar */}
      <div
        ref={topScrollRef}
        onScroll={onTopScroll}
        aria-hidden="true"
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          height: 12,
          borderRadius: "var(--radius-md) var(--radius-md) 0 0",
          marginBottom: -1,
        }}
      >
        <div ref={innerDummyRef} style={{ height: 1 }} />
      </div>

      {/* Excel Structure Data Table */}
      <div
        ref={tableWrapperRef}
        onScroll={onBottomScroll}
        className="surface"
        role="region"
        aria-label={`${moduleName || "Module"} submissions`}
        tabIndex={0}
        style={{
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: "calc(100vh - 280px)",
          WebkitOverflowScrolling: "touch",
          borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
          border: "1px solid var(--color-admin-border)",
        }}
      >
        <table
          className="admin-table"
          style={{
            fontSize: "0.8125rem",
            width: colWidths ? undefined : "100%",
            borderCollapse: "collapse",
            minWidth: 1000,
            tableLayout: colWidths ? "fixed" : "auto",
          }}
        >
          <caption className="sr-only">
            {moduleName || "Module"} submissions
          </caption>
          {/* colgroup rendered after widths are measured */}
          {colWidths && (
            <colgroup>
              {activeCols.map((_, i) => (
                <col key={i} style={{ width: colWidths[i] }} />
              ))}
              {canEdit && <col style={{ width: 128 }} />}
            </colgroup>
          )}
          <thead>
            <tr
              ref={theadRowRef}
              style={{
                background: "var(--color-admin-surface-2)",
                borderBottom: "1px solid var(--color-admin-border)",
                position: "sticky",
                top: 0,
                zIndex: 2,
              }}
            >
              {activeCols.map((col, i) => (
                <th
                  key={col.label}
                  style={{
                    position: "relative",
                    userSelect: "none",
                    textAlign: col.center ? "center" : undefined,
                    ...(colWidths ? {
                      width: colWidths[i],
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    } : {
                      whiteSpace: "nowrap",
                    }),
                  }}
                >
                  {col.label}
                  {colWidths && (
                    <span
                      role="separator"
                      aria-orientation="vertical"
                      aria-valuemin={40}
                      aria-valuemax={1200}
                      aria-valuenow={colWidths[i]}
                      aria-label={`Resize ${col.label} column`}
                      tabIndex={0}
                      onPointerDown={(e) => onResizeStart(i, e)}
                      onKeyDown={(event) => {
                        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                        event.preventDefault();
                        const delta = event.key === "ArrowRight" ? 16 : -16;
                        setColWidths((previous) => {
                          if (!previous) return previous;
                          const next = [...previous];
                          next[i] = Math.max(40, Math.min(1200, next[i] + delta));
                          return next;
                        });
                      }}
                      title="Drag or use arrow keys to resize"
                      className="column-resizer"
                      style={{
                        position: "absolute",
                        right: -22,
                        top: "50%",
                        width: 44,
                        height: 44,
                        transform: "translateY(-50%)",
                        display: "grid",
                        placeItems: "center",
                        border: 0,
                        padding: 0,
                        color: "var(--color-admin-primary)",
                        cursor: "col-resize",
                        touchAction: "none",
                        zIndex: 1,
                      }}
                    >
                      <span aria-hidden="true" className="column-resizer-mark" />
                    </span>
                  )}
                </th>
              ))}
              {canEdit && <th style={{ textAlign: "right" }}>ACTIONS</th>}
            </tr>
          </thead>
          <tbody>
              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={activeCols.length + (canEdit ? 1 : 0)}
                    style={{ textAlign: "center", padding: "3rem", color: "var(--color-admin-text-muted)" }}
                  >
                    No matching records found.
                  </td>
                </tr>
              )}
              {paginated.map((s, i) => {
                const fd = s.form_data || {};
                const nama = fd.nama || s.submitted_by || "N/A";
                const no_kp = formatIC(fd.no_kp || fd.ic || fd.no_ic);
                const umur = getUmurDisplay(fd);
                const no_telefon = formatPhone(fd.no_telefon || fd.telefon || fd.phone);
                const alamatStr = fd.alamat1 || fd.alamat || "";
                const poskodStr = getPoskodDisplay(fd);
                const negeriStr = getNegeriDisplay(fd);
                const pakej = fd.pakej || "N/A";
                const tarikh_daftar = fd.tarikh_daftar || formatDate(s.created_at);

                // ── Al-Barzah specific row ────────────────────────────────
                if (isAlbarzah) {
                  const nama_waris = fd.namaWaris || fd.nama_waris || "N/A";
                  const hubungan_waris = fd.hubunganWaris || fd.hubungan_waris || "N/A";
                  const telefon_waris = formatPhone(fd.telefonWaris || fd.telefon_waris);
                  const nama_kawan = fd.namaKawan || fd.nama_kawan || "N/A";
                  const jenis_kawan = fd.jenisKawan || fd.jenis_kawan || "N/A";
                  const nama_perkenalkan = fd.namaPerkenalkan || fd.nama_perkenalkan || "N/A";
                  const tel_perkenalkan = formatPhone(fd.telefonPerkenalkan || fd.telefon_perkenalkan);
                  const tel_kawan = formatPhone(fd.telefonKawan || fd.telefon_kawan);
                  const daerah = fd.alamat3 || fd.daerah || "N/A";
                  const tarikh_mohon = fd.tarikh_mohon || "";

                  return (
                    <tr
                      key={s.id}
                      style={{ borderBottom: "1px solid var(--color-admin-border)" }}
                    >
                      {/* 1. Tarikh Daftar */}
                      <td style={{ whiteSpace: "nowrap", color: "var(--color-admin-text-muted)", fontSize: "0.75rem" }}>
                        {tarikh_daftar}
                      </td>
                      {/* 2. Tarikh Mohon */}
                      <td style={{ whiteSpace: "nowrap", color: "var(--color-admin-text-muted)", fontSize: "0.75rem" }}>
                        {tarikh_mohon || "N/A"}
                      </td>
                      {/* 3. Nama */}
                      <td style={{ fontWeight: 600, color: "var(--color-admin-text)" }}>{nama}</td>
                      {/* 4. No KP */}
                      <td style={{ fontFamily: "monospace", color: "var(--color-admin-primary)", fontSize: "0.75rem" }}>
                        {no_kp}
                      </td>
                      {/* 5. Umur */}
                      <td style={{ textAlign: "center", fontWeight: 600, color: "var(--color-admin-text)" }}>
                        {umur}
                      </td>

                      {/* 6. No Telefon */}
                      <td style={{ fontFamily: "monospace", fontSize: "0.75rem" }}>{no_telefon}</td>
                      {/* 5. Pakej */}
                      <td style={{ fontWeight: 500, color: "var(--color-admin-accent)", whiteSpace: "nowrap" }}>
                        {pakej}
                      </td>
                      {/* 7. Nama Waris */}
                      <td style={{ fontWeight: 500, color: "var(--color-admin-text)" }}>
                        {nama_waris}
                      </td>
                      {/* 8. Hubungan */}
                      <td style={{ color: "var(--color-admin-text-muted)", whiteSpace: "nowrap" }}>
                        {hubungan_waris}
                      </td>
                      {/* 9. Tel Waris */}
                      <td style={{ fontFamily: "monospace", color: "var(--color-admin-text-muted)", fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                        {telefon_waris}
                      </td>
                      {/* 10. Nama Kawan */}
                      <td style={{ fontWeight: 500, color: "var(--color-admin-text)", whiteSpace: "nowrap" }}>
                        {nama_kawan}
                      </td>
                      {/* 11. Kategori Kawan */}
                      <td style={{ color: "var(--color-admin-text-muted)", whiteSpace: "nowrap" }}>
                        {jenis_kawan}
                      </td>
                      {/* 12. Diperkenalkan */}
                      <td style={{ fontWeight: 500, color: "var(--color-admin-text)", whiteSpace: "nowrap" }}>
                        {nama_perkenalkan}
                      </td>
                      {/* 13. Tel Diperkenalkan */}
                      <td style={{ fontFamily: "monospace", color: "var(--color-admin-text-muted)", fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                        {tel_perkenalkan}
                      </td>
                      {/* 14. Alamat */}
                      <td style={{ overflow: "hidden", textOverflow: "ellipsis", color: "var(--color-admin-text-muted)" }}>
                        {alamatStr}
                      </td>
                      {/* 15. Poskod */}
                      <td style={{ textAlign: "center", fontFamily: "monospace", color: "var(--color-admin-text-muted)", fontSize: "0.75rem" }}>
                        {poskodStr}
                      </td>
                      {/* 16. Daerah/Bandar */}
                      <td style={{ color: "var(--color-admin-text-muted)", whiteSpace: "nowrap" }}>
                        {daerah}
                      </td>
                      {/* 17. Negeri */}
                      <td style={{ fontWeight: 500, color: "var(--color-admin-text)" }}>{negeriStr}</td>
                      {/* 18. Tempoh Keahlian */}
                      <td style={{ textAlign: "center", color: "var(--color-admin-text-muted)", whiteSpace: "nowrap" }}>
                        {s.tempoh_keahlian || "N/A"}
                      </td>
                      {/* 19. Tempoh Manfaat */}
                      <td style={{ textAlign: "center", color: "var(--color-admin-text-muted)", whiteSpace: "nowrap" }}>
                        {s.tempoh_manfaat || "N/A"}
                      </td>
                      {/* 20. Status */}
                      {/* 20. Status */}
                      <td>
                        {/* Map new status values to badge classes */}
                        {(() => {
                          const statusMap: Record<string, string> = {
                            baru: "badge-new",
                            terima: "badge-new",
                            tangguh: "badge-reviewed",
                            proses: "badge-reviewed",
                            aktif: "badge-completed",
                            tamat: "badge-archived",
                            "tak layak": "badge-archived",
                            "lebih umur": "badge-archived",
                            meninggal: "badge-archived",
                          };
                          const badgeClass = statusMap[s.status] || "badge-new";
                          return (
                            <span className={clsx("badge", badgeClass)} style={{ textTransform: "capitalize" }}>
                              {s.status}
                            </span>
                          );
                        })()}
                      </td>
                      {/* 19. Actions */}
                      {canEdit && (
                        <td style={{ textAlign: "right" }}>
                          <div style={{ display: "flex", gap: "0.375rem", justifyContent: "flex-end" }}>
                            <button
                              id={`edit-${s.id}`}
                              onClick={() => setEditingItem(s)}
                              className="btn-ghost"
                              style={{ padding: "0.375rem 0.5rem", minHeight: 44, minWidth: 44 }}
                              aria-label={`Edit ${nama}`}
                            >
                              <Pencil size={16} aria-hidden="true" />
                            </button>
                            <button
                              id={`delete-${s.id}`}
                              onClick={() => setDeletingItem(s)}
                              className="btn-danger"
                              style={{ padding: "0.375rem 0.5rem", minHeight: 44, minWidth: 44 }}
                              aria-label={`Delete ${nama}`}
                            >
                              <Trash2 size={16} aria-hidden="true" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                }

                // ── Generic modules row ───────────────────────────────────
                const rowNo = fd.no || ((page - 1) * PAGE_SIZE + i + 1).toString();
                const kategori = fd.kategori || fd.statusKeahlian || "AHLI";
                const no_ahli = fd.no_ahli || (fd.bukan_anggota ? "BUKAN ANGGOTA" : "N/A");
                const nama_waris = fd.namaWaris || fd.nama_waris || "N/A";
                const telefon_waris = formatPhone(fd.telefonWaris || fd.telefon_waris);
                const utama = fd.utama || nama;

                return (
                  <tr
                    key={s.id}
                    style={{ borderBottom: "1px solid var(--color-admin-border)" }}
                  >
                    <td style={{ textAlign: "center", color: "var(--color-admin-text-muted)", fontWeight: 600 }}>
                      {rowNo}
                    </td>
                    <td style={{ fontWeight: 600, color: "var(--color-admin-text)" }}>
                      {nama}
                    </td>
                    <td style={{ fontFamily: "monospace", color: "var(--color-admin-primary)", fontSize: "0.75rem" }}>
                      {no_kp}
                    </td>
                    <td style={{ fontWeight: 600, color: "var(--color-admin-text)" }}>
                      {umur}
                    </td>
                    <td>
                      <span
                        className={`category-badge ${
                          kategori === "AHLI"
                            ? "category-badge--member"
                            : kategori === "PASANGAN"
                              ? "category-badge--spouse"
                              : kategori === "ANAK"
                                ? "category-badge--child"
                                : "category-badge--other"
                        }`}
                        style={{
                          textTransform: "uppercase",
                        }}
                      >
                        {kategori}
                      </span>
                    </td>
                    <td style={{ color: no_ahli === "BUKAN ANGGOTA" ? "var(--color-admin-danger)" : "var(--color-admin-text)" }}>
                      {no_ahli}
                    </td>
                    <td>{no_telefon}</td>
                    <td style={{ fontWeight: 500, color: "var(--color-admin-text)", whiteSpace: "nowrap" }}>
                      {nama_waris}
                    </td>
                    <td style={{ fontFamily: "monospace", color: "var(--color-admin-text-muted)", fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                      {telefon_waris}
                    </td>
                    <td style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--color-admin-text-muted)" }}>
                      {alamatStr}
                    </td>
                    <td style={{ fontFamily: "monospace", color: "var(--color-admin-text-muted)", fontSize: "0.75rem" }}>
                      {poskodStr}
                    </td>
                    <td style={{ fontWeight: 500, color: "var(--color-admin-text)" }}>
                      {negeriStr}
                    </td>
                    <td style={{ fontWeight: 500, color: "var(--color-admin-accent)" }}>
                      {pakej}
                    </td>
                    <td style={{ whiteSpace: "nowrap", color: "var(--color-admin-text-muted)", fontSize: "0.75rem" }}>
                      {tarikh_daftar}
                    </td>
                    <td style={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {utama}
                    </td>
                    {/* Tempoh Keahlian */}
                    <td style={{ textAlign: "center", color: "var(--color-admin-text-muted)", whiteSpace: "nowrap" }}>
                      {(() => {
                        const tk = s.tempoh_keahlian;
                        if (!tk) return "N/A";
                        const parts = tk.split(" - ").map((p: string) => p.trim());
                        if (parts.length === 1 || !parts[1]) return `${parts[0]} - Hingga Tamat Perkhidmatan`;
                        return tk;
                      })()}
                    </td>
                    {/* Tempoh Manfaat */}
                    <td style={{ textAlign: "center", color: "var(--color-admin-text-muted)", whiteSpace: "nowrap" }}>
                      {s.tempoh_manfaat || "N/A"}
                    </td>
                    <td>
                      {/* Map new status values to badge classes */}
                      {(() => {
                        const statusMap: Record<string, string> = {
                          baru: "badge-new",
                          terima: "badge-new",
                          tangguh: "badge-reviewed",
                          proses: "badge-reviewed",
                          aktif: "badge-completed",
                          tamat: "badge-archived",
                          "tak layak": "badge-archived",
                          "lebih umur": "badge-archived",
                          meninggal: "badge-archived",
                        };
                        const badgeClass = statusMap[s.status] || "badge-new";
                        return (
                          <span className={clsx("badge", badgeClass)} style={{ textTransform: "capitalize" }}>
                            {s.status}
                          </span>
                        );
                      })()}
                    </td>
                    {canEdit && (
                      <td style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", gap: "0.375rem", justifyContent: "center" }}>
                          <button
                            id={`edit-${s.id}`}
                            onClick={() => setEditingItem(s)}
                            className="btn-ghost"
                            style={{ width: 44, minWidth: 44, height: 44, minHeight: 44, padding: 0, justifyContent: "center" }}
                            aria-label={`Edit ${nama}`}
                          >
                            <Pencil size={16} aria-hidden="true" />
                          </button>
                          <button
                            id={`delete-${s.id}`}
                            onClick={() => setDeletingItem(s)}
                            className="btn-danger"
                            style={{ width: 44, minWidth: 44, height: 44, minHeight: 44, padding: 0, justifyContent: "center" }}
                            aria-label={`Delete ${nama}`}
                          >
                            <Trash2 size={16} aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 0.25rem" }}>
          <span style={{ fontSize: "0.8125rem", color: "var(--color-admin-text-muted)" }}>
            Showing {filtered.length} total entry records · page {page} of {totalPages}
          </span>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              id="pagination-prev"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn-ghost"
              style={{ padding: "0.5rem", minHeight: 44, minWidth: 44 }}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              id="pagination-next"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="btn-ghost"
              style={{ padding: "0.5rem", minHeight: 44, minWidth: 44 }}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      <FilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        current={filters}
        onApply={handleApplyFilter}
        negeriOptions={negeriOptions}
        pakejOptions={pakejOptions}
        statusOptions={statusOptions}
      />

      {/* Modals */}
      <AnimatePresence>
        {editingItem && (
          <EditModal
            submission={editingItem}
            moduleSlug={moduleSlug}
            onClose={() => setEditingItem(null)}
            onSaved={() => { setEditingItem(null); onRefresh(); }}
          />
        )}
        {deletingItem && (
          <DeleteDialog
            submission={deletingItem}
            onClose={() => setDeletingItem(null)}
            onDeleted={() => { setDeletingItem(null); onRefresh(); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
