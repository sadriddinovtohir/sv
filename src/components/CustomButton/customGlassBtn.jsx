import React from "react";
import Button from "@mui/material/Button";

function GlassButton({ children, startIcon, }) {
    return (
        <Button
            sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                padding: "8px 16px",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                background: "rgba(135, 57, 57, 0.1)", // shaffof qizil kabi
                backdropFilter: "blur(10px)", // blur effekti
                transition: "0.3s",
                "&:hover": {
                    transform: "scale(1.05)",
                    background: "rgba(135, 57, 57, 0.2)",
                },
            }}
            startIcon={startIcon}

        >
            {children}
        </Button>
    );
}

export default GlassButton;