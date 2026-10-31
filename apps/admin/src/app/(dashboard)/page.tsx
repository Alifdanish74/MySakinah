// File: src/app/page.tsx
// Home Dashboard page listing all accessible module cards with counts and stats

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserRole, getAccessibleModules } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard-shell";
import { ModuleCard } from "@/components/module-card";
import { LayoutGrid, Layers, FileText } from "lucide-react";

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

  // Keep failed counts distinct from a genuine zero.
  const modulesWithCounts = await Promise.all(
    modules.map(async (mod) => {
      try {
        const { count, error } = await supabase
          .from("submissions")
          .select("*", { count: "exact", head: true })
          .eq("module_id", mod.id);

        if (error) {
          console.error(`Failed to load submission count for module ${mod.slug}`, error);
          return { ...mod, submission_count: null };
        }

        return { ...mod, submission_count: count ?? 0 };
      } catch (error) {
        console.error(`Failed to load submission count for module ${mod.slug}`, error);
        return { ...mod, submission_count: null };
      }
    })
  );

  const hasCountErrors = modulesWithCounts.some((item) => item.submission_count === null);
  const totalSubmissions = hasCountErrors
    ? null
    : modulesWithCounts.reduce((acc, item) => acc + (item.submission_count ?? 0), 0);
  const roleLabel = roleInfo?.role === "super"
    ? "Super Admin"
    : roleInfo?.role || "Viewer";

  return (
    <DashboardShell modules={modules} userRole={roleInfo} title="Overview">
      <section className="overview-heading" aria-labelledby="overview-title">
        <div>
          <h2 id="overview-title">Membership submissions</h2>
          <p>Review enquiries and manage records across your assigned modules.</p>
        </div>
      </section>

      {hasCountErrors && (
        <p className="error-state" role="alert" style={{ marginBottom: "1rem" }}>
          Some submission counts could not be loaded. Reload this page to try again.
        </p>
      )}

      <section className="metric-grid" aria-label="Overview metrics">
        <div className="metric-card">
          <div className="metric-icon">
            <Layers size={20} aria-hidden="true" />
          </div>
          <div>
            <p className="metric-label">Available modules</p>
            <p className="metric-value">{modules.length}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <FileText size={20} aria-hidden="true" />
          </div>
          <div>
            <p className="metric-label">Total submissions</p>
            <p className="metric-value">{totalSubmissions ?? "Unavailable"}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <LayoutGrid size={20} aria-hidden="true" />
          </div>
          <div>
            <p className="metric-label">Access level</p>
            <p className="metric-value" style={{ fontSize: "1.125rem", textTransform: "capitalize" }}>
              {roleLabel}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="modules-title">
        <div style={{ marginBottom: "1rem", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem" }}>
          <h3 id="modules-title" style={{ margin: 0, fontSize: "1.125rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
            Modules
          </h3>
          <span style={{ fontSize: "0.8125rem", color: "var(--color-admin-text-muted)" }}>
            {modules.length} available
          </span>
        </div>

        {modulesWithCounts.length > 0 ? (
          <div className="module-grid">
            {modulesWithCounts.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        ) : (
          <p className="empty-state">No modules are assigned to your account. Contact an administrator for access.</p>
        )}
      </section>
    </DashboardShell>
  );
}
