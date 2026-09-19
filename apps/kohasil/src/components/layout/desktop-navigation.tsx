"use client";
// File: src/components/layout/desktop-navigation.tsx

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@sakinah/ui";
import { desktopNavItems } from "@/data/navigation";
import { scrollToSection } from "@sakinah/ui";
import { SECTION_IDS } from "@/lib/constants";

// Physical order of sections on the home page
const PAGE_SECTION_IDS = [
  SECTION_IDS.utama,
  SECTION_IDS.proses,
  SECTION_IDS.manfaat,
  SECTION_IDS.pakej,
  SECTION_IDS.syariah,
  SECTION_IDS.testimoni,
  SECTION_IDS.soalan,
  SECTION_IDS.hubungi,
];

export function DesktopNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>(SECTION_IDS.utama);

  const handleScroll = useCallback(() => {
    // pathname from usePathname() is relative to basePath; "/" means the home page
    if (pathname !== "/") return;

    let current = PAGE_SECTION_IDS[0];

    for (const id of PAGE_SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) {
          current = id;
        }
      }
    }

    setActiveSection(current);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    const timer = setTimeout(() => {
      const hash = window.location.hash.replace("#", "");
      if (hash && PAGE_SECTION_IDS.includes(hash as (typeof PAGE_SECTION_IDS)[number])) {
        setActiveSection(hash);
      } else {
        handleScroll();
      }
    }, 0);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, pathname]);

  return (
    <nav aria-label="Navigasi utama" className="hidden lg:flex items-center gap-1">
      {desktopNavItems.map((item) => {
        const isRoute = item.href.startsWith("/") && !item.href.startsWith("/#");
        const sectionId = item.href.replace("/#", "").replace("#", "");

        const isActive = isRoute
          ? pathname === item.href
          : pathname === "/" && activeSection === sectionId;

        if (isRoute) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-4 py-2 rounded-lg text-sm font-semibold font-body transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                isActive
                  ? "text-brand-green"
                  : "text-brand-text-muted hover:text-brand-green"
              )}
              style={{
                color: isActive ? "var(--color-brand-green)" : "var(--color-brand-text-muted)",
                fontFamily: "var(--font-body)",
              }}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
              {isActive && (
                <span
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                  style={{ background: "var(--color-brand-gold)" }}
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        }

        return (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => {
              // Always intercept hash links — raw href="/#soalan" would navigate to
              // domain root instead of the basePath home page on sub-pages.
              e.preventDefault();
              if (pathname === "/") {
                // Already on home — smooth scroll
                scrollToSection(sectionId);
              } else {
                // On a sub-page — navigate to home first, then scroll after mount
                router.push(`/#${sectionId}`);
              }
            }}
            className={cn(
              "relative px-4 py-2 rounded-lg text-sm font-semibold font-body transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
              isActive
                ? "text-brand-green"
                : "text-brand-text-muted hover:text-brand-green"
            )}
            style={{
              color: isActive ? "var(--color-brand-green)" : "var(--color-brand-text-muted)",
              fontFamily: "var(--font-body)",
            }}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
            {isActive && (
              <span
                className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                style={{ background: "var(--color-brand-gold)" }}
                aria-hidden="true"
              />
            )}
          </a>
        );
      })}
    </nav>
  );
}
