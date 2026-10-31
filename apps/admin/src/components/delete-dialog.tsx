"use client";
// File: src/components/delete-dialog.tsx
// Confirmation dialog for deleting a submission

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";
import type { Submission } from "@/lib/types";
import { useDialogAccessibility } from "@/lib/use-dialog-accessibility";

interface DeleteDialogProps {
  submission: Submission;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteDialog({ submission, onClose, onDeleted }: DeleteDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const dialogRef = useDialogAccessibility(true, onClose);

  async function handleDelete() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/admin/api/submissions/${submission.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const resJson = await response.json();
        throw new Error(resJson.error || "Failed to delete submission");
      }

      onDeleted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgba(8, 24, 16, 0.48)",
        backdropFilter: "blur(2px)",
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        tabIndex={-1}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.18 }}
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: 440,
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          borderRadius: "var(--radius-xl)",
          border: "1px solid color-mix(in srgb, var(--color-admin-danger) 35%, transparent)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
          <div
            style={{
              padding: "0.75rem",
              borderRadius: "50%",
              backgroundColor: "color-mix(in srgb, var(--color-admin-danger) 12%, var(--color-admin-surface))",
              color: "var(--color-admin-danger)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <AlertTriangle size={24} aria-hidden="true" />
          </div>
          <div>
            <h3 id="delete-dialog-title" style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-admin-text)" }}>
              Confirm Deletion
            </h3>
            <p id="delete-dialog-description" style={{ fontSize: "0.875rem", color: "var(--color-admin-text-muted)", marginTop: "0.375rem", lineHeight: 1.5 }}>
              Are you sure you want to delete submission <code style={{ color: "var(--color-admin-danger)" }}>{submission.id.slice(0, 8)}...</code> submitted by <strong>{submission.submitted_by || "Anonymous"}</strong>?
            </p>
            <p style={{ fontSize: "0.75rem", color: "var(--color-admin-danger)", marginTop: "0.5rem" }}>
              This action cannot be undone.
            </p>
          </div>
        </div>

        {error && (
          <div className="badge-danger" role="alert" style={{ padding: "0.75rem", borderRadius: "var(--radius-md)" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", paddingTop: "0.5rem" }}>
          <button
            id="cancel-delete-btn"
            type="button"
            onClick={onClose}
            className="btn-ghost"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            id="confirm-delete-btn"
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="btn-danger"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.625rem 1.25rem", minHeight: 44 }}
          >
            {loading && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
            <span>Delete Submission</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
