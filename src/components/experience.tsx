"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { experience, ui, type ExperienceItem } from "@/content/site";
import { BrandIcon } from "@/components/brand-icons";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { EASE_STANDARD, TECH_CHIP } from "@/lib/styles";

/**
 * Experience — Tiwari-style expandable rows (screenshot reference):
 *   collapsed: role [Type pill]           period
 *              company                    location             ⌄
 *   expanded:  bullets + tech chips.
 * NOTE (user): no company logo square box. Dropdown via chevron toggle.
 */

/** Renders a bullet with **bold** spans, Tiwari-style emphasis. */
function BoldText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i} className="font-semibold text-foreground/80">{part}</strong> : <span key={i}>{part}</span>
      )}
    </>
  );
}

/** Generic expandable row shape shared by Experience + Education rows. */
export type RowData = {
  /** first visible line — the person's role (experience) or degree (education) */
  title: string;
  /** second line — organization (experience) or institution (education) */
  subtitle: string;
  /** uppercase pill on the title line */
  type: string;
  period: string;
  location: string;
  bullets: string[];
  /** optional chip row under the bullets (experience only) */
  tech?: string[];
};

export function Row({ item, i }: { item: RowData; i: number }) {
  const [open, setOpen] = useState(i === 0); // first row expanded by default
  return (
    <Reveal delay={i * 0.04}>
      <div className="py-5">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="group flex w-full flex-wrap items-center gap-x-3 gap-y-1 text-left min-w-0 cursor-pointer"
        >
          {/* left: role (title) + type pill, organization under it */}
          <span className="flex-1 min-w-0">
            <span className="flex items-center gap-1.5">
              <span className="text-[13px] sm:text-sm font-medium font-heading text-foreground">{item.title}</span>
              {/* pill shrinks on small screens so it hugs the title instead of
                  fighting it for width */}
              <span className="text-[9px] sm:text-[10px] font-light text-muted-foreground border rounded-sm px-1 sm:px-1.5 py-[1px] uppercase tracking-wide whitespace-nowrap">
                {item.type}
              </span>
            </span>
            <span className="mt-0.5 block text-sm text-foreground/50 font-light">{item.subtitle}</span>
          </span>
          {/* right: period over location, chevron */}
          <span className="flex flex-col items-end gap-0.5">
            <span className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">{item.period}</span>
            <span className="font-mono text-[11px] text-muted-foreground/60 whitespace-nowrap">{item.location}</span>
          </span>
          <ChevronDown
            className={`size-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* dropdown body */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_STANDARD }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-1.5 pl-4 text-sm text-foreground/60 font-light leading-relaxed text-justify">
                {item.bullets.map((b, j) => (
                  <li key={j} className="list-disc marker:text-foreground/30">
                    <BoldText text={b} />
                  </li>
                ))}
              </ul>
              {/* same chip design as Tech Stack — shared TECH_CHIP token */}
              {item.tech && item.tech.length > 0 && (
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {item.tech.map((t) => (
                    <span key={t} className={TECH_CHIP}>
                      <BrandIcon name={t} className="h-3 w-3" />
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export function Experience() {
  return (
    <Section id="experience" title={ui.sections.experiences.title} intro={ui.sections.experiences.intro}>
      <div className="divide-y divide-border">
        {experience.map((job, i) => (
          <Row
            key={job.company + job.period}
            item={{ title: job.role, subtitle: job.company, type: job.type, period: job.period, location: job.location, bullets: job.bullets, tech: job.tech }}
            i={i}
          />
        ))}
      </div>
    </Section>
  );
}
