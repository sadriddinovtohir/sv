import { useTranslation } from 'react-i18next'
import { FiCheckCircle } from 'react-icons/fi'
import { GlassPanel } from '@/components/common/GlassPanel'
import { SectionHeading } from '@/components/common/SectionHeading'

const REASONS = ['WHY_1', 'WHY_2', 'WHY_3', 'WHY_4']

export default function WhyChooseMe() {
    const { t } = useTranslation()

    return (
        <GlassPanel className="mb-14 rounded-3xl border-white/6 bg-white/3 p-5 md:p-8">
            <SectionHeading
                className="mb-5"
                title={t('WHY_TITLE')}
                subtitle={t('WHY_SUBTITLE')}
                titleClassName="text-[20px] md:text-2xl text-[#ff4d6d]"
            />

            <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
                {REASONS.map((key) => (
                    <div key={key} className="flex flex-row items-start gap-3">
                        <span className="mt-0.5 shrink-0 text-[#22c55e]">
                            <FiCheckCircle size={18} />
                        </span>
                        <div>
                            <p className="mb-1 text-sm font-bold text-white">
                                {t(`${key}_TITLE`)}
                            </p>
                            <p className="text-[13px] leading-[1.6] text-white/50">
                                {t(`${key}_DESC`)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </GlassPanel>
    )
}
