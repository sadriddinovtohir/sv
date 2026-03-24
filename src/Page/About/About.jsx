import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Profiler from "../../assets/img/about.jpg";

export default function About() {
  const { t } = useTranslation();

  return (
    <Stack
      sx={{
        px: { xs: 2, md: 10 },
        pt: 6,
        color: "#fff",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} mb={1}>
        <img
          src={Profiler}
          alt=""
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        />
        <Stack>
          <Typography fontWeight={700}>@tohir</Typography>
          <Typography variant="body2" color="#ccc">
            {t("job")}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={5}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack maxWidth="600px" spacing={1}>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{ color: "#ff4d6d", letterSpacing: "2px" }}
          >
            {t("title")}
          </Typography>

          <Typography color="#ddd">{t("p1")}</Typography>
          <Typography color="#bbb">{t("p2")}</Typography>
          <Typography color="#bbb">{t("p3")}</Typography>
          <Typography color="#bbb">{t("p4")}</Typography>
          <Typography color="#bbb">{t("p5")}</Typography>

          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: "#ff4d6d", mt: 3 }}
          >
            {t("experience")}
          </Typography>

          <Typography color="#ddd">{t("exp_text")}</Typography>
        </Stack>

        <Stack
          sx={{
            p: 2,
            borderRadius: "20px",
            background: "rgba(255,255,255,0.05)",
            boxShadow: "0 0 30px rgba(255,0,80,0.4)",
          }}
        >
          <img
            src={Profiler}
            alt=""
            style={{
              width: "250px",
              borderRadius: "15px",
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}