import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

/** Label + Input/Textarea + error message, reused across every Contact form field. */
export function FormField({ id, label, error, as = "input", className, ...props }) {
  const Comp = as === "textarea" ? Textarea : Input
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className={cn("text-white/65", error && "text-destructive")}>
        {label}
      </Label>
      <Comp
        id={id}
        aria-invalid={!!error}
        className={cn(
          "rounded-xl border-white/12 bg-white/3 text-white placeholder:text-white/40 focus-visible:border-primary focus-visible:ring-primary/30",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
