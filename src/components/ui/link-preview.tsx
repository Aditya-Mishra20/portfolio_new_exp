"use client";

/**
 * LinkPreview — Aceternity UI component (source-owned from
 * ui.aceternity.com/registry/link-preview.json), customized for this project:
 *  - `motion/react` imports → `framer-motion` (already in the stack)
 *  - Trigger upgraded to a real anchor (asChild) so the title navigates
 *  - Card restyled to the project's zinc tokens + caption strip with
 *    clickable source/link buttons
 *  - `isStatic` default planned at call sites; flip to microlink live
 *    screenshots once real project URLs exist (TODO)
 */
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { encode } from "qss";
import React from "react";
import { ArrowUpRight, Github as GithubIcon } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  /** Optional caption under the art (e.g. project host) + live/source links */
  caption?: string;
  githubUrl?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  isStatic = false,
  imageSrc = "",
  caption,
  githubUrl,
}: LinkPreviewProps) => {
  let src;
  if (!isStatic) {
    // TODO: live screenshots via microlink — only for real, reachable URLs
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);

  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    // subtle parallax driven by the pointer across the title
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
    <>
      {/* preload the art so the card doesn't pop in empty on first hover */}
      {isMounted ? (
        <div className="hidden">
          <img src={src} width={width} height={height} alt="" />
        </div>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={120}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger
          asChild
          onMouseMove={handleMouseMove}
          href={url}
        >
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className={cn("text-foreground", className)}
          >
            {children}
          </a>
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
          side="top"
          align="center"
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.85 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 20 },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.85 }}
                className="shadow-xl rounded-md"
                style={{ x: translateX }}
              >
                <div className="block p-1.5 bg-card border border-border rounded-md w-[280px]">
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${caption ?? url}`}
                    className="block overflow-hidden rounded-sm border border-border bg-muted"
                    style={{ fontSize: 0 }}
                  >
                    <img
                      src={isStatic ? imageSrc : src}
                      width={width}
                      height={height}
                      className="w-full h-auto object-cover"
                      alt={`${caption ?? url} preview`}
                    />
                  </a>

                  {/* caption strip: host + clickable source/live buttons */}
                  {(caption || githubUrl || url) && (
                    <div className="flex items-center justify-between px-1 pt-1.5 pb-0.5">
                      <span className="font-mono text-[10px] text-muted-foreground truncate">
                        {caption ?? new URL(url).host}
                      </span>
                      <span className="flex items-center gap-1.5">
                        {githubUrl && (
                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Source"
                            className="flex size-6 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                          >
                            <GithubIcon className="size-3" />
                          </a>
                        )}
                        <a
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Live site"
                          className="flex size-6 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                        >
                          <ArrowUpRight className="size-3" />
                        </a>
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  );
};
