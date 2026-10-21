"use client";

import { useEffect, useState } from "react";
import { profile, ui } from "@/content/site";
import { usePageViews } from "@/components/providers";
import { Separator } from "@/components/ui/separator";

/**
 * Footer — Tiwari-style art band: inset art panel (same box language as the
 * hero art) with the views counter, live date/time and agent links rendered
 * on a scrim over the art. Placeholder art — TODO: your own.
 */

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

function useClock(): string | null {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      weekday: "short", month: "short", day: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
      timeZoneName: "short",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function FooterArt() {
  // abstract landscape placeholder (rocks + river + trees silhouette)
  return (
    <svg viewBox="0 0 880 300" className="h-auto w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="880" height="300" fill="#5f4631" />
      <circle cx="620" cy="70" r="46" fill="#f59e0b" opacity="0.85" />
      <path d="M0 0 L880 0 L880 90 Q560 40 0 96 Z" fill="#7c3d17" opacity="0.8" />
      {/* trees */}
      {Array.from({ length: 9 }).map((_, i) => (
        <g key={i} opacity={0.9}>
          <rect x={40 + i * 96} y="58" width="5" height="70" fill="#3b2412" />
          <ellipse cx={42.5 + i * 96} cy="52" rx="26" ry="22" fill={i % 2 ? "#b45309" : "#9a3412"} />
        </g>
      ))}
      {/* river */}
      <path d="M360 300 C340 220 430 200 420 160 C415 140 470 120 500 132 L660 300 Z" fill="#fcd34d" opacity="0.35" />
      {/* rocks */}
      {[
        [90, 250, 60], [210, 268, 46], [700, 252, 64], [820, 272, 44],
      ].map(([cx, cy, rx], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={rx * 0.55} fill="#44403c" />
      ))}
      {/* scrim for legibility */}
      <rect width="880" height="300" fill="url(#scrim)" />
      <defs>
        <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#09090b" stopOpacity="0.25" />
          <stop offset="1" stopColor="#09090b" stopOpacity="0.65" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Footer() {
  const views = usePageViews("/");
  const now = useClock();
  const agentLinks = ui.footer.agentLinks;

  return (
    <footer>
      {/* pb keeps the footer clear of the fixed dock pill */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 pb-32 md:pb-24">
        <div className="relative">
          <Separator />
          {/* art panel (same box design as the hero art) */}
          <div className="px-5 md:px-8 py-8">
            <div className="relative w-full overflow-hidden rounded-lg shadow-ax p-1.5 bg-muted/15">
              <div className="relative h-full w-full border rounded-md overflow-hidden">
                <FooterArt />
                {/* overlay: visitor count + live clock + copyright row */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-center px-4 pb-6">
                  <p className="text-sm font-medium text-white drop-shadow">
                    You're the{" "}
                    <span className="font-semibold">
                      {views === null ? "…" : ordinal(views)}
                    </span>{" "}
                    visitor
                  </p>
                  <p className="font-mono text-[11px] text-white/85 drop-shadow">{now ?? ""}</p>
                </div>
                {/* bottom copyright strip over the scrim */}
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 px-3 py-2 text-[11px] text-white/85">
                  <span>
                    © {new Date().getFullYear()}{" "}
                    <a href="#" className="underline underline-offset-2 decoration-white/40">{profile.name}</a>
                    . {ui.footer.copyrightNote}
                  </span>
                  {agentLinks.map((l) => (
                    <a key={l.label} href={l.href} className="underline underline-offset-2 decoration-white/40 hover:text-white">
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
