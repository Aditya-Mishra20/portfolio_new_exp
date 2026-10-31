import { useMemo } from "react";
import { projectSlug, type Project } from "@/content/site";

/** Geometric placeholder art for the project detail "feature box".
 * Same drawing language as the hero box's time-of-day scenes (flat 2D
 * shapes, dashed accents) — but 16:9 (the aspect-video box) and one of
 * three scenery variants picked deterministically from the project slug
 * (FNV-1a), so every project gets its own look without shipping any
 * image files. */

type Variant = "hills" | "skyline" | "waves";

/** FNV-1a hash of the slug → variant pick (new projects mix the set) */
function pickVariant(slug: string): Variant {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return (["hills", "skyline", "waves"] as Variant[])[h % 3];
}

/* ── variant 1: warm hills + rising sun ───────────────────────────────── */

export function HillsArt() {
  return (
    <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="h-full w-full">
      <rect width="640" height="360" fill="#fdf3e3" />
      <circle cx="200" cy="152" r="34" fill="#f4a93c" />
      <circle cx="200" cy="152" r="50" fill="none" stroke="#f4a93c" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="2 10" />
      <polygon points="0,220 150,168 300,214 460,164 640,222 640,360 0,360" fill="#d9c79a" />
      <polygon points="0,268 190,212 380,262 560,208 640,254 640,360 0,360" fill="#a98f5e" />
      <rect x="0" y="342" width="640" height="10" fill="#7c6640" />
      <path d="M60 292 H180" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 10" strokeLinecap="round" opacity="0.4" />
      <path d="M420 306 H560" fill="none" stroke="#fdf3e3" strokeWidth="2" strokeDasharray="6 10" strokeLinecap="round" opacity="0.35" />
      <path d="M120 96 l8 -6 l8 6" fill="none" stroke="#8a7550" strokeWidth="2" strokeLinecap="round" />
      <path d="M162 112 l6.4 -4.8 l6.4 4.8" fill="none" stroke="#8a7550" strokeWidth="2" strokeLinecap="round" />
      <circle cx="560" cy="72" r="4" fill="#f4a93c" />
      <circle cx="528" cy="94" r="2" fill="#f4a93c" opacity="0.6" />
    </svg>
  );
}

/* ── variant 2: city skyline + lit windows ────────────────────────────── */

export function SkylineArt() {
  const buildings = [
    [40, 210, 64], [112, 172, 48], [168, 240, 72], [248, 150, 56],
    [312, 216, 62], [382, 176, 50], [440, 252, 66], [514, 190, 58], [580, 236, 46],
  ] as const;
  return (
    <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="h-full w-full">
      <rect width="640" height="360" fill="#141a30" />
      <circle cx="110" cy="66" r="22" fill="#e6ecf7" />
      <circle cx="104" cy="60" r="4.6" fill="#c3cede" />
      <circle cx="118" cy="70" r="3" fill="#c3cede" />
      <circle cx="250" cy="56" r="2" fill="#dfe6f5" />
      <circle cx="330" cy="88" r="1.6" fill="#dfe6f5" opacity="0.8" />
      <circle cx="420" cy="48" r="2.2" fill="#dfe6f5" />
      <circle cx="560" cy="72" r="1.8" fill="#dfe6f5" opacity="0.8" />
      <path d="M300 40 h8 M304 36 v8" stroke="#dfe6f5" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <path d="M520 96 h7 M523.5 92.5 v7" stroke="#dfe6f5" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
      {buildings.map(([x, y, w], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={360 - y} fill="#1f2848" />
          <line x1={x} y1={y} x2={x} y2={360} stroke="#2d3a63" strokeWidth="1" />
          <rect x={x + 10} y={y + 18} width="8" height="8" fill="#f2af49" opacity={i % 3 === 0 ? 1 : 0.75} />
          <rect x={x + w - 18} y={y + 40} width="8" height="8" fill="#f2af49" opacity={i % 2} />
        </g>
      ))}
      <line x1="0" y1="352" x2="640" y2="352" stroke="#2d3a63" strokeWidth="1.4" />
      <circle cx="6" cy="120" r="2" fill="#dfe6f5" />
      <path d="M40 20 l44 12" stroke="#dfe6f5" strokeWidth="1.2" strokeDasharray="8 7" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

/* ── variant 3: layered waves + orbit rings ───────────────────────────── */

export function WavesArt() {
  return (
    <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="h-full w-full">
      <rect width="640" height="360" fill="#e9f2ef" />
      <circle cx="480" cy="96" r="46" fill="none" stroke="#4d8c7f" strokeWidth="1.6" strokeDasharray="2 9" />
      <circle cx="480" cy="96" r="64" fill="none" stroke="#4d8c7f" strokeWidth="1.4" strokeDasharray="2 12" opacity="0.7" />
      <circle cx="480" cy="96" r="12" fill="#4d8c7f" />
      <path d="M0 220 Q80 190 160 220 T320 220 T480 220 T640 220 V360 H0 Z" fill="#bcd8cf" />
      <path d="M0 260 Q80 228 160 260 T320 260 T480 260 T640 260 V360 H0 Z" fill="#8db8ac" />
      <path d="M0 304 Q80 272 160 304 T320 304 T480 304 T640 304 V360 H0 Z" fill="#5d8f83" />
      <path d="M70 300 H190" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 10" strokeLinecap="round" opacity="0.4" />
      <path d="M400 322 H540" fill="none" stroke="#dfeee9" strokeWidth="2" strokeDasharray="6 10" strokeLinecap="round" opacity="0.35" />
      <path d="M150 90 l8 -6 l8 6" fill="none" stroke="#3f6f63" strokeWidth="2" strokeLinecap="round" />
      <path d="M194 106 l6.4 -4.8 l6.4 4.8" fill="none" stroke="#3f6f63" strokeWidth="2" strokeLinecap="round" />
      <circle cx="90" cy="60" r="2.4" fill="#4d8c7f" />
      <circle cx="64" cy="82" r="1.5" fill="#4d8c7f" opacity="0.6" />
      <path d="M560 250 h9 M564.5 245.5 v9" stroke="#5d8f83" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function ProjectArt({ project }: { project: Project }) {
  const variant = useMemo(() => pickVariant(projectSlug(project.title)), [project.title]);
  if (variant === "hills") return <HillsArt />;
  if (variant === "skyline") return <SkylineArt />;
  return <WavesArt />;
}
