import { twMerge } from "tailwind-merge";

type FormWrapperType = {
    className?: string;
}

/**
 * FormWrapper component to ensure consistent style in forms
 */
const FormWrapper = ({ className = "", children }: React.PropsWithChildren<FormWrapperType>) => {
    return (
        <div className={twMerge("flex flex-col gap-1 w-full", className)}>
            {children}
        </div>
    )
}

export default FormWrapper;