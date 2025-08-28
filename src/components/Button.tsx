import type { ButtonHTMLAttributes } from "react";

interface ButtoneProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    size?: "small" | "medium" | "large";
}

const Button: React.FC<ButtoneProps> = ({
    children,
    variant = "primary",
    size = "medium",
    className = "",
    ...props
}) => {

    const baseStyle = "w-full rounded-lg pb-0.5 bg-background border-1 border-[var(--color-primary)] hover:cursor-pointer";

    const variantStyle = variant === "primary"
        ? "text-color-text hover:bg-tertiary/90 hover:border-[var(--color-tertiary)]"
        : "text-[var(--color-primary)] hover:bg-primary/90 hover:text-[var(--color-background)]";

    let sizeStyle = "";

    switch (size) {
        case "small":
            sizeStyle = "h-6 text-xs";
            break;
        case "medium":
            sizeStyle = "h-8 text-sm";
            break;
        case "large":
            sizeStyle = "h-10 text-lg";
            break;
    }

    return (
        <button
            className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;