import Header from '../components/Header/Header'
import { Outlet } from 'react-router'
import Footer from '../components/Footer/Footer'
import { Stack, Box } from '@mui/material'

export default function MainLayout() {
    return (
        <Stack justifyContent={"space-between"} minHeight={"100vh"} sx={{ position: 'relative' }}>

            {/* Glassmorphism background orbs */}
            <div className="bg-orb bg-orb-1" />
            <div className="bg-orb bg-orb-2" />
            <div className="bg-orb bg-orb-3" />

            <Stack className='container' sx={{ position: 'relative', zIndex: 1 }}>
                {/* Glass Header */}
                <Box
                    component="header"
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 3,
                        background: 'rgba(13, 0, 7, 0.65)',
                        backdropFilter: 'blur(28px)',
                        WebkitBackdropFilter: 'blur(28px)',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}
                >
                    <Header />
                </Box>

                <Box style={{ height: "60px" }} />

                <main>
                    <Outlet />
                </main>
            </Stack>

            <footer style={{ position: 'relative', zIndex: 1 }}>
                <Footer />
            </footer>
        </Stack>
    )
}
