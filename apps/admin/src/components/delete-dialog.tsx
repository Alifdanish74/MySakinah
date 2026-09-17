"use client";
// File: src/components/delete-dialog.tsx
// Confirmation dialog for deleting a submission

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";
import type { Submission } from "@/lib/types";

interface DeleteDialogProps {
  submission: Submission;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteDialog({ submission, onClose, onDeleted }: DeleteDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

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
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
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
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(4px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: 440,
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          borderRadius: "var(--radius-xl)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
          <div
            style={{
              padding: "0.75rem",
              borderRadius: "50%",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-admin-text)" }}>
              Confirm Deletion
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--color-admin-text-muted)", marginTop: "0.375rem", lineHeight: 1.5 }}>
              Are you sure you want to delete submission <code style={{ color: "#ef4444" }}>{submission.id.slice(0, 8)}...</code> submitted by <strong>{submission.submitted_by || "Anonymous"}</strong>?
            </p>
            <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.5rem" }}>
              This action cannot be undone.
            </p>
          </div>
        </div>

        {error && (
          <div className="badge-danger" style={{ padding: "0.75rem", borderRadius: "var(--radius-md)" }}>
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
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.625rem 1.25rem" }}
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            <span>Delete Submission</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
