"use client";
// File: src/components/sections/faq-section.tsx — Albarzah

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@sakinah/ui";
import { SECTION_IDS } from "@/lib/constants";
import { faqItems } from "@/data/faq";
import { ResponsiveContainer } from "@sakinah/ui";
import { SectionHeading } from "@sakinah/ui";
import { staggerContainer, cardReveal, viewportOnce } from "@sakinah/ui";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  headerId: string;
  panelId: string;
}

function AccordionItem({ question, answer, isOpen, onToggle, headerId, panelId }: AccordionItemProps) {
  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-200",
        isOpen && "shadow-card"
      )}
      style={{
        borderColor: isOpen ? "var(--color-brand-green)" : "var(--color-brand-border)",
        background: "#fff",
      }}
    >
      <h3>
        <button
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left rounded-xl"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
          type="button"
        >
          <span
            className="flex-1 text-sm font-semibold leading-snug"
            style={{ color: "var(--color-brand-text)" }}
          >
            {question}
          </span>
          <ChevronDown
            className={cn(
              "mt-0.5 h-5 w-5 flex-shrink-0 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
            aria-hidden="true"
            style={{ color: isOpen ? "var(--color-brand-green)" : "var(--color-brand-text-muted)" } as React.CSSProperties}
          />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden rounded-b-xl"
          >
            <div
              className="border-t px-5 pb-4 pt-4"
              style={{ borderColor: "var(--color-brand-border)" }}
            >
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-text-muted)" }}>
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenItem((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id={SECTION_IDS.soalan}
      aria-label="Soalan Lazim"
      className="section-texture py-16 lg:py-24"
      style={{ background: "var(--color-brand-ivory)" }}
    >
      <ResponsiveContainer>
        <SectionHeading
          eyebrow="Soalan Lazim"
          title="Soalan Yang Sering Ditanya"
          subtitle="Tidak jumpa jawapan yang anda cari? Hubungi kami terus dan pasukan kami sedia membantu."
          className="mb-10"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-3xl space-y-3"
        >
          {faqItems.map((item, idx) => (
            <motion.div key={idx} variants={cardReveal} className="relative hover:z-40 focus-within:z-40">
              <AccordionItem
                headerId={`faq-heading-${idx}`}
                panelId={`faq-panel-${idx}`}
                question={item.question}
                answer={item.answer}
                isOpen={openItem === idx}
                onToggle={() => toggle(idx)}
              />
            </motion.div>
          ))}
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
}
