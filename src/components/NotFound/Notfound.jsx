import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export default function Notfound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="mt-9 flex flex-col items-center justify-center gap-6 px-4 text-center text-white">
      <p className="text-[80px] leading-none font-bold md:text-[120px]">
        {t('NOTFOUND_404')}
      </p>
      <p className="text-xl">{t('NOTFOUND_TITLE')}</p>
      <p className="max-w-[400px]">{t('NOTFOUND_DESC')}</p>
      <Button
        variant="brand"
        onClick={() => navigate('/')}
        className="h-auto rounded-[10px] bg-gradient-to-br from-[#ff416c] to-[#ff4b2b] px-8 py-3"
      >
        {t('NOTFOUND_BUTTON')}
      </Button>
    </div>
  );
}
