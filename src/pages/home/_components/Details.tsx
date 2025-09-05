import Section from "../../../components/Section";

const Details = () => {

    return (
        <Section title="Information">
            <div className="grid gab-6 grid-cols-2 justify-center items-center">
                <div className="flex flex-col items-center justify-between p-3 ml-20">
                    <p className="pb-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis neque metus, sit amet vehicula nunc pharetra eleifend. Duis posuere vestibulum mi vel pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis neque metus, sit amet vehicula nunc pharetra eleifend. Duis posuere vestibulum mi vel pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                    </p>
                </div>
                <div className="h-44 w-60 gradient rounded-lg flex items-center justify-center shadow-lg ml-5">
                    <span className="text-4xl">💕</span> {/* Image placeholder */}
                </div>
            </div>
        </Section>
    )
}

export default Details;