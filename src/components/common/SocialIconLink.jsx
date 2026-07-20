import { cn } from "@/lib/utils"

/**
 * Circular icon button used for social/channel links (Home's follow row,
 * FloatingContact's channel buttons). Hover swaps the whole circle to a
 * solid `accent` fill.
 */
export function SocialIconLink({
  icon,
  href,
  accent = "#c0103a",
  size = "md",
  tint = false,
  className,
  style,
  ...props
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ "--accent": accent, ...style }}
      className={cn(
        "flex items-center justify-center rounded-full border transition-all duration-300",
        tint
          ? "border-(--accent)/33 bg-[rgba(18,18,28,0.95)] text-(--accent) backdrop-blur-xl"
          : "border-white/8 bg-white/5 text-white/60",
        "hover:-translate-y-0.5 hover:border-(--accent) hover:bg-(--accent) hover:text-white hover:shadow-[0_6px_16px_var(--accent)]",
        size === "sm" ? "h-8.5 w-8.5 md:h-9.5 md:w-9.5" : "h-10.5 w-10.5 md:h-11.5 md:w-11.5",
        className
      )}
      {...props}
    >
      {icon}
    </a>
  )
}
