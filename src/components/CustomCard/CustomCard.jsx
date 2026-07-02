import { useState } from "react";
import { Box, Stack, Typography, Button, Dialog, DialogContent, IconButton, Chip } from "@mui/material";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink, FiX } from "react-icons/fi";
import { MdAutoAwesome } from "react-icons/md";

export default function CustomCard({ img, title, desc, tech, giturl, link, badge }) {
    const [open, setOpen] = useState(false);

    const visibleTech = Array.isArray(tech) ? tech.slice(0, 4) : [];
    const extraCount = Array.isArray(tech) ? tech.length - 4 : 0;

    return (
        <>
            {/* ===== Card ===== */}
            <Stack
                onClick={() => setOpen(true)}
                sx={{
                    width: "100%",
                    borderRadius: { xs: "14px", sm: "20px" },
                    p: { xs: 1.25, sm: 2 },
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    transition: "all 0.3s ease",
                    animation: "fadeInUp 0.5s ease forwards",
                    cursor: "pointer",
                    "&:hover": {
                        transform: "translateY(-8px)",
                        borderColor: "rgba(192,16,58,0.4)",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(192,16,58,0.15)",
                    },
                }}
            >
                {/* Image + Badge */}
                <Box sx={{ position: "relative", mb: { xs: 1, sm: 1.5 } }}>
                    <Box
                        component="img"
                        src={img}
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="150"
                        sx={{
                            height: { xs: "100px", sm: "150px" }, width: "100%",
                            borderRadius: { xs: "10px", sm: "14px" },
                            objectFit: "contain", display: "block",
                            background: "rgba(0,0,0,0.25)",
                        }}
                    />
                    {badge && (
                        <Box sx={{
                            position: "absolute", top: 6, right: 6,
                            display: "flex", alignItems: "center", gap: "4px",
                            background: "rgba(34,197,94,0.15)", backdropFilter: "blur(10px)",
                            border: "1px solid rgba(34,197,94,0.4)", borderRadius: "20px",
                            px: { xs: "6px", sm: "10px" }, py: "4px",
                        }}>
                            <MdAutoAwesome size={10} color="#22c55e" />
                            <Typography sx={{ fontSize: { xs: "8px", sm: "10px" }, color: "#22c55e", fontWeight: 700 }}>
                                {badge}
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* Title */}
                <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: { xs: "12.5px", sm: "15px" }, mb: 0.5, lineHeight: 1.3 }}>
                    {title}
                </Typography>

                {/* Truncated description — 3 lines (2 on mobile) */}
                <Typography sx={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: { xs: "10.5px", sm: "12px" },
                    lineHeight: 1.55,
                    mb: { xs: 1, sm: 1.5 },
                    display: "-webkit-box",
                    WebkitLineClamp: { xs: 2, sm: 3 },
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                }}>
                    {desc}
                </Typography>

                {/* Tech — max 4 tags + counter */}
                <Stack direction="row" flexWrap="wrap" gap={{ xs: "4px", sm: "6px" }} mb={{ xs: 1, sm: 1.5 }}>
                    {visibleTech.map((item, i) => (
                        <Box key={i} sx={{
                            px: { xs: 0.8, sm: 1.2 }, py: 0.3, borderRadius: "20px",
                            background: "rgba(255,255,255,0.07)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.65)",
                            fontSize: { xs: "9px", sm: "11px" }, fontWeight: 500,
                        }}>
                            {item}
                        </Box>
                    ))}
                    {extraCount > 0 && (
                        <Box sx={{
                            px: { xs: 0.8, sm: 1.2 }, py: 0.3, borderRadius: "20px",
                            background: "rgba(192,16,58,0.15)",
                            border: "1px solid rgba(192,16,58,0.3)",
                            color: "#ff2d55",
                            fontSize: { xs: "9px", sm: "11px" }, fontWeight: 600,
                        }}>
                            +{extraCount}
                        </Box>
                    )}
                </Stack>

                {/* Ko'proq hint */}
                <Typography sx={{
                    fontSize: { xs: "10.5px", sm: "12px" }, color: "#ff2d55", fontWeight: 600,
                    opacity: 0.8, letterSpacing: "0.2px",
                }}>
                    Ko'proq ko'rish →
                </Typography>
            </Stack>

            {/* ===== Modal ===== */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="sm"
                fullWidth
                onClick={(e) => e.stopPropagation()}
                PaperProps={{
                    sx: {
                        background: "rgba(13, 0, 7, 0.92)",
                        backdropFilter: "blur(32px)",
                        WebkitBackdropFilter: "blur(32px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "24px",
                        boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
                        overflow: "hidden",
                        height: { xs: "88vh", sm: "640px" },
                        maxHeight: "90vh",
                        display: "flex",
                        flexDirection: "column",
                    },
                }}
            >
                <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
                    {/* Modal Image */}
                    <Box sx={{ position: "relative", flexShrink: 0 }}>
                        <Box
                            component="img"
                            src={img}
                            alt={title}
                            sx={{
                                width: "100%", height: { xs: "200px", sm: "400px" },
                                objectFit: "contain", display: "block",
                                background: "rgba(0,0,0,0.35)",
                            }}
                        />
                        {/* Gradient overlay on image */}
                        <Box sx={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(to bottom, transparent 40%, rgba(13,0,7,0.95) 100%)",
                        }} />
                        {/* Close button */}
                        <IconButton
                            onClick={() => setOpen(false)}
                            sx={{
                                position: "absolute", top: 12, right: 12,
                                background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
                                color: "#fff", width: 36, height: 36,
                                "&:hover": { background: "#c0103a" },
                            }}
                        >
                            <FiX size={18} />
                        </IconButton>
                        {/* Badge in modal */}
                        {badge && (
                            <Box sx={{
                                position: "absolute", top: 12, left: 12,
                                display: "flex", alignItems: "center", gap: "5px",
                                background: "rgba(34,197,94,0.15)", backdropFilter: "blur(10px)",
                                border: "1px solid rgba(34,197,94,0.4)", borderRadius: "20px",
                                px: "12px", py: "5px",
                            }}>
                                <MdAutoAwesome size={13} color="#22c55e" />
                                <Typography sx={{ fontSize: "12px", color: "#22c55e", fontWeight: 700 }}>
                                    {badge}
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    {/* Modal Content */}
                    <Box sx={{ px: 3, pb: 3, pt: 2 }}>
                        {/* Title */}
                        <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "20px", mb: 1.5 }}>
                            {title}
                        </Typography>

                        {/* Full Description */}
                        <Typography sx={{
                            color: "rgba(255,255,255,0.65)",
                            fontSize: "13.5px",
                            lineHeight: 1.75,
                            mb: 2.5,
                        }}>
                            {desc}
                        </Typography>

                        {/* All Tech tags */}
                        <Stack direction="row" flexWrap="wrap" gap="8px" mb={3}>
                            {Array.isArray(tech) && tech.map((item, i) => (
                                <Box key={i} sx={{
                                    px: 1.5, py: 0.5, borderRadius: "20px",
                                    background: "rgba(255,255,255,0.08)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    color: "rgba(255,255,255,0.75)",
                                    fontSize: "12px", fontWeight: 500,
                                }}>
                                    {item}
                                </Box>
                            ))}
                        </Stack>

                        {/* Buttons */}
                        <Stack direction="row" gap={1.5}>
                            {giturl && (
                                <a target="_blank" href={giturl} style={{ flex: 1 }} onClick={(e) => e.stopPropagation()}>
                                    <Button fullWidth startIcon={<FaGithub size={15} />} variant="outlined" sx={{
                                        borderColor: "rgba(255,255,255,0.15)",
                                        color: "rgba(255,255,255,0.75)",
                                        borderRadius: "12px",
                                        textTransform: "none",
                                        height: "42px", fontSize: "14px",
                                        "&:hover": { borderColor: "#ff2d55", color: "#ff2d55", background: "rgba(255,45,85,0.06)" },
                                    }}>
                                        GitHub
                                    </Button>
                                </a>
                            )}
                            <a target="_blank" href={link} style={{ flex: 1 }} onClick={(e) => e.stopPropagation()}>
                                <Button fullWidth startIcon={<FiExternalLink size={14} />} variant="contained" sx={{
                                    background: "linear-gradient(135deg, #c0103a, #ff2d55)",
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    height: "42px", fontSize: "14px", fontWeight: 600,
                                    boxShadow: "0 4px 14px rgba(192,16,58,0.4)",
                                    "&:hover": { boxShadow: "0 6px 20px rgba(192,16,58,0.6)" },
                                }}>
                                    Live Demo
                                </Button>
                            </a>
                        </Stack>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}
