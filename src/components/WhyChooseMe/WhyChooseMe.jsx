import { useTranslation } from 'react-i18next'
import { FiCheckCircle } from 'react-icons/fi'
import { GlassPanel } from '@/components/common/GlassPanel'
import { SectionHeading } from '@/components/common/SectionHeading'
import { useReveal } from '@/hooks/useReveal'

const REASONS = ['WHY_1', 'WHY_2', 'WHY_3', 'WHY_4']

function Reason({ id }) {
    const { t } = useTranslation()
    const revealRef = useReveal()
    return (
        <div
            ref={revealRef}
            data-reveal=""
            data-reveal-variant="left"
            className="group flex flex-row items-start gap-3 rounded-xl p-2 transition-colors duration-300 hover:bg-white/4"
        >
            <span className="mt-0.5 shrink-0 text-accent transition-transform duration-300 group-hover:scale-125">
                <FiCheckCircle size={18} />
            </span>
            <div>
                <p className="mb-1 text-sm font-bold text-white">
                    {t(`${id}_TITLE`)}
                </p>
                <p className="text-[13px] leading-[1.6] text-white/55">
                    {t(`${id}_DESC`)}
                </p>
            </div>
        </div>
    )
}

export default function WhyChooseMe() {
    const { t } = useTranslation()
    const revealRef = useReveal()

    return (
        <GlassPanel
            ref={revealRef}
            data-reveal=""
            data-reveal-variant="blur"
            className="mb-14 rounded-3xl border-white/8 bg-white/3 p-5 md:p-8"
        >
            <SectionHeading
                className="mb-5"
                title={t('WHY_TITLE')}
                subtitle={t('WHY_SUBTITLE')}
                gradient
                titleClassName="text-[20px] md:text-2xl"
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {REASONS.map((key) => (
                    <Reason key={key} id={key} />
                ))}
            </div>
        </GlassPanel>
    )
}
