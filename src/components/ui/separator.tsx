"use client";

/**
 * Separator — shadcn/ui component over @radix-ui/react-separator.
 * Painted via border (not a filled h-px bar): Chromium snaps borders to
 * whole device pixels, so hairlines match the border-painted dividers
 * (divide-y, panel borders) at fractional DPRs (e.g. Windows 125%).
 * Replaces the old dashed DashRule at section seams.
 */
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "border-border shrink-0 data-[orientation=horizontal]:h-0 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:border-t",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-0 data-[orientation=vertical]:border-l",
        className
      )}
      {...props}
    />
  );
}

export { Separator };
