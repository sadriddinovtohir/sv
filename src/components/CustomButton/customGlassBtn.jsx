import { Button } from "@/components/ui/button";

function GlassButton({ children, startIcon, ...props }) {
    return (
        <Button variant="glass" {...props}>
            {startIcon}
            {children}
        </Button>
    );
}

export default GlassButton;
