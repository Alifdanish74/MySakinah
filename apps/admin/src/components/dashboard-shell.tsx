"use client";
// File: src/components/dashboard-shell.tsx
// Shell wrapper component managing sidebar collapse state and mobile navigation drawer

import { useState, useEffect, useRef } from "react";
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
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const wasMobileOpenRef = useRef(false);

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

  useEffect(() => {
    if (!isMobileOpen) {
      if (wasMobileOpenRef.current) {
        wasMobileOpenRef.current = false;
        mobileMenuButtonRef.current?.focus();
      }
      return;
    }

    wasMobileOpenRef.current = true;
    document.getElementById("admin-sidebar")?.querySelector<HTMLElement>("a[href]")?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMobile();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen]);

  return (
    <>
      <a className="skip-link" href="#admin-main-content">Skip to main content</a>
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--color-admin-bg)" }}>
      <Sidebar
        modules={modules}
        userRole={userRole}
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onToggleCollapse={toggleCollapse}
        onCloseMobile={closeMobile}
      />

      <div
        inert={isMobileOpen}
        style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}
      >
        <Header
          userRole={userRole}
          title={title}
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
          mobileMenuButtonRef={mobileMenuButtonRef}
          onToggleCollapse={toggleCollapse}
          onToggleMobileMenu={toggleMobileOpen}
        />

        <main
          id="admin-main-content"
          className="admin-main-content"
          tabIndex={-1}
          style={{ flex: 1, overflowY: "auto" }}
        >
          {children}
        </main>
        <footer className="admin-footer">MySakinahPro Admin</footer>
      </div>
      </div>
    </>
  );
}
