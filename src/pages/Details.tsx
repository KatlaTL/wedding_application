
const Details = () => {

    return (
        <section className="relative min-h-screen flex flex-col py-20 px-4 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-primary text-2xl font-serif tracking-wide">Information</h2>

                <div className="grid gab-6 grid-cols-2 justify-center items-center">
                    <div className="flex flex-col text-muted-foreground text-sm items-center justify-between p-3 ml-20">
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
            </div>
        </section>
    )
}

export default Details;