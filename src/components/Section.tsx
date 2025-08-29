
type SectionType = React.PropsWithChildren<{
    title: string;
    description?: string;
}>

const Section: React.FC<SectionType> = ({ title, description, children }) => {
    return (
        <section className="relative min-h-screen flex flex-col py-20 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="mb-3">{title}</h2>
                {description && <p className="!text-sm mb-3">{description}</p>}

                {children}
            </div>
        </section>
    )
}

export default Section;