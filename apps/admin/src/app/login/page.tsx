"use client";
// File: src/app/login/page.tsx
// Admin login page with Supabase email/password auth

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion, useReducedMotion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, Shield, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const reduceMotion = useReducedMotion();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.refresh();
    router.push("/");
  }

  return (
    <main
      className="min-h-dvh flex items-center justify-center p-4"
      style={{ background: "var(--color-admin-bg)" }}
    >
      <div
        className="glass-card w-full max-w-md p-8"
      >
        {/* Logo / Brand */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "var(--radius-lg)",
              background: "var(--color-admin-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Shield size={28} color="#fff" aria-hidden="true" />
          </div>
          <div className="text-center">
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--color-admin-text)",
                lineHeight: 1.2,
                marginBottom: "0.25rem",
              }}
            >
              MySakinah Admin
            </h1>
            <p style={{ color: "var(--color-admin-text-muted)", fontSize: "0.875rem" }}>
              Sign in to access the dashboard
            </p>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={reduceMotion ? { duration: 0 } : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              background: "color-mix(in srgb, var(--color-admin-danger) 12%, var(--color-admin-surface))",
              border: "1px solid color-mix(in srgb, var(--color-admin-danger) 35%, transparent)",
              borderRadius: "var(--radius-md)",
              marginBottom: "1.25rem",
              color: "var(--color-admin-danger)",
              fontSize: "0.875rem",
            }}
            role="alert"
          >
            <AlertCircle size={16} aria-hidden="true" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Email field */}
          <div>
            <label htmlFor="admin-email" className="form-label">Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail
                size={16}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--color-admin-text-muted)",
                  pointerEvents: "none",
                }}
              />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                autoComplete="email"
                className="form-input"
                style={{ paddingLeft: "2.5rem" }}
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label htmlFor="admin-password" className="form-label">Password</label>
            <div style={{ position: "relative" }}>
              <Lock
                size={16}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--color-admin-text-muted)",
                  pointerEvents: "none",
                }}
              />
              <input
                id="admin-password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="form-input"
                style={{ paddingLeft: "2.5rem", paddingRight: "2.75rem" }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                aria-label={showPass ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-admin-text-muted)",
                  width: 44,
                  height: 44,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {showPass ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            id="login-submit"
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: "100%", marginTop: "0.5rem" }}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    animation: reduceMotion ? undefined : "spin 0.8s linear infinite",
                    display: "inline-block",
                  }}
                />
                Signing in…
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.8125rem",
            color: "var(--color-admin-text-muted)",
          }}
        >
          Access restricted to authorised administrators only.
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
