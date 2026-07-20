import { GlassPanel } from "./GlassPanel"

/** Home page's stats grid cell — a GlassPanel with a big accent-colored number. */
export function StatTile({ value, label, accent }) {
  return (
    <GlassPanel
      accent={accent}
      hover
      className="cursor-default border-(--accent)/12 p-4 text-center md:p-5"
    >
      <div
        className="mb-1 text-[26px] leading-none font-extrabold md:text-[34px]"
        style={{ color: accent, textShadow: `0 0 20px ${accent}60` }}
      >
        {value}
      </div>
      <div className="text-[10px] font-medium tracking-wide text-white/45 md:text-xs">
        {label}
      </div>
    </GlassPanel>
  )
}
