import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiBriefcase, FiCpu } from "react-icons/fi";
import { Seo } from "@/components/common/Seo";
import { Pill } from "@/components/common/Pill";
import { GlassPanel } from "@/components/common/GlassPanel";
import { StatTile } from "@/components/common/StatTile";
import { useReveal } from "@/hooks/useReveal";
import { totalSkillsCount } from "../../data/skillsData";
import { PROJECTS } from "../Projects/projectsData";

// Code card content, split into colored tokens so typing can stop mid-token.
const K = "text-[#7fa2ff]"; // keyword / punctuation
const P = "text-white/80"; // property
const S = "text-accent"; // string
const B = "text-glow"; // boolean
const CODE = [
  [["const ", K], ["tohir", P], [" = {", K]],
  [["  role: ", P], ['"Software Engineer"', S], [",", K]],
  [["  based: ", P], ['"Tashkent, UZ"', S], [",", K]],
  [["  stack: ", P], ["[", K], ['"React"', S], [", ", K], ['"Node.js"', S], [", ", K], ['"PostgreSQL"', S], ["],", K]],
  [["  focus: ", P], ['"clean architecture"', S], [",", K]],
  [["  available: ", P], ["true", B], [",", K]],
  [["};", K]],
];
const LINE_LEN = CODE.map((line) => line.reduce((m, [text]) => m + text.length, 0));
// Characters typed before each line starts.
const LINE_START = LINE_LEN.map((_, i) => LINE_LEN.slice(0, i).reduce((a, b) => a + b, 0));
const TOTAL = LINE_LEN.reduce((a, b) => a + b, 0);

function TypedCode() {
  // Reduced-motion visitors get the finished card straight away.
  const [shown, setShown] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? TOTAL : 0
  );

  useEffect(() => {
    if (shown >= TOTAL) return;
    const id = setTimeout(() => setShown((n) => Math.min(n + 2, TOTAL)), 28);
    return () => clearTimeout(id);
  }, [shown]);

  const done = shown >= TOTAL;
  return (
    <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-[1.75] sm:text-[13px]">
      <code>
        {CODE.map((line, li) => {
          const lineLen = LINE_LEN[li];
          const lineStart = LINE_START[li];
          if (li > 0 && shown <= lineStart) return null; // not reached yet

          let left = shown - lineStart;
          const parts = line.map(([text, cls], ti) => {
            const piece = text.slice(0, Math.max(left, 0));
            left -= text.length;
            return piece ? <span key={ti} className={cls}>{piece}</span> : null;
          });
          const typingHere = !done && shown < lineStart + lineLen;
          return (
            <div key={li} className="flex">
              <span className="mr-4 w-4 shrink-0 text-right text-white/25 select-none">{li + 1}</span>
              <span className="whitespace-pre">
                {parts}
                {typingHere && <span className="caret" />}
              </span>
            </div>
          );
        })}
        {shown >= TOTAL && (
          <div className="flex">
            <span className="mr-4 w-4 shrink-0 text-right text-white/25 select-none">{CODE.length + 1}</span>
            <span className="caret" />
          </div>
        )}
      </code>
    </pre>
  );
}

function TimelineItem({ index, children }) {
  const ref = useReveal();
  return (
    <li ref={ref} data-reveal="" data-reveal-variant="left" className="relative pl-12">
      <span className="absolute top-0 left-0 flex size-8 items-center justify-center rounded-full border border-primary/50 bg-background font-mono text-xs font-bold text-accent shadow-[0_0_18px_-2px_rgba(61,107,255,0.6)]">
        {String(index).padStart(2, "0")}
      </span>
      <p className="pt-1 text-[14.5px] leading-[1.8] text-white/70">{children}</p>
    </li>
  );
}

export default function About() {
  const { t } = useTranslation();
  const aiRef = useReveal();
  const codeRef = useReveal();
  const expRef = useReveal();

  const stats = [
    { value: "2+", label: t("STAT_YEARS_EXP"), accent: "#5b85ff" },
    { value: `${PROJECTS.length}+`, label: t("STAT_PROJECTS"), accent: "#2ee6a6" },
    { value: `${totalSkillsCount}`, label: t("STAT_TECHNOLOGIES"), accent: "#ffb547" },
  ];

  return (
    <div className="pt-10 pb-6 text-white md:pt-14">
      <Seo title={t("NAV_ABOUT")} description={t("p1")} />

      {/* Intro */}
      <header className="stagger mb-12 max-w-[760px]">
        <Pill accent="#2ee6a6" dot className="mb-4 font-mono">
          @tohir · {t("job")}
        </Pill>
        <h1 className="text-aurora text-flow mb-2 text-[clamp(2rem,1.4rem+3vw,3.5rem)] leading-[1.05] font-extrabold tracking-tight">
          {t("title")}
        </h1>
        <span aria-hidden="true" className="heading-bar mb-5" />
        <p className="text-[clamp(0.95rem,0.9rem+0.35vw,1.15rem)] leading-[1.8] text-white/80">
          {t("p1")}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        {/* Journey timeline */}
        <div>
          <ol className="relative flex flex-col gap-7">
            <span
              aria-hidden="true"
              className="line-grow absolute top-2 bottom-2 left-4 w-px bg-linear-to-b from-primary via-accent to-glow"
            />
            {["p2", "p3", "p4", "p5"].map((key, i) => (
              <TimelineItem key={key} index={i + 1}>
                {t(key)}
              </TimelineItem>
            ))}
          </ol>

          <GlassPanel
            ref={aiRef}
            data-reveal=""
            data-reveal-variant="zoom"
            accent="#2ee6a6"
            className="beam-border beam-on mt-9 flex gap-3.5 border-accent/20 bg-accent/5 p-5"
          >
            <span className="float flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <FiCpu size={20} />
            </span>
            <p className="text-sm leading-[1.75] text-white/85">{t("p6")}</p>
          </GlassPanel>
        </div>

        {/* Side column */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <GlassPanel
            ref={codeRef}
            data-reveal=""
            data-reveal-variant="right"
            className="overflow-hidden border-white/10 bg-card/80 shadow-[0_24px_60px_-20px_rgba(61,107,255,0.45)]"
          >
            <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-white/45">about.ts</span>
            </div>
            <TypedCode />
          </GlassPanel>

          <GlassPanel
            ref={expRef}
            data-reveal=""
            data-reveal-variant="right"
            accent="#3d6bff"
            hover
            className="p-5"
          >
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/20 text-[#7fa2ff]">
                <FiBriefcase size={17} />
              </span>
              <h2 className="text-aurora text-xl font-bold">{t("experience")}</h2>
            </div>
            <p className="text-[14px] leading-[1.75] text-white/70">{t("exp_text")}</p>
          </GlassPanel>

          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <StatTile key={s.label} value={s.value} label={s.label} accent={s.accent} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
