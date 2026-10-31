export default function LoadingDashboard() {
  return (
    <section
      className="dashboard-loading"
      role="status"
      aria-live="polite"
      aria-label="Loading dashboard"
    >
      <span className="sr-only">Loading dashboard…</span>
      <div className="skeleton" style={{ height: 40, width: 280, marginBottom: 24 }} />
      <div className="metric-grid" aria-hidden="true">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="metric-card">
            <div className="skeleton" style={{ height: 44, width: 44 }} />
            <div style={{ flex: 1 }}>
              <div className="skeleton" style={{ height: 14, width: "55%", marginBottom: 8 }} />
              <div className="skeleton" style={{ height: 26, width: "35%" }} />
            </div>
          </div>
        ))}
      </div>
      <div className="module-grid" aria-hidden="true" style={{ marginTop: 24 }}>
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="surface" style={{ padding: "1.25rem" }}>
            <div className="skeleton" style={{ height: 22, width: "65%", marginBottom: 16 }} />
            <div className="skeleton" style={{ height: 14, width: "90%", marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 14, width: "72%" }} />
          </div>
        ))}
      </div>
    </section>
  );
}
