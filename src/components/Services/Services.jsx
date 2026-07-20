import { useTranslation } from 'react-i18next'
import { FiCode, FiServer, FiZap, FiLayout } from 'react-icons/fi'
import { SectionHeading } from '@/components/common/SectionHeading'

const SERVICES = [
    { icon: <FiCode size={22} />,   titleKey: 'SERVICE_FRONTEND_TITLE',  descKey: 'SERVICE_FRONTEND_DESC',  accent: '#ff2d55' },
    { icon: <FiServer size={22} />, titleKey: 'SERVICE_FULLSTACK_TITLE', descKey: 'SERVICE_FULLSTACK_DESC', accent: '#38bdf8' },
    { icon: <FiZap size={22} />,    titleKey: 'SERVICE_AI_TITLE',        descKey: 'SERVICE_AI_DESC',        accent: '#a855f7' },
    { icon: <FiLayout size={22} />,titleKey: 'SERVICE_UIUX_TITLE',      descKey: 'SERVICE_UIUX_DESC',      accent: '#22c55e' },
]

export default function Services() {
    const { t } = useTranslation()

    return (
        <div className="mb-14">
            <SectionHeading
                className="mb-6"
                title={t('SERVICES_TITLE')}
                subtitle={t('SERVICES_SUBTITLE')}
                titleClassName="text-[22px] md:text-[28px]"
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {SERVICES.map((item) => (
                    <div
                        key={item.titleKey}
                        style={{ '--accent': item.accent }}
                        className="rounded-2xl border border-(--accent)/25 bg-white/4 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-(--accent)/55 hover:bg-white/6"
                    >
                        <div
                            className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl bg-(--accent)/18 text-(--accent)"
                        >
                            {item.icon}
                        </div>
                        <p className="mb-2 text-[15px] font-bold text-white">
                            {t(item.titleKey)}
                        </p>
                        <p className="text-[13px] leading-[1.65] text-white/50">
                            {t(item.descKey)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
