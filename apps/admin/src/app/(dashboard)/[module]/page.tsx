// File: src/app/[module]/page.tsx
// Submissions table page for a specific module (kohasil, kopetro, krtb, kotamas, albarzah)

import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserRole, getAccessibleModules, canAccessModule, canEditModule } from "@/lib/auth";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { SubmissionTable } from "@/components/submission-table";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

interface ModulePageProps {
  params: Promise<{ module: string }>;
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { module: moduleSlug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Permission check
  const hasAccess = await canAccessModule(user.id, moduleSlug);
  if (!hasAccess) {
    notFound();
  }

  const roleInfo = await getUserRole(user.id);
  const modules  = await getAccessibleModules(user.id);
  const canEdit  = await canEditModule(user.id, moduleSlug);

  // Find module metadata
  const currentModule = modules.find((m) => m.slug === moduleSlug);
  if (!currentModule) {
    notFound();
  }

  // Fetch submissions for this module
  let submissions: any[] = [];
  try {
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("module_id", currentModule.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      submissions = data;
    }
  } catch {
    submissions = [];
  }

  async function handleRefresh() {
    "use server";
    revalidatePath(`/${moduleSlug}`);
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--color-admin-bg)" }}>
      <Sidebar modules={modules} userRole={roleInfo} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header userRole={roleInfo} title={`${currentModule.display_name} Submissions`} />

        <main style={{ padding: "2rem", flex: 1, overflowY: "auto" }}>
          {/* Top Bar / Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-admin-text)" }}>
                {currentModule.display_name} Data Records
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--color-admin-text-muted)", marginTop: 2 }}>
                Viewing real-time enquiry entries and form responses
              </p>
            </div>
          </div>

          {/* Submission Table */}
          <SubmissionTable
            submissions={submissions}
            canEdit={canEdit}
            onRefresh={handleRefresh}
            moduleName={currentModule.display_name}
          />
        </main>
      </div>
    </div>
  );
}
