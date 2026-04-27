import { AlertCircle } from "lucide-react"
import { twMerge } from "tailwind-merge";

type ErrorType = {
    errorText: string;
    className?: string;
}

/**
 * Error component
 * @param errorText - The error message
 */
const Error = ({ errorText, className = "" }: ErrorType) => {
    return (
        <div className={twMerge("flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg", className)}>
            <AlertCircle className="h-3.5 w-3.5" />
            <p className="text-sm text-destructive!">{errorText}</p>
        </div>
    )
}

export default Error;