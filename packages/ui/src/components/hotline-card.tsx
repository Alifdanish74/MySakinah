// File: packages/ui/src/components/hotline-card.tsx
// Shared component — hotline number and tel link passed as props (no app-specific BRAND import)
import { Phone } from "lucide-react";
import { cn } from "../lib/utils";

interface HotlineCardProps {
  /** Display text for the phone number e.g. "011-1300 1999" */
  hotline?: string;
  /** tel: href e.g. "tel:01113001999" */
  hotlineTel?: string;
  label?: string;
  variant?: "dark" | "light" | "glass";
  className?: string;
  showIcon?: boolean;
  style?: React.CSSProperties;
}

export function HotlineCard({
  hotline = "011-1300 1999",
  hotlineTel = "tel:01113001999",
  label = "Hotline 24 Jam",
  variant = "dark",
  className,
  showIcon = true,
  style,
}: HotlineCardProps) {
  const isDark = variant === "dark";
  const isGlass = variant === "glass";

  return (
    <div
      className={cn(
        "rounded-2xl p-6 text-center",
        isDark && "hotline-card",
        !isDark && !isGlass && "border-2 border-current bg-white",
        className
      )}
      style={{
        ...(isDark ? undefined : { borderColor: "var(--color-brand-green)", color: "var(--color-brand-green)" }),
        ...style,
      }}
    >
      {showIcon && (
        <div
          className={cn(
            "mx-auto mb-3 flex h-6 w-8 items-center justify-center rounded-full",
            isDark ? "bg-white/20" : ""
          )}
          style={!isDark ? { background: "rgba(255,255,255,0.15)" } : undefined}
        >
          <Phone
            className="h-6 w-6"
            aria-hidden="true"
            style={{ color: isDark ? "#fff" : "inherit" }}
          />
        </div>
      )}
      <p className="mb-1 text-sm font-semibold uppercase tracking-wider opacity-80">
        {label}
      </p>
      <a
        href={hotlineTel}
        className="font-heading text-3xl font-bold tracking-wide transition-opacity hover:opacity-80"
        style={{
          fontFamily: "var(--font-body)",
          color: isDark || isGlass ? "#fff" : "var(--color-brand-green)",
        }}
        aria-label={`Hubungi ${label}: ${hotline}`}
      >
        {hotline}
      </a>
      <p className="mt-2 text-xs opacity-70">Setiap hari, 24 jam</p>
    </div>
  );
}
