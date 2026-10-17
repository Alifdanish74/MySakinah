"use client";
// File: src/components/filter-modal.tsx
// Advanced filter modal for Admin Dashboard submission table

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal, RotateCcw, Check } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface FilterState {
  /** Full-text search across nama, no_kp, etc. */
  search: string;
  /** Exact match on status */
  status: string;
  /** Substring match on pakej */
  pakej: string;
  /** Substring match on negeri */
  negeri: string;
  /** Substring match on nama */
  nama: string;
  /** Substring match on no_kp */
  no_kp: string;
  /** Age range */
  umurMin: string;
  umurMax: string;
  /** Tarikh daftar range (YYYY-MM-DD values from date inputs) */
  tarikhFrom: string;
  tarikhTo: string;
  /** Tempoh keahlian start range */
  tkFrom: string;
  tkTo: string;
  /** Tempoh manfaat start range */
  tmFrom: string;
  tmTo: string;
}

export const EMPTY_FILTER: FilterState = {
  search: "",
  status: "",
  pakej: "",
  negeri: "",
  nama: "",
  no_kp: "",
  umurMin: "",
  umurMax: "",
  tarikhFrom: "",
  tarikhTo: "",
  tkFrom: "",
  tkTo: "",
  tmFrom: "",
  tmTo: "",
};

/** Count how many filters are active (excluding the text search) */
export function countActiveFilters(f: FilterState): number {
  return [
    f.status, f.pakej, f.negeri, f.nama, f.no_kp,
    f.umurMin, f.umurMax,
    f.tarikhFrom, f.tarikhTo,
    f.tkFrom, f.tkTo,
    f.tmFrom, f.tmTo,
  ].filter(Boolean).length;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  current: FilterState;
  onApply: (f: FilterState) => void;
  /** Pass module-specific option lists */
  negeriOptions: string[];
  pakejOptions: string[];
}

