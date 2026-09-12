// File: src/lib/types.ts
// Common TypeScript type definitions for MySakinah Admin System

export type AdminRoleType = "super" | "editor" | "viewer";

export interface AdminModule {
  id: string;
  slug: string;
  display_name: string;
  description?: string;
  icon: string;
  color: string;
  color_from?: string;
  color_to?: string;
  created_at: string;
  submission_count?: number;
}

export interface Submission {
  id: string;
  module_id: string;
  module_slug?: string;
  module_name?: string;
  form_data: Record<string, any>;
  status: "pending" | "reviewed" | "contacted" | "completed" | "archived";
  notes?: string;
  submitted_by?: string;
  created_at: string;
  updated_at: string;
}

export interface UserRoleInfo {
  user_id: string;
  email: string;
  role: AdminRoleType;
  allowed_modules: string[]; // List of module slugs or ["*"] for super admin
}

export interface SubmissionFilter {
  module_slug?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedSubmissions {
  data: Submission[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
