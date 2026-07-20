import { Pill } from '@/components/common/Pill'
import imgProfile from "../../assets/img/about.webp"

const EXIT_AT = 3
const s = (dir, delay) => ({
    opacity: 0,
    animation: `anim-${dir} 0.55s ease forwards ${delay}s, anim-${dir}-out 0.55s ease forwards ${EXIT_AT}s`,
});

// Narrow viewport range where the card needs to be re-centered — not
// expressible as a single Tailwind breakpoint variant.
const styles = `
    @media (min-width: 768px) and (max-width: 1100px) {
        .portfolio-card { justify-content: center !important; }
    }
`;

export default function SetTime() {
    return (
        <div style={{ paddingInline: "10px", overflowX: "hidden" }}>
            <style>{styles}</style>
            <div className="flex min-h-screen items-center justify-center p-4">
                <div
                    className="portfolio-card flex max-w-full flex-row flex-wrap gap-7 rounded-[30px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_120px_rgba(0,0,0,0.4)] sm:gap-8 sm:p-9 md:p-12.5"
                    style={s("top", 0)}
                >
                    <div>
                        <div className="flex flex-col">
                            <div className="flex flex-row" style={s("top", 0.55)}>
                                <Pill accent="#c0103a" className="text-[10px] font-bold tracking-wide uppercase">
                                    UI LOADING...
                                </Pill>
                            </div>
                            <p
                                className="my-2.5 max-w-full text-[26px] font-bold sm:max-w-[300px] sm:text-[32px] md:text-[40px]"
                                style={s("left", 1.35)}
                            >
                                Welcome to my Portfolio Website
                            </p>
                            <p
                                className="mb-5 max-w-full font-thin opacity-50 sm:max-w-[500px]"
                                style={s("left", 1.47)}
                            >
                                Building modern, reliable, and fast digital experiences with a focus on clean UI and solid engineering.
                            </p>
                            <p
                                className="mb-5 max-[1099px]:hidden text-[15px] font-bold text-[rgba(205,12,12,0.729)]"
                                style={s("left", 1.6)}
                            >
                                LIVE STATUS
                            </p>
                        </div>

                        <div className="max-w-full sm:max-w-[400px]">
                            <p className="text-xs opacity-50" style={s("bottom", 1.72)}>
                                Loading experience...
                            </p>

                            <div
                                className="h-1 w-full overflow-hidden rounded-full bg-white/10"
                                style={s("bottom", 1.85)}
                            >
                                <div className="h-full w-full animate-[load_3.3s_linear_forwards] bg-red-600" />
                            </div>
                        </div>
                    </div>

                    <img
                        src={imgProfile}
                        alt="my photo"
                        className="mx-auto w-[160px] max-w-[min(100%,70vw)] cursor-pointer rounded-[20px] shadow-[0_4px_15px_rgba(255,0,0,0.7)] sm:w-[220px] md:w-[320px] lg:w-[440px]"
                        style={s("right", 1.4)}
                    />
                </div>
            </div>
        </div>
    );
}
