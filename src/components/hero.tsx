"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Calendar, Download, Github, Linkedin, Mail, RefreshCcw } from "lucide-react";
import { profile, email, calcomUrl, socials, resumeUrl, ui } from "@/content/site";
import { XBrand } from "@/components/brand-icons";
import { FlipWords } from "@/components/ui/flip-words";
import { EASE_STANDARD, PANEL_INNER, PANEL_OUTER, SECTION_PAD, SECTION_X, SOCIAL_CHIP } from "@/lib/styles";
import { Separator } from "@/components/ui/separator";

/** Abstract placeholder hero art — TODO: replace with your own art.
 * The refresh button in the art's corner cycles through these variants;
 * swap them for real art in the same 640×220 box later. */
const ART_VARIANTS = [
  { circleX: 120, squareX: 420, tri: "M70 176 L150 108 L230 176 Z", dotX: 560, notchX: 300 },
  { circleX: 320, squareX: 80, tri: "M470 176 L550 108 L630 176 Z", dotX: 200, notchX: 60 },
  { circleX: 520, squareX: 260, tri: "M240 176 L320 108 L400 176 Z", dotX: 70, notchX: 460 },
] as const;

function HeroArt({ dark, variant }: { dark: boolean; variant: number }) {
  const fg = dark ? "#e4e4e7" : "#18181b";
  const dim = dark ? "#3f3f46" : "#a1a1aa";
  const accent = dark ? "#fafafa" : "#18181b";
  const v = ART_VARIANTS[variant % ART_VARIANTS.length];
  return (
    <svg viewBox="0 0 640 220" className="h-auto w-full" role="img" aria-label="Abstract art">
      <rect x="10" y="10" width="620" height="200" rx="14" fill="none" stroke={dim} strokeDasharray="4 6" />
      <circle cx={v.circleX} cy="72" r="34" fill="none" stroke={fg} strokeWidth="1.25" />
      <rect x={v.squareX} y="40" width="110" height="110" rx="10" fill="none" stroke={fg} strokeWidth="1.25" transform={`rotate(6 ${v.squareX + 55} 95)`} />
      <path d={v.tri} fill="none" stroke={fg} strokeWidth="1.25" />
      <circle cx={v.dotX} cy="170" r="6" fill={accent} />
      <path d={`M${v.notchX} 60 L${v.notchX + 40} 60 L${v.notchX + 20} 96 Z`} fill="none" stroke={fg} strokeWidth="1.25" />
      <text x="26" y="198" fill={dim} fontSize="10" fontFamily="monospace">
        {"// TODO: replace with your art"}
      </text>
    </svg>
  );
}

/** Solid quiet CTA (13px, font-light, arrow nudge on hover).
 * `icon` takes an ELEMENT (not a component function) so SolidCta can be
 * called from server components — lucide has no "use client" directive,
 * so passing icon *references* across the boundary would fail. */
export function SolidCta({
  href,
  children,
  icon,
}: {
  href?: string;
  children: string;
  icon: React.ReactNode;
}) {
  const cls =
    "cursor-pointer group/button inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-sm text-[13px] font-light h-9 px-2.5 bg-foreground text-background transition-all hover:opacity-90 outline-none focus-visible:ring-2 ring-ring";
  const inner = (
    <>
      {icon}
      {children}
      <ArrowUpRight className="size-3.5 opacity-60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );
  return href ? (
    <a href={href ?? `mailto:${email}`} target={href ? "_blank" : undefined} rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <a href={`mailto:${email}`} className={cls}>
      {inner}
    </a>
  );
}

export function Hero() {
  const [art, setArt] = useState(0);
  return (
    <div>
      {/* ROW 1 — themed hero art, inset from the frame (the "gap").
          Refresh button (bottom-left corner, per user drawing) cycles the
          placeholder variants until real art lands. */}
      <div className={SECTION_PAD}>
        <div className={`relative w-full aspect-[640/220] ${PANEL_OUTER}`}>
          <div className={`h-full w-full relative bg-muted ${PANEL_INNER}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={art}
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.35, ease: EASE_STANDARD }}
                className="absolute inset-0 flex items-center justify-center p-3"
              >
                <div className="hero-art-light w-full">
                  <HeroArt dark={false} variant={art} />
                </div>
                <div className="hero-art-dark w-full">
                  <HeroArt dark variant={art} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* art refresh — small square tucked INSIDE the panel's bottom-left
              corner with a small gap from the border (user update) */}
          <button
            onClick={() => setArt((a) => a + 1)}
            aria-label="Refresh hero art"
            title="Shuffle art"
            className="group/artbtn absolute bottom-2.5 left-2.5 z-10 flex size-7 items-center justify-center rounded-md border border-border bg-background shadow-sm text-foreground/70 hover:text-foreground hover:bg-foreground/5 dark:hover:bg-foreground/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <RefreshCcw className="size-3.5 transition-transform duration-300 group-hover/artbtn:-rotate-45" />
          </button>
        </div>
      </div>

      {/* seam */}
      <Separator />

      {/* ROW 2 — avatar (same box design as the art band) + name + role */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: EASE_STANDARD }}
        className={`${SECTION_X} py-7 flex items-center gap-4`}
      >
        {/* same inset-box language as the art panel above */}
        <div className={`relative shrink-0 ${PANEL_OUTER}`}>
          {/* TODO: swap unsplash placeholder for your photo */}
          <img
            src={profile.avatarUrl}
            alt={`${profile.name} avatar`}
            width={64}
            height={64}
            className="size-16 rounded-md object-cover border border-border bg-muted"
          />
        </div>
        <div>
          <h1 className="font-medium text-xl leading-5 font-heading flex items-center gap-1.5">
            {profile.name}
          </h1>
          {/* role flips through profile.roles (cycling words) — city/country removed */}
          <p className="text-sm text-foreground/60 mt-1.5 font-light h-5 overflow-hidden">
            <FlipWords words={profile.roles} className="text-sm text-foreground/60 font-light" />
          </p>
        </div>
      </motion.div>

      <Separator />

      {/* ROW 3 — bio (spans the container end to end) */}
      <div className={`${SECTION_X} py-7`}>
        <p className="text-sm text-foreground/60 leading-relaxed font-light text-justify">
          {profile.bio}
        </p>

        {/* CTAs */}
        <div className="mt-5 flex flex-wrap gap-2.5 items-center">
          <SolidCta href={calcomUrl} icon={<Calendar className="size-3.5 opacity-80" />}>{ui.cta.bookCall}</SolidCta>
          <SolidCta icon={<Mail className="size-3.5 opacity-80" />}>{ui.cta.sendEmail}</SolidCta>
        </div>

        {/* Socials lead-in, then Resume + socials row */}
        <p className="mt-5 text-sm text-foreground/60 font-light text-justify">{ui.socialsLeadIn}</p>
        <div className="mt-2.5 flex flex-wrap gap-2 items-center">
          <a href={resumeUrl} className={SOCIAL_CHIP}>
            <Download className="size-3.5" /> Resume
          </a>
          <a href={socials.github} target="_blank" rel="noreferrer" className={SOCIAL_CHIP}>
            <Github className="size-3.5" /> GitHub
          </a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" className={SOCIAL_CHIP}>
            <Linkedin className="size-3.5" /> LinkedIn
          </a>
          <a href={socials.twitter} target="_blank" rel="noreferrer" className={SOCIAL_CHIP}>
            <XBrand className="size-3.5" /> Twitter
          </a>
        </div>
      </div>
    </div>
  );
}