// ─── Small helpers ────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600,
      color: "var(--color-admin-text-muted)", marginBottom: 4 }}>
      {children}
    </label>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><Label>{label}</Label>{children}</div>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", margin: "0.5rem 0 0" }}>
      <span style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em",
        textTransform: "uppercase", color: "var(--color-admin-primary)", whiteSpace: "nowrap" }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: "var(--color-admin-border)" }} />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function FilterModal({
  isOpen, onClose, current, onApply, negeriOptions, pakejOptions,
}: FilterModalProps) {
  const [draft, setDraft] = useState<FilterState>(current);
  const currentRef = useRef(current);
  currentRef.current = current;

  useEffect(() => {
    if (!isOpen) return;
    setDraft({ ...currentRef.current });
  }, [isOpen]);

  function set<K extends keyof FilterState>(key: K, val: FilterState[K]) {
    setDraft((prev) => ({ ...prev, [key]: val }));
  }

  function handleApply() {
    onApply(draft);
    onClose();
  }

  function handleReset() {
    const cleared = { ...EMPTY_FILTER, search: current.search }; // keep text search
    setDraft(cleared);
    onApply(cleared);
    onClose();
  }

  const activeCount = countActiveFilters(draft);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 60,
            display: "flex", alignItems: "flex-start", justifyContent: "flex-end",
            padding: "5rem 1.5rem 1rem",
            backgroundColor: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="glass-card"
            style={{
              width: "100%", maxWidth: 460, maxHeight: "calc(100vh - 6rem)",
              overflowY: "auto", padding: "1.5rem",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-admin-border-bright)",
              display: "flex", flexDirection: "column", gap: "1.25rem",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <SlidersHorizontal size={16} style={{ color: "var(--color-admin-primary)" }} />
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
                  Filter Rekod
                </h3>
                {activeCount > 0 && (
                  <span style={{
                    fontSize: "0.6875rem", fontWeight: 700,
                    background: "var(--color-admin-primary)",
                    color: "#fff", borderRadius: "999px",
                    padding: "0.1rem 0.5rem",
                  }}>{activeCount}</span>
                )}
              </div>
              <button id="close-filter-modal" onClick={onClose} className="btn-ghost"
                style={{ padding: "0.375rem" }} aria-label="Close filter">
                <X size={16} />
              </button>
            </div>

            {/* ── Text search ─────────────────────────────────────────────── */}
            <SectionTitle>Carian Teks</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <Field label="Nama">
                <input id="filter-nama" type="text" value={draft.nama}
                  onChange={(e) => set("nama", e.target.value)}
                  placeholder="cth: Ahmad" className="form-input" />
              </Field>
              <Field label="No KP">
                <input id="filter-no_kp" type="text" value={draft.no_kp}
                  onChange={(e) => set("no_kp", e.target.value.replace(/\D/g, ""))}
                  placeholder="cth: 870654" className="form-input" inputMode="numeric" />
              </Field>
            </div>

            {/* ── Status & Kategori ────────────────────────────────────────── */}
            <SectionTitle>Status & Pakej</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <Field label="Status">
                <select id="filter-status" value={draft.status}
                  onChange={(e) => set("status", e.target.value)} className="form-input">
                  <option value="">— Semua —</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
              </Field>
              <Field label="Pakej">
                {pakejOptions.length > 0 ? (
                  <select id="filter-pakej" value={draft.pakej}
                    onChange={(e) => set("pakej", e.target.value)} className="form-input">
                    <option value="">— Semua —</option>
                    {pakejOptions.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                ) : (
                  <input id="filter-pakej" type="text" value={draft.pakej}
                    onChange={(e) => set("pakej", e.target.value)}
                    placeholder="cth: KELUARGA 20" className="form-input" />
                )}
              </Field>
            </div>

            {/* ── Lokasi ──────────────────────────────────────────────────── */}
            <SectionTitle>Lokasi</SectionTitle>
            <Field label="Negeri">
              {negeriOptions.length > 0 ? (
                <select id="filter-negeri" value={draft.negeri}
                  onChange={(e) => set("negeri", e.target.value)} className="form-input">
                  <option value="">— Semua Negeri —</option>
                  {negeriOptions.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              ) : (
                <input id="filter-negeri" type="text" value={draft.negeri}
                  onChange={(e) => set("negeri", e.target.value)}
                  placeholder="cth: KELANTAN" className="form-input" />
              )}
            </Field>

            {/* ── Umur ────────────────────────────────────────────────────── */}
            <SectionTitle>Umur</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0.5rem", alignItems: "center" }}>
              <input id="filter-umur-min" type="number" min={0} max={120}
                value={draft.umurMin}
                onChange={(e) => set("umurMin", e.target.value)}
                placeholder="Min" className="form-input" />
              <span style={{ color: "var(--color-admin-text-muted)", fontSize: "0.75rem" }}>hingga</span>
              <input id="filter-umur-max" type="number" min={0} max={120}
                value={draft.umurMax}
                onChange={(e) => set("umurMax", e.target.value)}
                placeholder="Max" className="form-input" />
            </div>

            {/* ── Tarikh Daftar ───────────────────────────────────────────── */}
            <SectionTitle>Tarikh Daftar</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0.5rem", alignItems: "center" }}>
              <div>
                <Label>Dari</Label>
                <input id="filter-tarikh-from" type="date" value={draft.tarikhFrom}
                  onChange={(e) => set("tarikhFrom", e.target.value)} className="form-input" />
              </div>
              <span style={{ color: "var(--color-admin-text-muted)", fontSize: "0.75rem", marginTop: 20 }}>—</span>
              <div>
                <Label>Hingga</Label>
                <input id="filter-tarikh-to" type="date" value={draft.tarikhTo}
                  min={draft.tarikhFrom || undefined}
                  onChange={(e) => set("tarikhTo", e.target.value)} className="form-input" />
              </div>
            </div>

            {/* ── Tempoh Keahlian ─────────────────────────────────────────── */}
            <SectionTitle>Tempoh Keahlian </SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0.5rem", alignItems: "center" }}>
              <div>
                <Label>Dari</Label>
                <input id="filter-tk-from" type="date" value={draft.tkFrom}
                  onChange={(e) => set("tkFrom", e.target.value)} className="form-input" />
              </div>
              <span style={{ color: "var(--color-admin-text-muted)", fontSize: "0.75rem", marginTop: 20 }}>—</span>
              <div>
                <Label>Hingga</Label>
                <input id="filter-tk-to" type="date" value={draft.tkTo}
                  min={draft.tkFrom || undefined}
                  onChange={(e) => set("tkTo", e.target.value)} className="form-input" />
              </div>
            </div>

            {/* ── Tempoh Manfaat ───────────────────────────────────────────── */}
            <SectionTitle>Tempoh Manfaat </SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0.5rem", alignItems: "center" }}>
              <div>
                <Label>Dari</Label>
                <input id="filter-tm-from" type="date" value={draft.tmFrom}
                  onChange={(e) => set("tmFrom", e.target.value)} className="form-input" />
              </div>
              <span style={{ color: "var(--color-admin-text-muted)", fontSize: "0.75rem", marginTop: 20 }}>—</span>
              <div>
                <Label>Hingga</Label>
                <input id="filter-tm-to" type="date" value={draft.tmTo}
                  min={draft.tmFrom || undefined}
                  onChange={(e) => set("tmTo", e.target.value)} className="form-input" />
              </div>
            </div>

            {/* ── Actions ─────────────────────────────────────────────────── */}
            <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
              <button id="filter-reset-btn" type="button" onClick={handleReset}
                className="btn-ghost"
                style={{ display: "flex", alignItems: "center", gap: "0.375rem", flex: 1, justifyContent: "center" }}>
                <RotateCcw size={13} />
                Reset Filter
              </button>
              <button id="filter-apply-btn" type="button" onClick={handleApply}
                className="btn-primary"
                style={{ display: "flex", alignItems: "center", gap: "0.375rem", flex: 2, justifyContent: "center" }}>
                <Check size={14} />
                Filter
                {activeCount > 0 && <span style={{ opacity: 0.75, fontSize: "0.75rem" }}>({activeCount})</span>}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
