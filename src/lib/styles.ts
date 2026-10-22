/**
 * Shared style tokens — the single home for class strings and motion values
 * that appear in multiple components (Phase 2 of the cleanup).
 * Presentation stays with the components; duplicated literals live here so
 * they can't drift apart when restyling.
 */

/** Page column wrapper — main content and footer share this container. */
export const PAGE_WRAPPER = "max-w-4xl mx-auto px-4 md:px-6";

/** Section body padding inside the page column. */
export const SECTION_PAD = "px-5 md:px-8 py-8 md:py-10";

/** Small colored tech tag pill — rounded-full card chip with brand icon
 * (tech-stack + experience must stay identical per design decision). */
export const TECH_CHIP =
  "inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-border bg-card px-2 py-0.5 text-[11.5px] text-muted-foreground hover:text-foreground transition-colors";

/** Social/link chip — rounded-md secondary chip (hero + contact). */
export const SOCIAL_CHIP =
  "inline-flex text-xs font-light items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-md border border-border bg-secondary hover:bg-secondary/60 text-secondary-foreground transition-all";

/** Inset "art panel" box — the mat + frame used by hero art, avatar, footer band. */
export const PANEL_OUTER =
  "rounded-lg shadow-ax bg-muted/15 p-1.5 border border-border";
export const PANEL_INNER = "border rounded-md overflow-hidden";

/** Motion easings (framer cubic-bezier). Keep these in sync with any motion
 * tokens someday extracted to globals.css — one JS source today. */
export const EASE_STANDARD: [number, number, number, number] = [0.2, 0, 0, 1];
export const EASE_EMPHASIZED: [number, number, number, number] = [0.2, 0.8, 0.2, 1];
