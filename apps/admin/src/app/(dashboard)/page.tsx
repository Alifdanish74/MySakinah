// File: src/app/page.tsx
// Home Dashboard page listing all accessible module cards with counts and stats

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserRole, getAccessibleModules } from "@/lib/auth";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { ModuleCard } from "@/components/module-card";
import { LayoutGrid, Layers, FileText, Activity } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user role and allowed modules
  const roleInfo = await getUserRole(user.id);
  const modules  = await getAccessibleModules(user.id);

  // Fetch submission counts for each module
  const modulesWithCounts = await Promise.all(
    modules.map(async (mod) => {
      try {
        const { count } = await supabase
          .from("submissions")
          .select("*", { count: "exact", head: true })
          .eq("module_id", mod.id);

        return { ...mod, submission_count: count ?? 0 };
      } catch {
        return { ...mod, submission_count: 0 };
      }
    })
  );

  const totalSubmissions = modulesWithCounts.reduce(
    (acc, item) => acc + (item.submission_count || 0),
    0
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--color-admin-bg)" }}>
      <Sidebar modules={modules} userRole={roleInfo} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header userRole={roleInfo} title="Overview Dashboard" />

        <main style={{ padding: "2rem", flex: 1, overflowY: "auto" }}>
          {/* Welcome Banner */}
          <div
            className="surface"
            style={{
              padding: "2rem",
              borderRadius: "var(--radius-xl)",
              marginBottom: "2rem",
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)",
              border: "1px solid rgba(59, 130, 246, 0.25)",
            }}
          >
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0.75rem", borderRadius: "9999px", backgroundColor: "rgba(59, 130, 246, 0.2)", border: "1px solid rgba(59, 130, 246, 0.3)", marginBottom: "1rem" }}>
                <Activity size={14} style={{ color: "var(--color-admin-primary)" }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-admin-primary)", letterSpacing: "0.05em" }}>
                  SYSTEM OPERATIONAL
                </span>
              </div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.5rem" }}>
                Welcome to MySakinah Admin
              </h2>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-admin-text-muted)", maxWidth: 600, lineHeight: 1.6 }}>
                Select a module below to view, manage, and process real-time user enquiry submissions.
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
            <div className="surface" style={{ padding: "1.25rem", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ padding: "0.875rem", borderRadius: "var(--radius-md)", backgroundColor: "rgba(59, 130, 246, 0.12)", color: "var(--color-admin-primary)" }}>
                <Layers size={22} />
              </div>
              <div>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-admin-text-muted)", fontWeight: 500 }}>Active Modules</p>
                <h4 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-admin-text)", marginTop: 2 }}>{modules.length}</h4>
              </div>
            </div>

            <div className="surface" style={{ padding: "1.25rem", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ padding: "0.875rem", borderRadius: "var(--radius-md)", backgroundColor: "rgba(16, 185, 129, 0.12)", color: "var(--color-admin-accent)" }}>
                <FileText size={22} />
              </div>
              <div>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-admin-text-muted)", fontWeight: 500 }}>Total Submissions</p>
                <h4 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-admin-text)", marginTop: 2 }}>{totalSubmissions}</h4>
              </div>
            </div>

            <div className="surface" style={{ padding: "1.25rem", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ padding: "0.875rem", borderRadius: "var(--radius-md)", backgroundColor: "rgba(245, 158, 11, 0.12)", color: "#f59e0b" }}>
                <LayoutGrid size={22} />
              </div>
              <div>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-admin-text-muted)", fontWeight: 500 }}>Role Clearance</p>
                <h4 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-admin-text)", textTransform: "capitalize", marginTop: 2 }}>
                  {roleInfo?.role === "super" ? "Super Admin" : roleInfo?.role || "Viewer"}
                </h4>
              </div>
            </div>
          </div>

          {/* Module Cards Grid */}
          <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
              Modules Directory
            </h3>
            <span style={{ fontSize: "0.8125rem", color: "var(--color-admin-text-muted)" }}>
              Showing {modules.length} module{modules.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {modulesWithCounts.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
