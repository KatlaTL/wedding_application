import { AlertCircle } from "lucide-react"

type ErrorType = {
    errorText: string
}

const Error = ({ errorText }: ErrorType) => {
    return (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
            <AlertCircle className="h-3.5 w-3.5" />
            <p className="text-sm text-destructive!">{errorText}</p>
        </div>
    )
}

export default Error;