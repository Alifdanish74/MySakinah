// File: src/lib/auth.ts
// Auth helpers — role resolution and module access checks
import { createClient } from "@/lib/supabase/server";
import type { UserRoleInfo, AdminModule } from "./types";

export type AdminRole = "super" | "editor" | "viewer";

export interface UserAuth {
  userId: string;
  email: string;
  role: AdminRole | null;
  isSuperAdmin: boolean;
  allowedModules: AdminModule[];
}

/**
 * Fetches the current user's auth context including role and allowed modules.
 * Returns null if the user is not authenticated.
 */
export async function getUserAuth(): Promise<UserAuth | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  // Fetch role rows for this user
  const { data: roleRows, error: roleError } = await supabase
    .from("admin_roles")
    .select("role, module_id, modules(id, slug, display_name, description, icon, color_from, color_to, created_at)")
    .eq("user_id", user.id);

  if (roleError) {
    console.error("[auth] Error fetching roles:", roleError.message);
  }

  // Determine if super admin (module_id IS NULL and role = 'super')
  const superRow = roleRows?.find((r) => r.role === "super" && !r.module_id);
  const isSuperAdmin = !!superRow;

  // Determine the highest role across all rows
  const roles = (roleRows ?? []).map((r) => r.role as AdminRole);
  const topRole: AdminRole | null = isSuperAdmin
    ? "super"
    : roles.includes("editor")
    ? "editor"
    : roles.includes("viewer")
    ? "viewer"
    : null;

  let allowedModules: AdminModule[] = [];

  if (isSuperAdmin) {
    // Super admin: fetch all modules
    const { data: allModules } = await supabase
      .from("modules")
      .select("id, slug, display_name, description, icon, color_from, color_to, created_at")
      .order("created_at");
    allowedModules = (allModules ?? []) as unknown as AdminModule[];
  } else {
    // Scoped admin: use joined modules from role rows
    allowedModules = (roleRows ?? [])
      .filter((r) => r.modules !== null)
      .map((r) => r.modules as unknown as AdminModule);
  }

  return {
    userId: user.id,
    email: user.email ?? "",
    role: topRole,
    isSuperAdmin,
    allowedModules,
  };
}

export async function getUserRole(userId?: string): Promise<UserRoleInfo | null> {
  const auth = await getUserAuth();
  if (!auth) return null;

  return {
    user_id: auth.userId,
    email: auth.email,
    role: (auth.role as any) || "viewer",
    allowed_modules: auth.isSuperAdmin ? ["*"] : auth.allowedModules.map((m) => m.slug),
  };
}

export async function getAccessibleModules(userId?: string): Promise<AdminModule[]> {
  const auth = await getUserAuth();
  if (!auth) return [];
  return auth.allowedModules;
}

/**
 * Checks whether the user can access a specific module slug.
 */
export async function canAccessModule(userIdOrSlug: string, optionalSlug?: string): Promise<boolean> {
  const slug = optionalSlug || userIdOrSlug;
  const auth = await getUserAuth();
  if (!auth) return false;
  if (auth.isSuperAdmin) return true;
  return auth.allowedModules.some((m) => m.slug === slug);
}

/**
 * Checks whether the user can edit/delete in a module (role = editor or super).
 */
export async function canEditModule(userIdOrSlug: string, optionalSlug?: string): Promise<boolean> {
  const slug = optionalSlug || userIdOrSlug;
  const auth = await getUserAuth();
  if (!auth) return false;
  if (auth.isSuperAdmin) return true;

  const supabase = await createClient();
  const { data: rows } = await supabase
    .from("admin_roles")
    .select("role, module_id, modules!inner(slug)")
    .eq("user_id", auth.userId)
    .in("role", ["editor", "super"]);

  if (!rows) return false;
  return rows.some((r) => (r.modules as any)?.slug === slug);
}
