import { cn } from "@/lib/utils"

/**
 * Small rounded icon+text badge (location/availability/status pills on Home
 * and Contact, the "UI LOADING..." badge on the boot screen, ...). `accent`
 * can be a real brand color or a neutral `rgba(255,255,255,x)` string — both
 * work since border/background/text all derive from the same CSS variable.
 */
export function Pill({
  as: Comp = "div",
  icon,
  accent = "rgba(255,255,255,0.55)",
  dot = false,
  hover = false,
  className,
  style,
  children,
  ...props
}) {
  return (
    <Comp
      style={{ "--accent": accent, ...style }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-(--accent)/30 bg-(--accent)/8 px-3 py-1.5 text-[13px] font-medium text-(--accent) backdrop-blur-md transition-all duration-300",
        hover && "cursor-pointer hover:border-(--accent) hover:bg-(--accent)/16",
        className
      )}
      {...props}
    >
      {dot && (
        <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-(--accent) shadow-[0_0_8px_var(--accent)]" />
      )}
      {icon}
      {children}
    </Comp>
  )
}
