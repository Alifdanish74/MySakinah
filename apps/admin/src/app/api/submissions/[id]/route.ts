// File: src/app/api/submissions/[id]/route.ts
// API route for single submission operations: GET, PATCH (edit), DELETE

import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { canEditModule, canAccessModule } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/submissions/[id]
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("submissions")
      .select("*, modules!inner(slug)")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    const moduleSlug = (data.modules as any)?.slug;
    if (moduleSlug && !(await canAccessModule(user.id, moduleSlug))) {
      return NextResponse.json({ error: "Forbidden: No access to this submission" }, { status: 403 });
    }

    return NextResponse.json({ submission: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH /api/submissions/[id]
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch existing submission to check module permission
    const { data: existing, error: findErr } = await supabase
      .from("submissions")
      .select("*, modules!inner(slug)")
      .eq("id", id)
      .single();

    if (findErr || !existing) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    const moduleSlug = (existing.modules as any)?.slug;
    if (moduleSlug && !(await canEditModule(user.id, moduleSlug))) {
      return NextResponse.json({ error: "Forbidden: Insufficient edit permissions" }, { status: 403 });
    }

    const body = await req.json();
    const { status, notes, form_data } = body;

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (status !== undefined) updates.status = status;
    if (notes !== undefined) updates.notes = notes;
    if (form_data !== undefined) updates.form_data = form_data;

    const { data: updated, error: updateErr } = await supabase
      .from("submissions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (updateErr) {
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, submission: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/submissions/[id]
export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: existing, error: findErr } = await supabase
      .from("submissions")
      .select("*, modules!inner(slug)")
      .eq("id", id)
      .single();

    if (findErr || !existing) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    const moduleSlug = (existing.modules as any)?.slug;
    if (moduleSlug && !(await canEditModule(user.id, moduleSlug))) {
      return NextResponse.json({ error: "Forbidden: Insufficient edit permissions" }, { status: 403 });
    }

    const { error: deleteErr } = await supabase.from("submissions").delete().eq("id", id);

    if (deleteErr) {
      return NextResponse.json({ error: deleteErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, deleted_id: id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
