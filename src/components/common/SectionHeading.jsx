import { cn } from "@/lib/utils"

/**
 * Title + subtitle block reused at the top of Projects/Skills/Services/
 * WhyChooseMe/Contact. Pass `gradient` for the animated aurora gradient text,
 * or a color via `titleClassName` for a flat heading.
 */
export function SectionHeading({
  title,
  subtitle,
  gradient = false,
  className,
  titleClassName,
}) {
  return (
    <div className={cn("mb-5 flex flex-col gap-1", className)}>
      <h2
        className={cn(
          "text-xl leading-tight font-extrabold tracking-tight text-white md:text-2xl",
          gradient && "text-aurora",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && <p className="text-[13px] text-white/60 md:text-[15px]">{subtitle}</p>}
    </div>
  )
}
