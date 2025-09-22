import type { PropsWithChildren } from "react";

type SectionType = {
    title?: string;
    description?: string;
}

const Section = ({ title, description, children }: PropsWithChildren<SectionType>) => {
    return (
        <section className="relative min-h-screen flex flex-col py-30 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center">
                {title && <h2 className="mb-3">{title}</h2>}
                {description && <p className="!text-sm mb-3">{description}</p>}

                {children}
            </div>
        </section>
    )
}

export default Section;