"use client";
// File: src/components/header.tsx
// Top header navigation bar with user metadata and actions

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut, User, ShieldCheck, Menu, PanelLeftOpen, PanelLeftClose, Moon, Sun } from "lucide-react";
import type { UserRoleInfo } from "@/lib/types";
import { useAdminTheme } from "./theme-provider";

interface HeaderProps {
  userRole?: UserRoleInfo | null;
  title?: string;
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
  mobileMenuButtonRef?: React.RefObject<HTMLButtonElement | null>;
  onToggleCollapse?: () => void;
  onToggleMobileMenu?: () => void;
}

export function Header({
  userRole,
  title = "Dashboard",
  isCollapsed = false,
  isMobileOpen = false,
  mobileMenuButtonRef,
  onToggleCollapse,
  onToggleMobileMenu,
}: HeaderProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useAdminTheme();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header
      className="admin-header"
      style={{
        height: 64,
        padding: "0 clamp(0.75rem, 2vw, 1.5rem)",
        borderBottom: "1px solid var(--color-admin-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 40,
        gap: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, minWidth: 0 }}>
        {/* Mobile Hamburger Menu Toggle */}
        <button
          ref={mobileMenuButtonRef}
          onClick={onToggleMobileMenu}
          className="show-mobile-only btn-ghost"
          style={{ width: 44, minWidth: 44, height: 44, justifyContent: "center", padding: 0, color: "var(--color-admin-text)" }}
          aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileOpen}
          aria-controls="admin-sidebar"
        >
          <Menu size={20} aria-hidden="true" />
        </button>

        {/* Desktop Collapse Sidebar Toggle */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="show-desktop-only btn-ghost"
            style={{ width: 44, minWidth: 44, height: 44, justifyContent: "center", padding: 0, color: "var(--color-admin-text-muted)" }}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen size={18} aria-hidden="true" /> : <PanelLeftClose size={18} aria-hidden="true" />}
          </button>
        )}

        <h1
          className="admin-header-title"
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            flex: 1,
            minWidth: 0,
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

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
        {userRole && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div className="hidden sm:flex" style={{ flexDirection: "column", alignItems: "flex-end" }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-admin-text)" }}>
                {userRole.email}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginTop: 2 }}>
                <ShieldCheck size={12} aria-hidden="true" style={{ color: userRole.role === "super" ? "var(--color-admin-accent)" : "var(--color-admin-primary)" }} />
                <span style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-admin-text-muted)" }}>
                  {userRole.role === "super" ? "Super Admin" : `${userRole.role} Access`}
                </span>
              </div>
            </div>
            <div
              className="header-user-avatar"
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                backgroundColor: "var(--color-admin-surface-2)",
                border: "1px solid var(--color-admin-border-bright)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-admin-primary)",
                flexShrink: 0,
              }}
            >
              <User size={16} aria-hidden="true" />
            </div>
          </div>
        )}

        <button
          type="button"
          className="btn-ghost"
          onClick={toggleTheme}
          style={{ width: 44, minWidth: 44, height: 44, justifyContent: "center", padding: 0 }}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          {theme === "light" ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
        </button>

        <button
          id="header-signout-btn"
          onClick={handleSignOut}
          className="btn-ghost"
          style={{ padding: "0.4rem 0.75rem", fontSize: "0.8125rem", gap: "0.375rem" }}
          aria-label="Sign out"
        >
          <LogOut size={15} aria-hidden="true" />
          <span className="hidden md:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
