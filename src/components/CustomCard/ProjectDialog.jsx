import { FaGithub } from "react-icons/fa";
import { FiExternalLink, FiX } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { AiBadge } from "./AiBadge";

/**
 * The single project details modal for the whole Projects grid. Projects.jsx
 * keeps the last opened project in state and only renders this once a card has
 * actually been clicked, so nothing Dialog-related is mounted on first paint.
 */
export default function ProjectDialog({ project, open, onOpenChange }) {
    if (!project) return null;
    const { img, title, desc, tech, giturl, link, badge } = project;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="flex h-[88vh] max-h-[90vh] w-full max-w-[calc(100%-2rem)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[rgba(13,0,7,0.92)] p-0 shadow-[0_32px_80px_rgba(0,0,0,0.8)] backdrop-blur-[32px] sm:h-[640px] sm:max-w-sm md:h-[680px]"
            >
                {/* Modal Image */}
                <div className="relative shrink-0">
                    <img
                        src={img}
                        alt={title}
                        decoding="async"
                        className="block h-[200px] w-full bg-black/35 object-contain sm:h-[400px]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(13,0,7,0.95)_100%)]" />
                    <button
                        onClick={() => onOpenChange(false)}
                        aria-label="Close"
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
                        {Array.isArray(tech) && tech.map((item) => (
                            <Badge
                                key={item}
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
                                <a target="_blank" href={giturl} rel="noreferrer">
                                    <FaGithub size={15} /> GitHub
                                </a>
                            </Button>
                        )}
                        <Button asChild variant="brand" className="h-10.5 flex-1 rounded-xl text-[14px]">
                            <a target="_blank" href={link} rel="noreferrer">
                                <FiExternalLink size={14} /> Live Demo
                            </a>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
