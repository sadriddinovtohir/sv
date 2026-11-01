import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export default function Notfound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="mt-9 flex flex-col items-center justify-center gap-6 px-4 text-center text-white">
      <h1 className="text-aurora text-[80px] leading-none font-black md:text-[120px]">
        {t('NOTFOUND_404')}
      </h1>
      <p className="text-xl">{t('NOTFOUND_TITLE')}</p>
      <p className="max-w-[400px]">{t('NOTFOUND_DESC')}</p>
      <Button
        variant="brand"
        onClick={() => navigate('/')}
        className="h-auto rounded-[10px] px-8 py-3"
      >
        {t('NOTFOUND_BUTTON')}
      </Button>
    </div>
  );
}
