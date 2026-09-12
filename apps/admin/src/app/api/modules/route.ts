// File: src/app/api/modules/route.ts
// API route to get accessible modules for the authenticated user

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAccessibleModules } from "@/lib/auth";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const modules = await getAccessibleModules(user.id);
    return NextResponse.json({ modules });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
