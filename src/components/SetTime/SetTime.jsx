import { COLOR } from '../../config/ui/color'
import { Roundedspan } from '../../config/ui/style'
import { Stack, Typography } from '@mui/material';
import imgProfile from "../../assets/img/about.jpg"

const s = (dir, delay) => ({
    opacity: 0,
    animation: `anim-${dir} 0.6s ease forwards ${delay}s, anim-${dir}-out 0.6s ease forwards 3.8s`,
});
const styles = `
    @keyframes anim-top    { from { opacity:0; transform:translateY(-40px) } to { opacity:1; transform:none } }
    @keyframes anim-left   { from { opacity:0; transform:translateX(-50px) } to { opacity:1; transform:none } }
    @keyframes anim-bottom { from { opacity:0; transform:translateY( 40px) } to { opacity:1; transform:none } }
    @keyframes anim-right  { from { opacity:0; transform:translateX( 60px) } to { opacity:1; transform:none } }

    @keyframes anim-top-out    { from { opacity:1; transform:none } to { opacity:0; transform:translateY(-40px) } }
    @keyframes anim-left-out   { from { opacity:1; transform:none } to { opacity:0; transform:translateX(-50px) } }
    @keyframes anim-bottom-out { from { opacity:1; transform:none } to { opacity:0; transform:translateY( 40px) } }
    @keyframes anim-right-out  { from { opacity:1; transform:none } to { opacity:0; transform:translateX( 60px) } }

    @media (max-width: 1099px) {
        .hide-mobile { display: none !important; }
    }
    @media (min-width: 768px) and (max-width: 1100px) {
        .portfolio-card { justify-content: center !important; }
    }
`;

export default function SetTime() {
    return (
        <div style={{ paddingX: "10px" }}>
            <style>{styles}</style>
            <Stack style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Stack className="portfolio-card" flexDirection={"row"} flexWrap={"wrap"} style={{ padding: "50px", boxShadow: COLOR.shadow, borderRadius: "30px", ...s("top", 0) }}>
                    <div>
                        <Stack>
                            <Stack flexDirection="row" style={s("top", 0.7)}>
                                <Roundedspan>UI LOADING...</Roundedspan>
                            </Stack>
                            <Typography style={s("left", 1.75)} marginY="10px" variant="h3" maxWidth="300px" fontWeight={700}>
                                Welcome to my Portfolio Website
                            </Typography>
                            <Typography style={s("left", 1.9)} marginBottom="20px" variant="p" maxWidth="500px" fontWeight={200} sx={{ opacity: 0.5 }}>
                                Building modern, reliable, and fast digital experiences with a focus on clean UI and solid engineering.
                            </Typography>
                            <Typography className="hide-mobile" style={s("left", 2.05)} marginBottom="20px" variant="p" fontWeight={700} fontSize="15px" color="rgba(205,12,12,0.729)">
                                LIVE STATUS
                            </Typography>
                        </Stack>

                        <Stack style={{ maxWidth: "400px" }}>

                            <Typography
                                style={s("bottom", 2.2)}
                                fontSize="12px"
                                sx={{ opacity: 0.5 }}
                            >
                                Loading experience...
                            </Typography>

                            <div style={{
                                ...s("bottom", 2.35),
                                width: "100%",
                                height: "4px",
                                background: "rgba(255,255,255,0.1)",
                                borderRadius: "10px",
                                overflow: "hidden"
                            }}>
                                <div style={{
                                    width: "100%",
                                    height: "100%",
                                    background: "red",
                                    animation: "load 4s linear forwards"
                                }} />
                            </div>

                        </Stack>
                    </div>
                    <img
                        className="hide-mobile"
                        style={{
                            cursor: "pointer",
                            maxWidth: "500px",
                            borderRadius: "20px",
                            boxShadow: "0 4px 15px rgba(255, 0, 0, 0.7)",
                            ...s("right", 1.8)
                        }}
                        src={imgProfile}
                        alt="my photo"
                    />
                </Stack>
            </Stack>
        </div>
    );
}