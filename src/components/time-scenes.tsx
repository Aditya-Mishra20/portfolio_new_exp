"use client";

import { useEffect, useState } from "react";

/** Geometric time-of-day hero art — morning / evening / night scenes drawn
 * entirely in SVG (no assets, template-safe: nothing to license). The active
 * scene follows the VISITOR'S LOCAL CLOCK, crossfading when the slot flips. */

type Slot = "morning" | "evening" | "night";

/** local hour → scene slot: 5–12 morning · 12–18 evening · 18–5 night */
function slotForHour(h: number): Slot {
  if (h >= 5 && h < 12) return "morning";
  if (h >= 12 && h < 18) return "evening";
  return "night";
}

/* ── shared bits ─────────────────────────────────────────────────────────── */

function Bird({ x, y, s = 1, tone }: { x: number; y: number; s?: number; tone: string }) {
  return (
    <path
      d={`M${x} ${y} l${6 * s} ${-4 * s} l${6 * s} ${4 * s}`}
      fill="none"
      stroke={tone}
      strokeWidth={1.4}
      strokeLinecap="round"
    />
  );
}

function Dashes({ d, tone, opacity = 0.4 }: { d: string; tone: string; opacity?: number }) {
  return <path d={d} fill="none" stroke={tone} strokeWidth={1.6} strokeDasharray="5 9" strokeLinecap="round" opacity={opacity} />;
}

/* ── morning: pale blue sky, rising amber sun, cool hills, mist ─────────── */

function MorningArt() {
  return (
    <svg viewBox="0 0 640 220" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Geometric morning landscape" className="h-full w-full">
      {/* sky */}
      <rect width="640" height="220" fill="#e8f1fa" />
      {/* horizon glow band */}
      <rect x="0" y="96" width="640" height="52" fill="#f7ecd2" />
      {/* rising sun + dashed halo ring */}
      <circle cx="212" cy="116" r="26" fill="#f2af49" />
      <circle cx="212" cy="116" r="38" fill="none" stroke="#f2af49" strokeOpacity="0.45" strokeWidth="1.6" strokeDasharray="2 8" />
      {/* hills, far → near */}
      <polygon points="0,140 120,102 238,132 356,100 470,134 590,108 640,126 640,220 0,220" fill="#bfd6ea" />
      <polygon points="0,168 150,128 300,162 448,126 640,166 640,220 0,220" fill="#93b2d4" />
      <polygon points="0,196 180,158 340,190 520,156 640,184 640,220 0,220" fill="#647fa6" />
      <rect x="0" y="214" width="640" height="6" fill="#55708f" />
      {/* mist strip */}
      <rect x="0" y="118" width="640" height="7" fill="#ffffff" opacity="0.28" />
      <rect x="0" y="150" width="640" height="5" fill="#ffffff" opacity="0.18" />
      {/* birds + ground accents */}
      <Bird x={150} y={64} tone="#4a6484" />
      <Bird x={186} y={78} s={0.8} tone="#4a6484" />
      <Bird x={470} y={54} s={0.9} tone="#4a6484" />
      <Dashes d="M60 186 H180" tone="#ffffff" />
      <Dashes d="M470 198 H600" tone="#dfe8f2" />
      <circle cx="596" cy="38" r="3" fill="#f2af49" />
      <circle cx="570" cy="52" r="1.6" fill="#f2af49" opacity="0.6" />
    </svg>
  );
}

/* ── evening: peach sky, low coral sun sinking behind plum hills ────────── */

function EveningArt() {
  return (
    <svg viewBox="0 0 640 220" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Geometric evening landscape" className="h-full w-full">
      {/* sky */}
      <rect width="640" height="220" fill="#fbd9b4" />
      {/* lower warm band */}
      <rect x="0" y="106" width="640" height="46" fill="#f5a86b" opacity="0.55" />
      {/* sinking sun (hills overlap it) */}
      <circle cx="452" cy="146" r="30" fill="#f4713c" />
      <circle cx="452" cy="146" r="44" fill="none" stroke="#f4713c" strokeOpacity="0.4" strokeWidth="1.6" strokeDasharray="2 8" />
      {/* hills, far → near (warm plum ramp) */}
      <polygon points="0,142 130,108 260,138 400,106 520,140 640,112 640,220 0,220" fill="#b98a92" />
      <polygon points="0,172 168,132 330,168 500,130 640,170 640,220 0,220" fill="#8a5e78" />
      <polygon points="0,198 190,162 360,194 540,158 640,188 640,220 0,220" fill="#5c3f58" />
      <rect x="0" y="214" width="640" height="6" fill="#46304a" />
      {/* birds heading home + accents */}
      <Bird x={96} y={58} tone="#7a4f66" />
      <Bird x={132} y={72} s={0.8} tone="#7a4f66" />
      <Bird x={510} y={48} s={0.9} tone="#7a4f66" />
      <Dashes d="M80 188 H200" tone="#fbd9b4" opacity={0.35} />
      <Dashes d="M430 200 H590" tone="#c99aa7" opacity={0.4} />
      <circle cx="112" cy="40" r="2.6" fill="#f4713c" opacity="0.7" />
      <circle cx="86" cy="52" r="1.5" fill="#f4713c" opacity="0.5" />
    </svg>
  );
}

