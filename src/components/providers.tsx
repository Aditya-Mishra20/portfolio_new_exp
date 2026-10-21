"use client";

import { ThemeProvider } from "next-themes";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* ---------------- Command palette open state (dossier §1) ---------------- */

const PaletteContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>({ open: false, setOpen: () => {} });

function PaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>;
}

export function useCommandPalette() {
  return useContext(PaletteContext);
}

/* ---------------- Lenis smooth scrolling (dossier §8) ---------------- */

function SmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return; // honor prefers-reduced-motion like the reference site
    const lenis = new Lenis({
      lerp: 0.12,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, [reduced]);
  return null;
}

/* Anchor scrolling that cooperates with Lenis (native scrollIntoView
   smooth is overridden while Lenis drives the wheel). */
export function scrollToId(id: string) {
  const w = window as unknown as { __lenis?: Lenis };
  const el = document.getElementById(id);
  if (!el) return;
  if (w.__lenis) w.__lenis.scrollTo(el, { offset: -64 });
  else el.scrollIntoView({ behavior: "smooth" });
}


/* ---------------- Root providers ---------------- */

export function Providers({ children }: { children: ReactNode }) {
  // next-themes defaults recovered from the reference bundle (dossier §2):
  // storageKey "theme", attribute "data-theme", light/dark only, system default
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      storageKey="theme"
      disableTransitionOnChange
    >
      <PaletteProvider>
        <SmoothScroll />
        {children}
      </PaletteProvider>
    </ThemeProvider>
  );
}

/* ---------------- per-path view counter (dossier §3) ---------------- */

export function usePageViews(path: string) {
  const [views, setViews] = useState<number | null>(null);
  const fetchIt = useCallback(() => {
    fetch(`/api/views?path=${encodeURIComponent(path)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.views === "number") setViews(d.views);
      })
      .catch(() => {});
  }, [path]);
  useEffect(fetchIt, [fetchIt]);
  return views;
}
