import { Box } from '@mui/material'
import Services from '../Services/Services'
import WhyChooseMe from '../WhyChooseMe/WhyChooseMe'

export default function Offer() {
    return (
        <Box className="container" sx={{ pt: { xs: 4, md: 6 }, pb: 4 }}>
            <Services />
            <WhyChooseMe />
        </Box>
    )
}
