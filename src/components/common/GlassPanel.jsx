import { cn } from "@/lib/utils"

/**
 * Frosted-glass container used across the whole site (project/skill/service
 * cards, stat tiles, the contact form panels, ...). `accent` drives the
 * hover border/glow color via a CSS custom property; pass a border/background
 * utility in `className` to override the resting look (twMerge keeps the
 * last conflicting utility).
 *
 * No backdrop-filter: behind every panel there is only the soft aurora
 * gradient, so blurring it is invisible — but with a dozen cards on screen it
 * was the main source of scroll jank on phones.
 */
export function GlassPanel({
  as: Comp = "div",
  accent,
  hover = false,
  className,
  style,
  children,
  ...props
}) {
  return (
    <Comp
      className={cn(
        "rounded-2xl border border-white/8 bg-white/[0.035] transition-[translate,background-color,border-color,box-shadow] duration-300",
        hover &&
          "spotlight hover:-translate-y-1.5 hover:bg-white/6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)]",
        hover && accent && "hover:border-(--accent)/45",
        className
      )}
      style={accent ? { "--accent": accent, ...style } : style}
      {...props}
    >
      {children}
    </Comp>
  )
}
