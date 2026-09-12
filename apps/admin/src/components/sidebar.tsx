"use client";
// File: src/components/sidebar.tsx
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { AdminModule, UserRoleInfo } from "@/lib/types";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  LogOut,
  Shield,
  ChevronRight,
} from "lucide-react";
import { ICON_MAP } from "@/lib/icons";

interface SidebarProps {
  modules: AdminModule[];
  userEmail?: string;
  isSuperAdmin?: boolean;
  userRole?: UserRoleInfo | null;
}

export function Sidebar({ modules, userEmail, isSuperAdmin, userRole }: SidebarProps) {
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

  return (
    <aside
      style={{
        background: "var(--color-admin-surface)",
        borderRight: "1px solid var(--color-admin-border)",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem 1rem",
        gap: "0.5rem",
        height: "100dvh",
        position: "sticky",
        top: 0,
        overflowY: "auto",
        width: 260,
        flexShrink: 0,
      }}
    >
      {/* Brand */}
      <div style={{ padding: "0 0.5rem 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Shield size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-admin-text)" }}>
              MySakinah
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--color-admin-text-muted)" }}>
              Admin Panel
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard link */}
      <Link
        href="/"
        id="sidebar-dashboard"
        className={`sidebar-link ${pathname === "/" ? "active" : ""}`}
      >
        <LayoutDashboard size={18} />
        Dashboard
      </Link>

      {/* Modules section */}
      <div
        style={{
          fontSize: "0.6875rem",
          fontWeight: 600,
          color: "var(--color-admin-text-muted)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "1rem 0.5rem 0.25rem",
        }}
      >
        Modules
      </div>

      {modules.map((mod, i) => {
        const Icon = ICON_MAP[mod.icon ?? ""] ?? Shield;
        const isActive = pathname === `/${mod.slug}`;
        const colorFrom = mod.color_from || mod.color || "#3b82f6";
        const colorTo   = mod.color_to || mod.color || "#8b5cf6";

        return (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <Link
              href={`/${mod.slug}`}
              id={`sidebar-${mod.slug}`}
              className={`sidebar-link ${isActive ? "active" : ""}`}
              style={isActive ? {
                background: `linear-gradient(135deg, ${colorFrom}22, ${colorTo}22)`,
                borderColor: `${colorFrom}44`,
                color: colorFrom,
              } : {}}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "0.375rem",
                  background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={13} color="#fff" />
              </div>
              <span style={{ flex: 1 }}>{mod.display_name}</span>
              {isActive && <ChevronRight size={14} />}
            </Link>
          </motion.div>
        );
      })}

      {/* Spacer + user footer */}
      <div style={{ flex: 1 }} />
      <div
        style={{
          borderTop: "1px solid var(--color-admin-border)",
          paddingTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <div style={{ padding: "0 0.5rem" }}>
          <div style={{ fontSize: "0.8125rem", color: "var(--color-admin-text)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {displayEmail}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--color-admin-text-muted)" }}>
            {displayRole}
          </div>
        </div>
        <button
          id="sidebar-logout"
          onClick={handleLogout}
          className="btn-ghost"
          style={{ justifyContent: "flex-start" }}
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
