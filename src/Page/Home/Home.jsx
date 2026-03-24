import { Stack, Typography, Button, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { COLOR } from '../../config/ui/color'
import { CiLocationOn } from 'react-icons/ci'
import { FaArrowRight, FaLaptop, FaPlay, FaTelegram } from 'react-icons/fa'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import profileImg from '../../assets/img/about.jpg'
import { Link } from 'react-router-dom'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className='container'>
      <Stack
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems={'center'}
        justifyContent={'space-between'}
        marginTop={'30px'}
        marginBottom={"10px"}
        gap={'40px'}
      >
        {/* LEFT SIDE */}
        <Stack maxWidth={'550px'}>
          <Typography variant='h3' fontWeight={'700'} marginY={'15px'} color={'white'}>
            {t("HI")}
          </Typography>

          <Typography variant='h4' style={{ color: COLOR.secondText }} fontWeight={800} mb={'15px'}>
            Frontend Developer
          </Typography>
          
          <Typography style={{ color: COLOR.colorsm, lineHeight: 1.7 }} mb={'25px'}>
            {t("I")}
          </Typography>

          {/* Location & Available */}
          <Stack flexDirection={'row'} gap={'25px'} alignItems={'center'} mb={'30px'}>
            <Stack flexDirection={'row'} gap={'5px'} alignItems={'center'} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
              <CiLocationOn size={18} />
              {t("Loaction")}
            </Stack>
            <Stack flexDirection={'row'} gap={'5px'} alignItems={'center'} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
              <FaLaptop size={18} />
              {t("Now")}
            </Stack>
          </Stack>

          {/* Buttons */}
          <Stack flexDirection={'row'} gap={'15px'} mb={'35px'} flexWrap={'wrap'}>
            <Link to={"/contact"}>
              <Button
                variant='contained'
                endIcon={<FaArrowRight size={17} fontWeight={400} />}

                style={{
                  backgroundColor: COLOR.secondText,
                  color: 'white',
                  borderRadius: '25px',
                  padding: '10px 24px',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                {t("Hire")}
              </Button>
            </Link>

            <Link target='_black' to={"https://drive.google.com/file/d/1RFFDrtltvwii3hLzHM4FH4YADf0htNI5/view?usp=drive_link"} >
              <Button
                variant='outlined'
                startIcon={<FaArrowRight size={20} />}

                style={{
                  borderColor: COLOR.secondText,
                  color: COLOR.secondText,
                  borderRadius: '25px',
                  padding: '10px 24px',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                {t("CV")}
              </Button>
            </Link>
          </Stack>

          {/* Divider */}
          <Box style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }} />

          {/* Social Links */}
          <Stack flexDirection={'row'} gap={'20px'} alignItems={'center'}>
            <Typography style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
              Follow me:
            </Typography>
            {[
              { icon: <FaGithub size={22} />, href: "https://github.com/sadriddinovtohir" },
              { icon: <FaTelegram size={22} />, href: "https://t.me/tohir_sadriddinov" },
              { icon: <FaLinkedin size={22} />, href: 'https://www.linkedin.com/in/tohirbek-sadriddinov-dev/' },
              { icon: <FaInstagram size={22} />, href: 'https://www.instagram.com/tohirbek_sadriddinov/' },
              { icon: <FaPlay size={22} />, href: 'https://vercel.com/sadriddinovtohirs-projects' },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target='_blank'
                rel='noreferrer'
                style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              >
                {item.icon}
              </a>
            ))}
          </Stack>
        </Stack>

        {/* RIGHT SIDE - Image */}
        <Box
          style={{
            width: '420px',
            height: '480px',
            borderRadius: '20px',
            overflow: 'hidden',
            flexShrink: 0,
            border: '2px solid rgba(255,255,255,0.1)',
          }}
        >
          <img
            src={profileImg}
            alt='profile'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      </Stack>
    </div>
  )
}