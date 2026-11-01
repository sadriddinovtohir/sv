import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/common/Seo'
import Services from '../Services/Services'
import WhyChooseMe from '../WhyChooseMe/WhyChooseMe'

export default function Offer() {
    const { t } = useTranslation()
    return (
        <div className="pt-8 pb-4 md:pt-12">
            <Seo title={t('SERVICES_TITLE')} description={t('SERVICES_TITLE')} />
            <Services />
            <WhyChooseMe />
        </div>
    )
}
