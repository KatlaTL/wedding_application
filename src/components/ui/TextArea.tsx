import type { TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

const TextArea: React.FC<TextAreaProps> = ({ className = "", label, required, ...props }) => {
    const labelText = required ? `${label} *` : label;

    return (
        <div className="flex flex-col gap-1 mb-1">
            <p className="!text-color-text">{labelText}</p>
            <textarea
                className={twMerge("bg-white rounded-lg px-2 pt-1 resize-none text-[13px] text-color-text placeholder-muted-foreground placeholder:text-[13px] border border-primary-30 focus:outline-primary", className)}
                {...props}
            />
        </div>
    )
}

export default TextArea;