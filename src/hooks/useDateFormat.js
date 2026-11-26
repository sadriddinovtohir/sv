import { useMemo } from "react"
import { useTranslation } from "react-i18next"

/** Formats an ISO date as a long, localized date in the current UI language. */
export function useDateFormat() {
  const { i18n } = useTranslation()
  return useMemo(() => {
    const fmt = new Intl.DateTimeFormat(i18n.language, { year: "numeric", month: "long", day: "numeric" })
    return (iso) => {
      const d = new Date(iso)
      return Number.isNaN(d.getTime()) ? iso : fmt.format(d)
    }
  }, [i18n.language])
}
