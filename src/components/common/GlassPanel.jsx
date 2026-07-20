import { cn } from "@/lib/utils"

/**
 * Frosted-glass container used across the whole site (project/skill/service
 * cards, stat tiles, the contact form panels, ...). `accent` drives the
 * hover border/glow color via a CSS custom property; pass a border/background
 * utility in `className` to override the resting look (twMerge keeps the
 * last conflicting utility).
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
        "rounded-2xl border border-white/7 bg-white/4 backdrop-blur-xl transition-all duration-300",
        hover &&
          "hover:-translate-y-2 hover:bg-white/7 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
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
