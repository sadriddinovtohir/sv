import Header from '../components/Header/Header'
import { Outlet } from 'react-router'
import Footer from '../components/Footer/Footer'
import { Stack, Box } from '@mui/material'

export default function MainLayout() {
    return (
        <Stack justifyContent={"space-between"} minHeight={"100vh"}>
            <Stack className='container'>
                {/* Fixed Header */}
                <Box
                    component="header"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 3,
                        backgroundColor:"#22010bff"
                    }}
                >
                    <Header />
                </Box>

                {/* Header balandligiga teng bo'shliq */}
                <Box style={{ height: "60px" }} />

                <main>
                    <Outlet />
                </main>
            </Stack>

            <footer>
                <Footer />
            </footer>
        </Stack>
    )
}