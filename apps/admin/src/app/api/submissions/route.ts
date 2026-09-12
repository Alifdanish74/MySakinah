// File: src/app/api/submissions/route.ts
// API route for GET (filtering/listing) & POST (submitting new form entries from landing pages)

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAccessibleModules, canAccessModule } from "@/lib/auth";

// GET /api/submissions?module=kohasil&status=pending
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const moduleSlug       = searchParams.get("module");
    const status           = searchParams.get("status");

    // If specific module requested, check user permission
    if (moduleSlug) {
      const allowed = await canAccessModule(user.id, moduleSlug);
      if (!allowed) {
        return NextResponse.json({ error: "Forbidden: No access to this module" }, { status: 403 });
      }
    }

    // Get accessible module IDs
    const allowedModules = await getAccessibleModules(user.id);
    const allowedIds = allowedModules.map((m) => m.id);

    let query = supabase.from("submissions").select("*").in("module_id", allowedIds);

    if (moduleSlug) {
      const targetMod = allowedModules.find((m) => m.slug === moduleSlug);
      if (targetMod) {
        query = query.eq("module_id", targetMod.id);
      }
    }

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ submissions: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/submissions (Ingest endpoint for landing page forms)
export async function POST(req: NextRequest) {
  try {
    const supabase = createAdminClient();
    const body     = await req.json();

    const { module_slug, form_data, submitted_by } = body;

    if (!module_slug || !form_data) {
      return NextResponse.json(
        { error: "Missing required fields: module_slug and form_data" },
        { status: 400 }
      );
    }

    // Dynamic module ID lookup by slug
    const { data: moduleRow } = await supabase
      .from("modules")
      .select("id")
      .eq("slug", module_slug)
      .maybeSingle();

    let targetModuleId = moduleRow?.id || null;

    // Auto-provision module entry if not seeded in database yet
    if (!targetModuleId) {
      const defaultNames: Record<string, { display_name: string; icon: string; color_from: string; color_to: string }> = {
        kohasil:  { display_name: "KOHASiL Raudhah", icon: "shield",    color_from: "#dc2626", color_to: "#991b1b" },
        kopetro:  { display_name: "KOPETRO",          icon: "flame",     color_from: "#ea580c", color_to: "#9a3412" },
        krtb:     { display_name: "KRTB",             icon: "building2", color_from: "#0284c7", color_to: "#075985" },
        kotamas:  { display_name: "KOTAMAS",          icon: "star",      color_from: "#7c3aed", color_to: "#4c1d95" },
        albarzah:        { display_name: "Al-Barzah",        icon: "moon",      color_from: "#047857", color_to: "#064e3b" },
        membership_card: { display_name: "Kad Keahlian",    icon: "credit-card", color_from: "#eab308", color_to: "#854d0e" },
      };

      const meta = defaultNames[module_slug] || {
        display_name: module_slug.toUpperCase(),
        icon: "shield",
        color_from: "#6366f1",
        color_to: "#8b5cf6",
      };

      const { data: newMod, error: createModErr } = await supabase
        .from("modules")
        .insert({
          slug: module_slug,
          display_name: meta.display_name,
          description: `Skim perlindungan ${meta.display_name}`,
          icon: meta.icon,
          color_from: meta.color_from,
          color_to: meta.color_to,
        })
        .select("id")
        .single();

      if (createModErr || !newMod) {
        return NextResponse.json(
          { error: `Module '${module_slug}' not found and could not be created: ${createModErr?.message || "unknown"}` },
          { status: 404 }
        );
      }
      targetModuleId = newMod.id;
    }

    // Insert submission
    const { data: newSubmission, error: insertErr } = await supabase
      .from("submissions")
      .insert({
        module_id: targetModuleId,
        form_data,
        submitted_by: submitted_by || form_data.full_name || form_data.email || "Anonymous",
        status: "pending",
      })
      .select()
      .single();

    if (insertErr) {
      return NextResponse.json({ error: insertErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, submission: newSubmission }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
