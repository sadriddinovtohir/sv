import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink, FiX } from "react-icons/fi";
import { MdAutoAwesome } from "react-icons/md";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function AiBadge({ size = "sm" }) {
    return (
        <div
            className={
                size === "sm"
                    ? "absolute top-1.5 right-1.5 flex items-center gap-1 rounded-full border border-[#22c55e]/40 bg-[#22c55e]/15 px-1.5 py-1 backdrop-blur-md sm:px-2.5"
                    : "absolute top-3 left-3 flex items-center gap-1.25 rounded-full border border-[#22c55e]/40 bg-[#22c55e]/15 px-3 py-1.25 backdrop-blur-md"
            }
        >
            <MdAutoAwesome size={size === "sm" ? 10 : 13} color="#22c55e" />
            <span className={cn("font-bold text-[#22c55e]", size === "sm" ? "text-[8px] sm:text-[10px]" : "text-xs")}>
                AI Built
            </span>
        </div>
    );
}

export default function CustomCard({ img, title, desc, tech, giturl, link, badge }) {
    const [open, setOpen] = useState(false);

    const visibleTech = Array.isArray(tech) ? tech.slice(0, 4) : [];
    const extraCount = Array.isArray(tech) ? tech.length - 4 : 0;

    return (
        <>
            {/* ===== Card ===== */}
            <GlassPanel
                as="div"
                hover
                accent="#c0103a"
                onClick={() => setOpen(true)}
                className="w-full cursor-pointer animate-[fadeInUp_0.5s_ease_forwards] rounded-[14px] p-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(192,16,58,0.15)] sm:rounded-[20px] sm:p-4"
            >
                {/* Image + Badge */}
                <div className="relative mb-2 sm:mb-3">
                    <img
                        src={img}
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="150"
                        className="block h-[100px] w-full rounded-[10px] bg-black/25 object-contain sm:h-[150px] sm:rounded-[14px]"
                    />
                    {badge && <AiBadge />}
                </div>

                {/* Title */}
                <p className="mb-1 text-[12.5px] leading-tight font-bold text-white sm:text-[15px]">
                    {title}
                </p>

                {/* Truncated description — 3 lines (2 on mobile) */}
                <p className="mb-2 line-clamp-2 text-[10.5px] leading-[1.55] text-white/50 sm:mb-3 sm:line-clamp-3 sm:text-xs">
                    {desc}
                </p>

                {/* Tech — max 4 tags + counter */}
                <div className="mb-2 flex flex-wrap gap-1 sm:mb-3 sm:gap-1.5">
                    {visibleTech.map((item, i) => (
                        <Badge
                            key={i}
                            variant="outline"
                            className="rounded-full border-white/10 bg-white/7 px-2 py-0.75 text-[9px] font-medium text-white/65 sm:px-3 sm:text-[11px]"
                        >
                            {item}
                        </Badge>
                    ))}
                    {extraCount > 0 && (
                        <Badge className="rounded-full border-primary/30 bg-primary/15 px-2 py-0.75 text-[9px] font-semibold text-accent sm:px-3 sm:text-[11px]">
                            +{extraCount}
                        </Badge>
                    )}
                </div>

                {/* Ko'proq hint */}
                <p className="text-[10.5px] font-semibold tracking-wide text-accent opacity-80 sm:text-xs">
                    Ko'proq ko'rish →
                </p>
            </GlassPanel>

            {/* ===== Modal ===== */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    showCloseButton={false}
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-[88vh] max-h-[90vh] w-full max-w-[calc(100%-2rem)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[rgba(13,0,7,0.92)] p-0 shadow-[0_32px_80px_rgba(0,0,0,0.8)] backdrop-blur-[32px] sm:h-[640px] sm:max-w-sm md:h-[680px]"
                >
                    {/* Modal Image */}
                    <div className="relative shrink-0">
                        <img
                            src={img}
                            alt={title}
                            className="block h-[200px] w-full bg-black/35 object-contain sm:h-[400px]"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(13,0,7,0.95)_100%)]" />
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-primary"
                        >
                            <FiX size={18} />
                        </button>
                        {badge && <AiBadge size="lg" />}
                    </div>

                    {/* Modal Content — scrollable so long descriptions never get clipped */}
                    <div className="flex-1 overflow-x-hidden overflow-y-auto px-4 pt-4 pb-5 sm:px-6 sm:pt-5">
                        <DialogTitle className="mb-3 text-[17px] font-extrabold text-white sm:text-xl">
                            {title}
                        </DialogTitle>

                        <DialogDescription className="mb-5 text-[13px] leading-[1.75] text-white/65 sm:text-[13.5px]">
                            {desc}
                        </DialogDescription>

                        <div className="mb-6 flex flex-wrap gap-2">
                            {Array.isArray(tech) && tech.map((item, i) => (
                                <Badge
                                    key={i}
                                    variant="outline"
                                    className="rounded-full border-white/12 bg-white/8 px-3 py-1 text-xs font-medium text-white/75"
                                >
                                    {item}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            {giturl && (
                                <Button asChild variant="outline" className="h-10.5 flex-1 rounded-xl border-white/15 bg-transparent text-[14px] text-white/75 hover:border-accent hover:bg-accent/6 hover:text-accent">
                                    <a target="_blank" href={giturl} rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                                        <FaGithub size={15} /> GitHub
                                    </a>
                                </Button>
                            )}
                            <Button asChild variant="brand" className="h-10.5 flex-1 rounded-xl text-[14px]">
                                <a target="_blank" href={link} rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                                    <FiExternalLink size={14} /> Live Demo
                                </a>
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
