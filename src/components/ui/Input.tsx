import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Input: React.FC<InputProps> = ({ className = "", label, required, ...props }) => {
    const labelText = required ? `${label} *` : label;

    return (
        <div className="flex flex-col gap-1 mb-1">
            <p className="!text-color-text">{labelText}</p>
            <input
                className={twMerge("w-full rounded-md bg-white h-7 px-2 text-[13px] text-color-text placeholder-muted-foreground placeholder:text-[13px] border border-primary-30 focus:outline-primary", className)}
                {...props}
            />
        </div>
    )
}

export default Input;