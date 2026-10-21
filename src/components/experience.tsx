"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { experience, type ExperienceItem } from "@/content/site";
import { BrandIcon } from "@/components/brand-icons";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

/**
 * Experience — Tiwari-style expandable rows (screenshot reference):
 *   collapsed: Company [Type pill]        period
 *              role                       location - Remote    ⌄
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

function Row({ job, i }: { job: ExperienceItem; i: number }) {
  const [open, setOpen] = useState(i === 0); // first role expanded by default
  return (
    <Reveal delay={i * 0.04}>
      <div className="py-5">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="group flex w-full flex-wrap items-center gap-x-3 gap-y-1 text-left min-w-0 cursor-pointer"
        >
          {/* left: company + type pill, role under it */}
          <span className="flex-1 min-w-0">
            <span className="flex items-center gap-2.5">
              <span className="text-sm font-medium font-heading text-foreground">{job.company}</span>
              <span className="text-[10px] font-light text-muted-foreground border rounded-sm px-1.5 py-0.5 uppercase tracking-wide">
                {job.type}
              </span>
            </span>
            <span className="mt-0.5 block text-sm text-foreground/50 font-light">{job.role}</span>
          </span>
          {/* right: period over location, chevron */}
          <span className="flex flex-col items-end gap-0.5">
            <span className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">{job.period}</span>
            <span className="font-mono text-[11px] text-muted-foreground/60 whitespace-nowrap">{job.location}</span>
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
              transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-1.5 pl-4 text-sm text-foreground/60 font-light leading-relaxed text-justify">
                {job.bullets.map((b, j) => (
                  <li key={j} className="list-disc marker:text-foreground/30">
                    <BoldText text={b} />
                  </li>
                ))}
              </ul>
              {/* same chip design as Tech Stack */}
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {job.tech.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-border bg-card px-2 py-0.5 text-[11.5px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <BrandIcon name={t} className="h-3 w-3" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export function Experience() {
  return (
    <Section title="Experiences" intro="Where I've worked and what I did there. Click a role to expand it.">
      <div className="divide-y divide-border">
        {experience.map((job, i) => (
          <Row key={job.company + job.period} job={job} i={i} />
        ))}
      </div>
    </Section>
  );
}
