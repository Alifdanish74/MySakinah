"use client";
// File: src/components/header.tsx
// Top header navigation bar with user metadata and actions

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut, User, ShieldCheck } from "lucide-react";
import type { UserRoleInfo } from "@/lib/types";

interface HeaderProps {
  userRole?: UserRoleInfo | null;
  title?: string;
}

export function Header({ userRole, title = "Dashboard" }: HeaderProps) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header
      style={{
        height: 64,
        padding: "0 2rem",
        borderBottom: "1px solid var(--color-admin-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(10, 15, 29, 0.6)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-admin-text)", letterSpacing: "-0.01em" }}>
          {title}
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        {userRole && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-admin-text)" }}>
                {userRole.email}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginTop: 2 }}>
                <ShieldCheck size={12} style={{ color: userRole.role === "super" ? "var(--color-admin-accent)" : "var(--color-admin-primary)" }} />
                <span style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-admin-text-muted)" }}>
                  {userRole.role === "super" ? "Super Admin" : `${userRole.role} Access`}
                </span>
              </div>
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: "var(--color-admin-surface-light)",
                border: "1px solid var(--color-admin-border-bright)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-admin-primary)",
              }}
            >
              <User size={18} />
            </div>
          </div>
        )}

        <button
          id="header-signout-btn"
          onClick={handleSignOut}
          className="btn-ghost"
          style={{ padding: "0.5rem 0.875rem", fontSize: "0.8125rem", gap: "0.375rem" }}
          aria-label="Sign out"
        >
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
