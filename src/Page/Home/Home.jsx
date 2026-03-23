import { Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()
  return (
    <div className='container'>
      <Stack marginY={"40px"}>
        {t("HI")}
      </Stack>
    </div>
  )
}
