"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Download, Github, Linkedin, Mail, RefreshCcw } from "lucide-react";
import { profile, email, calcomUrl, socials, resumeUrl, ui } from "@/content/site";
import { XBrand } from "@/components/brand-icons";
import { FlipWords } from "@/components/ui/flip-words";
import { TimeScenes } from "@/components/time-scenes";
import { EASE_STANDARD, PANEL_INNER, PANEL_OUTER, SECTION_PAD, SECTION_X, SOCIAL_CHIP } from "@/lib/styles";
import { Separator } from "@/components/ui/separator";

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
  const [mode, setMode] = useState<"art" | "game">("art");
  // the iframe mounts on first open and then STAYS mounted (hidden) so the
  // run survives toggling back to art during the session
  const [gameOpened, setGameOpened] = useState(false);
  const toggleMode = () => {
    setGameOpened(true); // idempotent once true
    setMode((m) => (m === "art" ? "game" : "art"));
  };
  return (
    <div>
      {/* ROW 1 — art box, inset from the frame (the "gap").
          Corner button swaps between the placeholder art and the Chrome
          Dino game (chromedino.com embed). */}
      <div className={SECTION_PAD}>
        <div className={`relative w-full aspect-[640/220] ${PANEL_OUTER}`}>
          <div className={`h-full w-full relative bg-muted ${PANEL_INNER}`}>
            {/* art layer — geometric time-of-day scenes (morning / evening /
                night), picked by the visitor's local clock. Pure SVG, no
                asset files (template-safe). Fades out when the game shows. */}
            <TimeScenes visible={mode === "art"} />

            {/* game layer — mounts lazily on first toggle.
                SOURCE: https://chromedino.com/batman/embed/ (Batman vs Joker,
                fan-made; dark Gotham by default so no theme filter needed).
                Other clean embeds exist: /color/embed/ /black/embed/
                /joker/embed/ /dina/embed/ (chromedino.com). Attribution kept
                below. */}
            {gameOpened && (
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  mode === "game" ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <iframe
                  src="https://chromedino.com/batman/embed/"
                  title="Batman vs Joker Game"
                  scrolling="no"
                  className="dino-frame absolute inset-0 size-full border-0"
                />
                <p className="absolute bottom-1.5 right-2.5 z-10 m-0 font-mono text-[10px] text-muted-foreground/80">
                  Batman vs Joker — game by{" "}
                  <a href="https://chromedino.com" target="_blank" rel="noreferrer" className="underline transition-colors hover:text-foreground">
                    chromedino.com
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* art/game toggle — small square tucked INSIDE the panel's
              bottom-left corner with a small gap from the border */}
          <button
            onClick={toggleMode}
            aria-label={mode === "art" ? "Show the Batman game" : "Back to art"}
            title={mode === "art" ? "Show the Batman game" : "Back to art"}
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
