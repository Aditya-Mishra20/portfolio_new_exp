"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile, email, calcomUrl, socials, resumeUrl, ui } from "@/content/site";
import { XBrand } from "@/components/brand-icons";
import { EASE_STANDARD, PANEL_INNER, PANEL_OUTER, SECTION_PAD, SOCIAL_CHIP } from "@/lib/styles";
import { Separator } from "@/components/ui/separator";

/** Abstract placeholder hero art — TODO: replace with your own art. */
function HeroArt({ dark }: { dark: boolean }) {
  const fg = dark ? "#e4e4e7" : "#18181b";
  const dim = dark ? "#3f3f46" : "#a1a1aa";
  const accent = dark ? "#fafafa" : "#18181b";
  return (
    <svg viewBox="0 0 640 220" className="h-auto w-full" role="img" aria-label="Abstract art">
      <rect x="10" y="10" width="620" height="200" rx="14" fill="none" stroke={dim} strokeDasharray="4 6" />
      <circle cx="120" cy="72" r="34" fill="none" stroke={fg} strokeWidth="1.25" />
      <rect x="420" y="40" width="110" height="110" rx="10" fill="none" stroke={fg} strokeWidth="1.25" transform="rotate(6 475 95)" />
      <path d="M70 176 L150 108 L230 176 Z" fill="none" stroke={fg} strokeWidth="1.25" />
      <circle cx="560" cy="170" r="6" fill={accent} />
      <path d="M300 60 L340 60 L320 96 Z" fill="none" stroke={fg} strokeWidth="1.25" />
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
  return (
    <div>
      {/* ROW 1 — themed hero art, inset from the frame (the "gap") */}
      <div className={SECTION_PAD}>
        <div className={`relative w-full aspect-[640/220] ${PANEL_OUTER}`}>
          <div className={`h-full w-full relative bg-muted ${PANEL_INNER}`}>
            <div className="absolute inset-0 flex items-center justify-center p-3">
              <div className="hero-art-light w-full">
                <HeroArt dark={false} />
              </div>
              <div className="hero-art-dark w-full">
                <HeroArt dark />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* seam */}
      <Separator />

      {/* ROW 2 — avatar (same box design as the art band) + name + role */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: EASE_STANDARD }}
        className="px-5 md:px-8 py-7 flex items-center gap-4"
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
            <span className="text-foreground/40">.</span>
          </h1>
          <p className="text-sm text-foreground/60 mt-1.5 font-light">
            {profile.role} · {profile.location}
          </p>
        </div>
      </motion.div>

      <Separator />

      {/* ROW 3 — bio (spans the container end to end) */}
      <div className="px-5 md:px-8 py-7">
        <p className="text-sm text-foreground/60 leading-relaxed font-light text-justify">
          {profile.bio}
        </p>

        {/* CTAs */}
        <div className="mt-5 flex flex-wrap gap-2.5 items-center">
          <SolidCta href={calcomUrl} icon={<Calendar className="size-3.5 opacity-80" />}>{ui.cta.bookCall}</SolidCta>
          <SolidCta icon={<Mail className="size-3.5 opacity-80" />}>{ui.cta.sendEmail}</SolidCta>
        </div>

        {/* Socials lead-in, then Resume + socials row */}
        <p className="mt-5 text-sm text-foreground/60 font-light">{ui.socialsLeadIn}</p>
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
