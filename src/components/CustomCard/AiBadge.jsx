import { MdAutoAwesome } from "react-icons/md";
import { cn } from "@/lib/utils";

/** "AI Built" ribbon shown on the project card (sm) and inside the modal (lg). */
export function AiBadge({ size = "sm" }) {
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
