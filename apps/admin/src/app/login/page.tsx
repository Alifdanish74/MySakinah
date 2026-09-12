"use client";
// File: src/app/login/page.tsx
// Premium glassmorphism login page with Supabase email/password auth

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, Shield, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

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
    <div
      className="min-h-dvh flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "var(--color-admin-bg)" }}
    >
      {/* Ambient blobs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-card w-full max-w-md p-8 relative z-10"
      >
        {/* Logo / Brand */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "var(--radius-lg)",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 24px rgba(99,102,241,0.4)",
            }}
          >
            <Shield size={28} color="#fff" />
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "var(--radius-md)",
              marginBottom: "1.25rem",
              color: "var(--color-admin-danger)",
              fontSize: "0.875rem",
            }}
            role="alert"
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleLogin} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Email field */}
          <div>
            <label htmlFor="admin-email" className="form-label">Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail
                size={16}
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
                  padding: 0,
                  display: "flex",
                }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
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
                    animation: "spin 0.8s linear infinite",
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
      </motion.div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
