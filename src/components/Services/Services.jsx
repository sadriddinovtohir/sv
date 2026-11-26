import { useTranslation } from 'react-i18next'
import { FiCode, FiServer, FiZap, FiLayout } from 'react-icons/fi'
import { SectionHeading } from '@/components/common/SectionHeading'
import { useReveal } from '@/hooks/useReveal'

const SERVICES = [
    { icon: <FiCode size={22} />,   titleKey: 'SERVICE_FRONTEND_TITLE',  descKey: 'SERVICE_FRONTEND_DESC',  accent: '#5b85ff' },
    { icon: <FiServer size={22} />, titleKey: 'SERVICE_FULLSTACK_TITLE', descKey: 'SERVICE_FULLSTACK_DESC', accent: '#2ee6a6' },
    { icon: <FiZap size={22} />,    titleKey: 'SERVICE_AI_TITLE',        descKey: 'SERVICE_AI_DESC',        accent: '#ffb547' },
    { icon: <FiLayout size={22} />, titleKey: 'SERVICE_UIUX_TITLE',      descKey: 'SERVICE_UIUX_DESC',      accent: '#38bdf8' },
]

function ServiceCard({ item, index }) {
    const { t } = useTranslation()
    const revealRef = useReveal()
    return (
        <div
            ref={revealRef}
            data-reveal=""
            data-reveal-variant="zoom"
            style={{ '--accent': item.accent }}
            className="spotlight tilt beam-border group rounded-2xl border border-(--accent)/25 bg-white/4 p-5 hover:-translate-y-1 hover:border-(--accent)/55 hover:bg-white/6"
        >
            <div className="mb-3.5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--accent)/18 text-(--accent) transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12">
                    {item.icon}
                </div>
                <span className="font-mono text-xs font-bold text-white/20 transition-colors duration-300 group-hover:text-(--accent)">
                    {String(index + 1).padStart(2, '0')}
                </span>
            </div>
            <p className="mb-2 text-[15px] font-bold text-white">
                {t(item.titleKey)}
            </p>
            <p className="text-[13px] leading-[1.65] text-white/55">
                {t(item.descKey)}
            </p>
        </div>
    )
}

export default function Services() {
    const { t } = useTranslation()

    return (
        <div className="mb-14">
            <SectionHeading
                className="mb-6"
                title={t('SERVICES_TITLE')}
                subtitle={t('SERVICES_SUBTITLE')}
                gradient
                titleClassName="text-[22px] md:text-[28px]"
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {SERVICES.map((item, i) => (
                    <ServiceCard key={item.titleKey} item={item} index={i} />
                ))}
            </div>
        </div>
    )
}
