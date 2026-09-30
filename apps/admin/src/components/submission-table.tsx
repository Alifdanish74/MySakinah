"use client";
// File: src/components/submission-table.tsx
// Data table for listing module submissions aligned with CONTOH EXCEL JEMPUTAN (1).xlsx

import { useState, useRef, useEffect } from "react";
import type { Submission } from "@/lib/types";
import { getUmurDisplay, getAlamatDisplay, getPoskodDisplay, getNegeriDisplay } from "@/lib/utils";
import { EditModal } from "./edit-modal";
import { DeleteDialog } from "./delete-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, ChevronLeft, ChevronRight, Search, Download, FileSpreadsheet } from "lucide-react";
import { clsx } from "clsx";

interface SubmissionTableProps {
  submissions: Submission[];
  canEdit: boolean;
  onRefresh: () => void;
  moduleName?: string;
}

const PAGE_SIZE = 20;

export function SubmissionTable({ submissions, canEdit, onRefresh, moduleName }: SubmissionTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editingItem, setEditingItem] = useState<Submission | null>(null);
  const [deletingItem, setDeletingItem] = useState<Submission | null>(null);

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

  // Filter logic across all Excel template fields
  const filtered = submissions.filter((s) => {
    const q = search.toLowerCase();
    const fd = s.form_data || {};
    const umurStr = getUmurDisplay(fd);
    const alamatStr = getAlamatDisplay(fd);
    const poskodStr = getPoskodDisplay(fd);
    const negeriStr = getNegeriDisplay(fd);

    return (
      (fd.nama ?? s.submitted_by ?? "").toLowerCase().includes(q) ||
      (fd.no_kp ?? "").toLowerCase().includes(q) ||
      umurStr.toLowerCase().includes(q) ||
      (fd.kategori ?? "").toLowerCase().includes(q) ||
      (fd.no_ahli ?? "").toLowerCase().includes(q) ||
      (fd.no_telefon ?? "").toLowerCase().includes(q) ||
      alamatStr.toLowerCase().includes(q) ||
      poskodStr.toLowerCase().includes(q) ||
      negeriStr.toLowerCase().includes(q) ||
      (fd.pakej ?? "").toLowerCase().includes(q) ||
      (fd.utama ?? "").toLowerCase().includes(q) ||
      s.status.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function formatDate(iso: string) {
    if (!iso) return "—";
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
      "ALAMAT 1",
      "ALAMAT 2",
      "POSKOD",
      "NEGERI",
    ];

    const rows = filtered.map((s, index) => {
      const fd = s.form_data || {};
      const no = fd.no || (index + 1).toString();
      const nama = fd.nama || s.submitted_by || "";
      const no_kp = fd.no_kp || "";
      const umur = getUmurDisplay(fd);
      const kategori = fd.kategori || "AHLI";
      const pakej = fd.pakej || "";
      const utama = fd.utama || nama;
      const tarikh_daftar = fd.tarikh_daftar || formatDate(s.created_at);
      const status = s.status;
      const no_ahli = fd.no_ahli || "";
      const bukan_anggota = fd.bukan_anggota || (no_ahli ? "" : "BUKAN ANGGOTA");
      const no_telefon = fd.no_telefon || "";
      const alamat1 = fd.alamat1 || fd.alamat || "";
      const alamat2 = fd.alamat2 || "";
      const poskod = getPoskodDisplay(fd) === "—" ? "" : getPoskodDisplay(fd);
      const negeri = getNegeriDisplay(fd) === "—" ? "" : getNegeriDisplay(fd);

      return [
        no,
        `"${nama.replace(/"/g, '""')}"`,
        `"${no_kp}"`,
        `"${umur === "—" ? "" : umur}"`,
        `"${kategori}"`,
        `"${pakej}"`,
        `"${utama.replace(/"/g, '""')}"`,
        `"${tarikh_daftar}"`,
        `"${status}"`,
        `"${no_ahli}"`,
        `"${bukan_anggota}"`,
        `"${no_telefon}"`,
        `"${alamat1.replace(/"/g, '""')}"`,
        `"${alamat2.replace(/"/g, '""')}"`,
        `"${poskod}"`,
        `"${negeri}"`,
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Top Search & Actions Bar */}
      <div className="search-action-bar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ position: "relative", width: "100%", maxWidth: 380 }}>
          <Search
            size={15}
            style={{
              position: "absolute",
              left: "0.875rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-admin-text-muted)",
              pointerEvents: "none",
            }}
          />
          <input
            id="submission-search"
            type="search"
            placeholder="Search by Nama, IC, Umur, Alamat, Poskod, Negeri..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="form-input"
            style={{ paddingLeft: "2.5rem" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            id="export-csv-btn"
            onClick={exportToCSV}
            className="btn-ghost"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              borderColor: "var(--color-admin-border-bright)",
              color: "var(--color-admin-text)",
            }}
          >
            <FileSpreadsheet size={16} style={{ color: "var(--color-admin-accent)" }} />
            <span>Export Excel / CSV</span>
            <Download size={14} style={{ opacity: 0.7 }} />
          </button>
        </div>
      </div>

      {/* Top Mirror Scrollbar */}
      <div
        ref={topScrollRef}
        onScroll={onTopScroll}
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
        style={{
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
          border: "1px solid var(--color-admin-border)",
        }}
      >
        <table className="admin-table" style={{ fontSize: "0.8125rem", width: "100%", borderCollapse: "collapse", minWidth: 1000 }}>
          <thead>
            <tr style={{ background: "rgba(15, 23, 42, 0.8)", borderBottom: "1px solid var(--color-admin-border)" }}>
              <th style={{ width: 40, textAlign: "center" }}>NO</th>
              <th>NAMA</th>
              <th>NO KP</th>
              <th>UMUR</th>
              <th>KATEGORI</th>
              <th>NO AHLI / ANGGOTA</th>
              <th>NO TELEFON</th>
              <th>ALAMAT</th>
              <th>POSKOD</th>
              <th>NEGERI</th>
              <th>PAKEJ</th>
              <th>TARIKH DAFTAR</th>
              <th>UTAMA</th>
              <th>STATUS</th>
              {canEdit && <th style={{ textAlign: "right" }}>ACTIONS</th>}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={15 + (canEdit ? 1 : 0)}
                    style={{ textAlign: "center", padding: "3rem", color: "var(--color-admin-text-muted)" }}
                  >
                    No matching records found.
                  </td>
                </tr>
              )}
              {paginated.map((s, i) => {
                const fd = s.form_data || {};
                const rowNo = fd.no || ((page - 1) * PAGE_SIZE + i + 1).toString();
                const nama = fd.nama || s.submitted_by || "—";
                const no_kp = fd.no_kp || "—";
                const umur = getUmurDisplay(fd);
                const kategori = fd.kategori || "AHLI";
                const no_ahli = fd.no_ahli || (fd.bukan_anggota ? "BUKAN ANGGOTA" : "—");
                const no_telefon = fd.no_telefon || fd.phone || "—";
                const alamatStr = getAlamatDisplay(fd);
                const poskodStr = getPoskodDisplay(fd);
                const negeriStr = getNegeriDisplay(fd);
                const pakej = fd.pakej || "—";
                const tarikh_daftar = fd.tarikh_daftar || formatDate(s.created_at);
                const utama = fd.utama || nama;

                return (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.02 }}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <td style={{ textAlign: "center", color: "var(--color-admin-text-muted)", fontWeight: 600 }}>
                      {rowNo}
                    </td>
                    <td style={{ fontWeight: 600, color: "#ffffff" }}>
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
                        style={{
                          display: "inline-block",
                          padding: "0.15rem 0.5rem",
                          borderRadius: "4px",
                          fontSize: "0.6875rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          backgroundColor:
                            kategori === "AHLI"
                              ? "rgba(59, 130, 246, 0.15)"
                              : kategori === "PASANGAN"
                                ? "rgba(236, 72, 153, 0.15)"
                                : kategori === "ANAK"
                                  ? "rgba(16, 185, 129, 0.15)"
                                  : "rgba(245, 158, 11, 0.15)",
                          color:
                            kategori === "AHLI"
                              ? "#60a5fa"
                              : kategori === "PASANGAN"
                                ? "#f472b6"
                                : kategori === "ANAK"
                                  ? "#34d399"
                                  : "#fbbf24",
                          border: "1px solid currentColor",
                        }}
                      >
                        {kategori}
                      </span>
                    </td>
                    <td style={{ color: no_ahli === "BUKAN ANGGOTA" ? "#ef4444" : "var(--color-admin-text)" }}>
                      {no_ahli}
                    </td>
                    <td>{no_telefon}</td>
                    <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--color-admin-text-muted)" }}>
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
                    <td style={{ fontWeight: 500, maxWidth: 130, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {utama}
                    </td>
                    <td>
                      <span className={clsx("badge", {
                        "badge-new": s.status === "pending",
                        "badge-reviewed": s.status === "reviewed" || s.status === "contacted",
                        "badge-completed": s.status === "completed",
                        "badge-archived": s.status === "archived",
                      })}>
                        {s.status}
                      </span>
                    </td>
                    {canEdit && (
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "flex", gap: "0.375rem", justifyContent: "flex-end" }}>
                          <button
                            id={`edit-${s.id}`}
                            onClick={() => setEditingItem(s)}
                            className="btn-ghost"
                            style={{ padding: "0.375rem 0.5rem", minHeight: 30 }}
                            aria-label="Edit record"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            id={`delete-${s.id}`}
                            onClick={() => setDeletingItem(s)}
                            className="btn-danger"
                            style={{ padding: "0.375rem 0.5rem", minHeight: 30 }}
                            aria-label="Delete record"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                );
              })}
            </AnimatePresence>
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
              style={{ padding: "0.5rem", minHeight: 36 }}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              id="pagination-next"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="btn-ghost"
              style={{ padding: "0.5rem", minHeight: 36 }}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {editingItem && (
          <EditModal
            submission={editingItem}
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
