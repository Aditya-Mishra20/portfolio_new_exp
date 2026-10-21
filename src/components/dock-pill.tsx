"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp, FileText, Menu, Moon, Search, Sun, X, Bot,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useCommandPalette, scrollToId } from "@/components/providers";
import { navLinks, resumeUrl } from "@/content/site";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Floating dock pill (fixed bottom-center), recovered from the        */
/* reference site's live DOM (dossier: nav[data-dock]):                */
/*   [⌕ Ask me anything  Ctrl K] | [☀/☾] | [◎ ring / ≡ menu]           */
/* Desktop shows a scroll-progress ring (click = back to top);         */
/* mobile shows a hamburger that opens a small link sheet.             */
/* ------------------------------------------------------------------ */

function ScrollRing() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const R = 8.5;
  const C = 2 * Math.PI * R;
  const done = pct >= 98;

  return (
    <button
      onClick={() => {
        const w = window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } };
        if (w.__lenis) w.__lenis.scrollTo(0, { immediate: false });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label={`Scroll progress ${pct}% — back to top`}
      className="relative hidden sm:flex h-8 w-8 items-center justify-center rounded-full text-foreground/80 hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors cursor-pointer"
    >
      <svg viewBox="0 0 24 24" className="absolute inset-0 size-full -rotate-90">
        <circle cx="12" cy="12" r={R} fill="none" strokeWidth="1.5" className="stroke-border" />
        <circle
          cx="12" cy="12" r={R} fill="none" strokeWidth="1.5"
          strokeLinecap="round"
          className="stroke-foreground/70 transition-[stroke-dashoffset] duration-150"
          strokeDasharray={C}
          strokeDashoffset={C - (C * pct) / 100}
        />
      </svg>
      <span className="relative flex items-center justify-center size-[17px]">
        {done ? (
          <ArrowUp className="size-3" />
        ) : (
          <span className="text-[9px] font-medium leading-none tabular-nums">{pct}</span>
        )}
      </span>
    </button>
  );
}

function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={mounted && resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="relative flex h-8 w-8 items-center justify-center rounded-full text-foreground/80 hover:bg-foreground/5 dark:hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors cursor-pointer"
    >
      <span className="relative size-[17px] flex items-center justify-center">
        {mounted && resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </span>
    </button>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex sm:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-foreground/80 hover:bg-foreground/5 dark:hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors"
      >
        {open ? <X className="size-4" /> : <Menu className="size-4" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
            className="absolute bottom-11 right-0 w-44 rounded-lg border border-border bg-popover text-popover-foreground p-1.5 shadow-xl"
          >
            {navLinks.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setOpen(false);
                  scrollToId(s.id);
                }}
                className="w-full text-left px-2.5 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-foreground/5 transition-colors"
              >
                {s.label}
              </button>
            ))}
            <a
              href={resumeUrl}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 w-full px-2.5 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-foreground/5 transition-colors"
            >
              <FileText className="size-3.5" /> Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DockPill() {
  const { setOpen } = useCommandPalette();

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 sm:bottom-[calc(20px+env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2 isolate"
    >
      <div
        className="relative z-10 flex h-[48px] items-center gap-1 rounded-full px-2 border border-border bg-background shadow-none sm:shadow-2xl text-foreground/80"
      >
        {/* ask trigger — opens the existing cmdk palette */}
        <button
          type="button"
          aria-label="Ask me anything"
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
          className="flex h-8 items-center gap-2 rounded-full px-3 bg-foreground/5 hover:bg-foreground/8 dark:bg-foreground/8 dark:hover:bg-foreground/12 text-muted-foreground transition-colors cursor-pointer w-[160px] sm:w-[210px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <Search className="size-[14px] shrink-0 text-muted-foreground" />
          <span aria-hidden="true" className="flex-1 text-left text-[12.5px] truncate">
            Ask me anything
          </span>
          <span aria-hidden="true" className="hidden sm:flex items-center gap-1 shrink-0">
            <kbd className="flex h-[18px] min-w-[18px] items-center justify-center rounded-[6px] bg-foreground/10 px-1 text-[11px] font-medium leading-none text-muted-foreground">
              Ctrl
            </kbd>
            <kbd className="flex h-[18px] min-w-[18px] items-center justify-center rounded-[6px] bg-foreground/10 px-1 text-[11px] font-medium leading-none text-muted-foreground">
              K
            </kbd>
          </span>
        </button>

        {/* divider recovered from the reference pill */}
        <div className="mx-1 h-4 w-0 shrink-0 border-l border-border" />

        <ThemeButton />

        {/* AI chat bot — opens the chat widget via the same event it listens for */}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
          aria-label="Chat with my AI"
          className="relative flex h-8 w-8 items-center justify-center rounded-full text-foreground/80 hover:bg-foreground/5 dark:hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors cursor-pointer"
        >
          <Bot className="size-4" />
        </button>

        <ScrollRing />
        <MobileMenu />
      </div>
    </nav>
  );
}
