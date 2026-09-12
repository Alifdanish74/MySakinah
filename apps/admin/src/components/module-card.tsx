"use client";
// File: src/components/module-card.tsx
// Animated gradient card for the home dashboard
import Link from "next/link";
import { motion } from "framer-motion";
import type { AdminModule } from "@/lib/types";
import { ICON_MAP } from "@/lib/icons";
import { Shield, ArrowRight } from "lucide-react";

interface ModuleCardProps {
  module: AdminModule & {
    submission_count?: number;
    color_from?: string;
    color_to?: string;
  };
  submissionCount?: number;
  index?: number;
}

export function ModuleCard({ module, submissionCount, index = 0 }: ModuleCardProps) {
  const Icon = ICON_MAP[module.icon ?? ""] ?? Shield;
  const count = submissionCount ?? module.submission_count ?? 0;

  const colorFrom = module.color_from || module.color || "#3b82f6";
  const colorTo   = module.color_to || module.color || "#8b5cf6";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      style={{ height: "100%" }}
    >
      <Link
        href={`/${module.slug}`}
        id={`module-card-${module.slug}`}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          textDecoration: "none",
          position: "relative",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          transition: "border-color 0.25s, box-shadow 0.25s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `${colorFrom}55`;
          (e.currentTarget as HTMLElement).style.boxShadow =
            `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${colorFrom}33`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Gradient top bar */}
        <div
          aria-hidden="true"
          style={{
            height: 4,
            background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
          }}
        />

        {/* Subtle gradient glow background */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${colorFrom}15 0%, transparent 100%)`,
            pointerEvents: "none",
          }}
        />

        <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: "1rem", position: "relative" }}>
          {/* Icon */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "var(--radius-lg)",
              background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 20px ${colorFrom}40`,
            }}
          >
            <Icon size={26} color="#fff" />
          </div>

          {/* Text */}
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "var(--color-admin-text)",
                marginBottom: "0.375rem",
                lineHeight: 1.3,
              }}
            >
              {module.display_name}
            </h2>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--color-admin-text-muted)",
                lineHeight: 1.5,
              }}
            >
              {module.description || `Manage and view ${module.display_name} entries`}
            </p>
          </div>

          {/* Footer stats */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "0.75rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: colorFrom,
                  lineHeight: 1,
                }}
              >
                {count}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--color-admin-text-muted)" }}>
                submissions
              </div>
            </div>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: `${colorFrom}22`,
                border: `1px solid ${colorFrom}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colorFrom,
              }}
            >
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
