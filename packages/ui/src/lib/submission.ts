// File: packages/ui/src/lib/submission.ts
// Resilient Submission Dispatcher for MySakinahPro Modules

export interface SubmissionPayload {
  module_slug: string;
  submitted_by: string;
  form_data: Record<string, any>;
}

export interface SaveSubmissionResult {
  success: boolean;
  method?: "admin_api" | "supabase_direct";
  error?: string;
}

/**
 * Dispatches form submissions to Admin Dashboard API (ADMIN_API_URL)
 * with automatic fallback to direct Supabase REST API ingestion.
 */
export async function saveSubmissionToDatabase({
  module_slug,
  submitted_by,
  form_data,
}: SubmissionPayload): Promise<SaveSubmissionResult> {
  const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
  const adminApiUrl = process.env.ADMIN_API_URL?.trim();
  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL)?.trim();
  const supabaseKey = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_KEY
  )?.trim();

  let adminErrorDetails = "";

  // 1. Try sending to Admin API if configured or in dev environment
  const targetAdminUrl = adminApiUrl || (!isVercel ? "http://localhost:3005" : "");

  if (targetAdminUrl) {
    try {
      const res = await fetch(`${targetAdminUrl}/api/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          module_slug,
          submitted_by,
          form_data,
        }),
      });

      if (res.ok) {
        return { success: true, method: "admin_api" };
      } else {
        const errText = await res.text();
        adminErrorDetails = `Admin API (${res.status}): ${errText}`;
        console.error(`[Submission Service] ${adminErrorDetails}`);
      }
    } catch (err: any) {
      adminErrorDetails = `Admin API network error (${targetAdminUrl}): ${err.message}`;
      console.warn(`[Submission Service] ${adminErrorDetails}`);
    }
  }

  // 2. Fallback to direct Supabase ingestion if credentials exist
  if (supabaseUrl && supabaseKey && !supabaseUrl.includes("placeholder")) {
    try {
      // Step A: Find dynamic module ID by slug
      const modRes = await fetch(
        `${supabaseUrl}/rest/v1/modules?slug=eq.${encodeURIComponent(module_slug)}&select=id`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      let targetModuleId: string | null = null;
      if (modRes.ok) {
        const modData = await modRes.json();
        if (Array.isArray(modData) && modData.length > 0) {
          targetModuleId = modData[0].id;
        }
      }

      // Step B: Auto-create module entry if missing
      if (!targetModuleId) {
        const defaultNames: Record<
          string,
          { display_name: string; icon: string; color_from: string; color_to: string }
        > = {
          kohasil: { display_name: "KOHASiL Raudhah", icon: "shield", color_from: "#dc2626", color_to: "#991b1b" },
          kopetro: { display_name: "KOPETRO", icon: "flame", color_from: "#ea580c", color_to: "#9a3412" },
          krtb: { display_name: "KRTB", icon: "building2", color_from: "#0284c7", color_to: "#075985" },
          kotamas: { display_name: "KOTAMAS", icon: "star", color_from: "#7c3aed", color_to: "#4c1d95" },
          albarzah: { display_name: "Al-Barzah", icon: "moon", color_from: "#047857", color_to: "#064e3b" },
          membership_card: { display_name: "Kad Keahlian", icon: "credit-card", color_from: "#eab308", color_to: "#854d0e" },
        };

        const meta = defaultNames[module_slug] || {
          display_name: module_slug.toUpperCase(),
          icon: "shield",
          color_from: "#6366f1",
          color_to: "#8b5cf6",
        };

        const createModRes = await fetch(`${supabaseUrl}/rest/v1/modules`, {
          method: "POST",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            slug: module_slug,
            display_name: meta.display_name,
            description: `Skim perlindungan ${meta.display_name}`,
            icon: meta.icon,
            color_from: meta.color_from,
            color_to: meta.color_to,
          }),
        });

        if (createModRes.ok) {
          const newMod = await createModRes.json();
          if (Array.isArray(newMod) && newMod.length > 0) {
            targetModuleId = newMod[0].id;
          }
        }
      }

      // Step C: Insert submission row into Supabase
      if (targetModuleId) {
        const subRes = await fetch(`${supabaseUrl}/rest/v1/submissions`, {
          method: "POST",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            module_id: targetModuleId,
            form_data,
            submitted_by: submitted_by || form_data.nama || form_data.full_name || "Anonymous",
            status: "pending",
          }),
        });

        if (subRes.ok) {
          return { success: true, method: "supabase_direct" };
        } else {
          const subErr = await subRes.text();
          console.error(`[Submission Service] Direct Supabase insert error (${subRes.status}):`, subErr);
        }
      }
    } catch (supaErr: any) {
      console.error(`[Submission Service] Supabase direct fetch error:`, supaErr);
    }
  }

  // 3. Neither method succeeded
  const errReason = isVercel && !adminApiUrl && !supabaseUrl
    ? "Pembolehubah persekitaran ADMIN_API_URL atau NEXT_PUBLIC_SUPABASE_URL tidak ditetapkan di Vercel."
    : (adminErrorDetails || "Gagal menyimpan borang ke Admin Dashboard dan Supabase.");

  return { success: false, error: errReason };
}
