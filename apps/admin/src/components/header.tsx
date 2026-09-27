"use client";
// File: src/components/header.tsx
// Top header navigation bar with user metadata and actions

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut, User, ShieldCheck, Menu, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import type { UserRoleInfo } from "@/lib/types";

interface HeaderProps {
  userRole?: UserRoleInfo | null;
  title?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onToggleMobileMenu?: () => void;
}

export function Header({
  userRole,
  title = "Dashboard",
  isCollapsed = false,
  onToggleCollapse,
  onToggleMobileMenu,
}: HeaderProps) {
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
        padding: "0 1.5rem",
        borderBottom: "1px solid var(--color-admin-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(10, 15, 29, 0.75)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 40,
        gap: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden btn-ghost"
          style={{ padding: "0.5rem", minHeight: "auto", color: "var(--color-admin-text)" }}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        {/* Desktop Collapse Sidebar Toggle */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex btn-ghost"
            style={{ padding: "0.5rem", minHeight: "auto", color: "var(--color-admin-text-muted)" }}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        )}

        <h1
          className="admin-header-title"
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "var(--color-admin-text)",
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {userRole && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div className="hidden sm:flex" style={{ flexDirection: "column", alignItems: "flex-end" }}>
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
                width: 34,
                height: 34,
                borderRadius: "50%",
                backgroundColor: "var(--color-admin-surface-light)",
                border: "1px solid var(--color-admin-border-bright)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-admin-primary)",
                flexShrink: 0,
              }}
            >
              <User size={16} />
            </div>
          </div>
        )}

        <button
          id="header-signout-btn"
          onClick={handleSignOut}
          className="btn-ghost"
          style={{ padding: "0.4rem 0.75rem", fontSize: "0.8125rem", gap: "0.375rem" }}
          aria-label="Sign out"
        >
          <LogOut size={15} />
          <span className="hidden md:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
