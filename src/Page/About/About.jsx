import { useTranslation } from "react-i18next";
import Profiler from "../../assets/img/about.webp";
import AboutProfile from "../../assets/img/About_Profile.webp";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="px-4 pt-6 text-white md:px-10">
      <div className="mb-1 flex flex-row items-center gap-4">
        <img src={Profiler} alt="" className="h-12.5 w-12.5 rounded-full" />
        <div className="flex flex-col">
          <p className="font-bold">@tohir</p>
          <p className="text-sm text-[#ccc]">{t("job")}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
        <div className="flex max-w-[600px] flex-col gap-2">
          <p className="text-2xl font-extrabold tracking-widest text-[#ff4d6d]">
            {t("title")}
          </p>

          <p className="text-[#ddd]">{t("p1")}</p>
          <p className="text-[#bbb]">{t("p2")}</p>
          <p className="text-[#bbb]">{t("p3")}</p>
          <p className="text-[#bbb]">{t("p4")}</p>
          <p className="text-[#bbb]">{t("p5")}</p>
          <p className="mt-1 rounded-xl border border-[#22c55e]/20 bg-[#22c55e]/6 px-4 py-3 text-sm leading-[1.7] text-[#e4e4e7]">
            ✨ {t("p6")}
          </p>

          <p className="mt-3 text-xl font-bold text-[#ff4d6d]">
            {t("experience")}
          </p>

          <p className="text-[#ddd]">{t("exp_text")}</p>
        </div>

        <div className="rounded-2xl bg-white/5 p-4 shadow-[0_0_30px_rgba(255,0,80,0.4)]">
          <img
            src={AboutProfile}
            alt=""
            className="w-[180px] max-w-full rounded-[15px] sm:w-[220px] md:w-[250px]"
          />
        </div>
      </div>
    </div>
  );
}
