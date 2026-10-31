"use client";
// File: src/components/sidebar.tsx
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { AdminModule, UserRoleInfo } from "@/lib/types";
import {
  LayoutDashboard,
  LogOut,
  Shield,
  ChevronRight,
  X,
} from "lucide-react";
import { ICON_MAP } from "@/lib/icons";

interface SidebarProps {
  modules: AdminModule[];
  userEmail?: string;
  isSuperAdmin?: boolean;
  userRole?: UserRoleInfo | null;
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
  onToggleCollapse?: () => void;
  onCloseMobile?: () => void;
}

export function Sidebar({
  modules,
  userEmail,
  isSuperAdmin,
  userRole,
  isCollapsed = false,
  isMobileOpen = false,
  onToggleCollapse,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const router   = useRouter();
  const supabase = createClient();

  const displayEmail = userRole?.email || userEmail || "Admin User";
  const displayRole  = userRole?.role === "super" || isSuperAdmin ? "Super Admin" : "Admin";

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const sidebarWidth = isCollapsed ? 76 : 260;

  return (
    <>
      {/* Mobile Dark Backdrop */}
      {isMobileOpen && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(8, 24, 16, 0.48)",
            zIndex: 45,
          }}
          className="md:hidden"
        />
      )}

      <aside
        id="admin-sidebar"
        aria-label="Primary navigation"
        className={`sidebar-container ${isMobileOpen ? "mobile-open" : ""}`}
        style={{
          background: "var(--color-admin-surface)",
          borderRight: "1px solid var(--color-admin-border)",
          display: "flex",
          flexDirection: "column",
          padding: isCollapsed ? "1.25rem 0.5rem" : "1.5rem 1rem",
          gap: "0.5rem",
          height: "100dvh",
          position: "sticky",
          top: 0,
          overflowY: "auto",
          width: sidebarWidth,
          flexShrink: 0,
          zIndex: 50,
        }}
      >
        {/* Header & Brand */}
        <div
          style={{
            padding: isCollapsed ? "0 0 1rem" : "0 0.5rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "space-between",
          }}
        >
          <Link
            href="/"
            onClick={onCloseMobile}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "var(--radius-md)",
                background: "var(--color-admin-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Shield size={18} color="#fff" aria-hidden="true" />
            </div>
            {!isCollapsed && (
              <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-admin-text)" }}>
                  MySakinah
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-admin-text-muted)" }}>
                  Admin Panel
                </div>
              </div>
            )}
          </Link>
          <button
            type="button"
            className="show-mobile-only btn-ghost"
            onClick={onCloseMobile}
            style={{ width: 44, minWidth: 44, height: 44, justifyContent: "center", padding: 0 }}
            aria-label="Close navigation menu"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Dashboard sections" style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <Link
            href="/"
            id="sidebar-dashboard"
            onClick={onCloseMobile}
            className={`sidebar-link ${pathname === "/" ? "active" : ""}`}
            title={isCollapsed ? "Dashboard" : undefined}
            aria-current={pathname === "/" ? "page" : undefined}
            style={{
              justifyContent: isCollapsed ? "center" : "flex-start",
              padding: isCollapsed ? "0.625rem" : "0.625rem 0.875rem",
            }}
          >
            <LayoutDashboard size={18} aria-hidden="true" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>

          {!isCollapsed ? (
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--color-admin-text-muted)",
                padding: "1rem 0.5rem 0.25rem",
              }}
            >
              Modules
            </div>
          ) : (
            <div aria-hidden="true" style={{ height: 1, backgroundColor: "var(--color-admin-border)", margin: "0.5rem 0" }} />
          )}

          {modules.map((mod) => {
            const Icon = ICON_MAP[mod.icon ?? ""] ?? Shield;
            const isActive = pathname === `/${mod.slug}`;

            return (
              <Link
                key={mod.id}
                href={`/${mod.slug}`}
                id={`sidebar-${mod.slug}`}
                onClick={onCloseMobile}
                className={`sidebar-link ${isActive ? "active" : ""}`}
                title={isCollapsed ? mod.display_name : undefined}
                aria-current={isActive ? "page" : undefined}
                style={{
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  padding: isCollapsed ? "0.625rem" : "0.625rem 0.875rem",
                }}
              >
                <span className="sidebar-module-icon">
                  <Icon size={15} aria-hidden="true" />
                </span>
                {!isCollapsed && (
                  <>
                    <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {mod.display_name}
                    </span>
                    {isActive && <ChevronRight size={14} aria-hidden="true" />}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Spacer & User Footer */}
        <div style={{ flex: 1 }} />
        <div
          style={{
            borderTop: "1px solid var(--color-admin-border)",
            paddingTop: "0.875rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {!isCollapsed ? (
            <div style={{ padding: "0 0.5rem" }}>
              <div style={{ fontSize: "0.8125rem", color: "var(--color-admin-text)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {displayEmail}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--color-admin-text-muted)" }}>
                {displayRole}
              </div>
            </div>
          ) : null}
          <button
            id="sidebar-logout"
            onClick={handleLogout}
            className="btn-ghost"
            title={isCollapsed ? "Sign out" : undefined}
            style={{
              justifyContent: isCollapsed ? "center" : "flex-start",
              padding: isCollapsed ? "0.625rem" : "0.5rem 0.75rem",
            }}
          >
            <LogOut size={16} />
            {!isCollapsed && <span>Sign out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
