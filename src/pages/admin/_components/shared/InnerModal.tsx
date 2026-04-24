import type { PropsWithChildren } from "react";

type InnerModalType = {
    title: string;
}

const InnerModal = ({ title, children }: PropsWithChildren<InnerModalType>) => {

    return (
        <div className="w-full min-w-80">
            <h2 className="text-lg font-semibold text-color-text mb-5">{title}</h2>

            {children}
        </div>
    )
}

export default InnerModal;