/* ── night: deep navy, moon + stars, navy hills, lake with cabin ────────── */

function NightArt() {
  return (
    <svg viewBox="0 0 640 220" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Geometric night landscape" className="h-full w-full">
      {/* sky */}
      <rect width="640" height="220" fill="#0c1228" />
      {/* moon + craters */}
      <circle cx="146" cy="62" r="24" fill="#e6ecf7" />
      <circle cx="140" cy="56" r="5" fill="#c3cede" />
      <circle cx="154" cy="68" r="3.4" fill="#c3cede" />
      <circle cx="148" cy="72" r="2" fill="#c3cede" />
      {/* stars: dots + tiny plus signs + one shooting dash */}
      <circle cx="300" cy="40" r="2" fill="#dfe6f5" />
      <circle cx="356" cy="66" r="1.5" fill="#dfe6f5" opacity="0.8" />
      <circle cx="420" cy="34" r="2.2" fill="#dfe6f5" />
      <circle cx="508" cy="58" r="1.5" fill="#dfe6f5" opacity="0.7" />
      <circle cx="580" cy="40" r="2" fill="#dfe6f5" opacity="0.9" />
      <path d="M330 52 h8 M334 48 v8" stroke="#dfe6f5" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
      <path d="M546 78 h7 M549.5 74.5 v7" stroke="#dfe6f5" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
      <path d="M238 30 l52 14" stroke="#dfe6f5" strokeWidth="1.3" strokeDasharray="9 7" strokeLinecap="round" opacity="0.5" />
      {/* mountains, far → near */}
      <polygon points="0,140 140,96 280,132 420,94 560,134 640,112 640,220 0,220" fill="#161d3d" />
      <polygon points="0,172 170,128 340,166 510,126 640,170 640,220 0,220" fill="#1e2650" />
      <rect x="0" y="200" width="640" height="20" fill="#131a38" />
      {/* lake + ripple dashes reflecting the moon */}
      <rect x="0" y="196" width="640" height="24" fill="#0e1634" />
      <line x1="0" y1="196" x2="640" y2="196" stroke="#314070" strokeWidth="1.4" />
      <Dashes d="M120 206 H180" tone="#7f92c6" opacity={0.5} />
      <Dashes d="M140 214 H200" tone="#7f92c6" opacity={0.3} />
      {/* tiny lakeside cabin, one warm lit window */}
      <rect x="548" y="186" width="34" height="14" fill="#0a0f24" stroke="#314070" strokeWidth="1.2" />
      <polygon points="544,186 565,172 586,186" fill="#0a0f24" stroke="#314070" strokeWidth="1.2" />
      <rect x="560" y="190" width="7" height="7" fill="#f2af49" />
    </svg>
  );
}

/* ── the layer: mounts all three stacked, fades the active one in ───────── */

const SCENES: { slot: Slot; El: () => React.ReactNode }[] = [
  { slot: "morning", El: MorningArt },
  { slot: "evening", El: EveningArt },
  { slot: "night", El: NightArt },
];

export function TimeScenes({ visible }: { visible: boolean }) {
  // null until mounted — pre-hydration shows the clean panel background,
  // then the clock-picked scene fades in (keeps SSR output deterministic)
  const [slot, setSlot] = useState<Slot | null>(null);
  useEffect(() => {
    const update = () => setSlot(slotForHour(new Date().getHours()));
    // re-check each minute so the scene follows real time into dusk / night
    const tick = () => setSlot(slotForHour(new Date().getHours()));
    update();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ${
        visible && slot ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {SCENES.map(({ slot: s, El }) => (
        <div
          key={s}
          className={`absolute inset-0 transition-opacity duration-700 ${slot === s ? "opacity-100" : "opacity-0"}`}
        >
          <El />
        </div>
      ))}
    </div>
  );
}
