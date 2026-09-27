"use client";
// File: src/components/dashboard-shell.tsx
// Shell wrapper component managing sidebar collapse state and mobile navigation drawer

import { useState, useEffect } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import type { AdminModule, UserRoleInfo } from "@/lib/types";

interface DashboardShellProps {
  modules: AdminModule[];
  userRole?: UserRoleInfo | null;
  title: string;
  children: React.ReactNode;
}

export function DashboardShell({
  modules,
  userRole,
  title,
  children,
}: DashboardShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Restore collapsed state preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("mysakinah_admin_sidebar_collapsed");
    if (saved === "true") {
      setIsCollapsed(true);
    }
  }, []);

  function toggleCollapse() {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("mysakinah_admin_sidebar_collapsed", String(next));
      return next;
    });
  }

  function toggleMobileOpen() {
    setIsMobileOpen((prev) => !prev);
  }

  function closeMobile() {
    setIsMobileOpen(false);
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--color-admin-bg)" }}>
      <Sidebar
        modules={modules}
        userRole={userRole}
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onToggleCollapse={toggleCollapse}
        onCloseMobile={closeMobile}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header
          userRole={userRole}
          title={title}
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleCollapse}
          onToggleMobileMenu={toggleMobileOpen}
        />

        <main className="admin-main-content" style={{ padding: "2rem", flex: 1, overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
