"use client";
// File: src/components/module-card.tsx
// Module navigation card for the home dashboard
import Link from "next/link";
import type { AdminModule } from "@/lib/types";
import { ICON_MAP } from "@/lib/icons";
import { Shield, ChevronRight } from "lucide-react";

interface ModuleCardProps {
  module: AdminModule;
  submissionCount?: number;
}

export function ModuleCard({ module, submissionCount }: ModuleCardProps) {
  const Icon = ICON_MAP[module.icon ?? ""] ?? Shield;
  const count = submissionCount ?? module.submission_count;

  return (
    <Link
      href={`/${module.slug}`}
      id={`module-card-${module.slug}`}
      className="module-card"
    >
      <div className="module-card-icon" aria-hidden="true">
        <Icon size={20} />
      </div>
      <div style={{ flex: 1 }}>
        <h2 style={{ margin: "0 0 0.375rem", fontSize: "1.125rem", fontWeight: 700, color: "var(--color-admin-text)", lineHeight: 1.3 }}>
          {module.display_name}
        </h2>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-admin-text-muted)", lineHeight: 1.5 }}>
          {module.description || `Review and manage submissions for ${module.display_name}.`}
        </p>
      </div>
      <div className="module-card-footer">
        <div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-admin-primary-strong)", lineHeight: 1.2 }}>
            {count ?? "Unavailable"}
          </div>
          <div style={{ fontSize: "0.8125rem", color: "var(--color-admin-text-muted)" }}>
            submissions
          </div>
        </div>
        <ChevronRight size={18} aria-hidden="true" />
      </div>
    </Link>
  );
}
