// File: src/app/[module]/loading.tsx
// Skeleton loader during page navigation

export default function Loading() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--color-admin-bg)" }}>
      {/* Sidebar skeleton */}
      <div style={{ width: 260, borderRight: "1px solid var(--color-admin-border)", padding: "1.5rem 1rem" }}>
        <div className="skeleton" style={{ height: 32, width: 140, borderRadius: 8, marginBottom: 32 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 40, width: "100%", borderRadius: 8 }} />
          ))}
        </div>
      </div>

      {/* Content skeleton */}
      <div style={{ flex: 1, padding: "2rem" }}>
        <div className="skeleton" style={{ height: 36, width: 240, borderRadius: 8, marginBottom: 24 }} />
        <div className="skeleton" style={{ height: 400, width: "100%", borderRadius: 16 }} />
      </div>
    </div>
  );
}
