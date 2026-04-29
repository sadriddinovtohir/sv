import { Box, Stack, Typography, Button } from "@mui/material";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

export default function CustomCard({ img, title, desc, tech, giturl, link }) {
    return (
        <Stack
            justifyContent={"space-between"}
            sx={{
                width: 320,
                borderRadius: "20px",
                p: 2,
                height: "480px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                transition: "0.3s",
                "&:hover": {
                    transform: "translateY(-10px)",
                },
            }}
        >
            {/* Image */}
            <div>
                <Box
                    component="img"
                    src={img}
                    alt={title}

                    sx={{
                        height:"130px",
                        width: "100%",
                        borderRadius: "15px",
                        mb: 2,
                    }}
                />

                {/* Title */}
                <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                    {title}
                </Typography>

                {/* Desc */}
                <Typography variant="body2" sx={{ color: "#bbb", mt: 1, mb: 2, fontSize:"12px" }}>
                    {desc}
                </Typography>

                {/* Tech */}
                <Stack direction="row" spacing={1} mb={2} flexWrap={"wrap"} rowGap={"5px"} >
                    {tech.map((item, i) => (
                        <Box
                            key={i}
                            sx={{
                                px: 1.5,
                                py: 0.5,
                                borderRadius: "20px",
                                background: "rgba(255,255,255,0.1)",
                                color: "#ddd",
                                fontSize: "12px",
                            }}
                        >
                            {item}
                        </Box>
                    ))}
                </Stack>
            </div>

            {/* Buttons */}
            <Stack direction="row" justifyContent={"space-around"} gap={"5px"}>
                {giturl ? <a target="_blank" style={{ width: "100px" }} href={giturl}>
                    <Button
                        startIcon={<FaGithub size={17} />}
                        variant="contained"
                        sx={{
                            background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
                            borderRadius: "10px",
                            textTransform: "none",
                            height: "40px",
                            width: "100px",
                        }}
                    >
                        GitHub
                    </Button>
                </a> : null}


                <a target="_blank" style={{ width: "100%" }} href={link}>
                    <Button
                        startIcon={<FiExternalLink size={15} />}
                        variant="contained"
                        sx={{
                            background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
                            borderRadius: "10px",
                            textTransform: "none",
                            height: "40px",
                            width: "100%",
                        }}
                    >
                        Live Demo
                    </Button>
                </a>
            </Stack>
        </Stack>
    );
}