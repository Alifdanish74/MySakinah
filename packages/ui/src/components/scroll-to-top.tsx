"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="scroll-to-top-fixed-container flex h-12 w-12 items-center justify-center rounded-full shadow-lg border backdrop-blur-md transition-all duration-300 pointer-events-auto"
          style={{
            position: "fixed",
            bottom: "5rem",
            right: "1rem",
            zIndex: 999999,
            background: "var(--color-brand-green, #00473c)",
            borderColor: "var(--color-brand-gold, #c99a00)",
            color: "var(--color-brand-gold-light, #f3b601)",
            boxShadow: "0 8px 24px rgba(15,16,95,0.30)",
          }}
          type="button"
          aria-label="Kembali ke atas laman"
          title="Kembali ke atas"
        >
          <style>{`
            @media (min-width: 640px) {
              .scroll-to-top-fixed-container {
                right: 1.5rem !important;
              }
            }
            @media (min-width: 1024px) {
              .scroll-to-top-fixed-container {
                bottom: 2rem !important;
                right: 2rem !important;
              }
            }
          `}</style>
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

