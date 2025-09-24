import { Car } from "lucide-react";
import Section from "../../components/Section"
import LocationTiles from "./_components/LocationsTiles";
import HeadingWithIcon from "../../components/HeadingWithIcon";
import useLocation from "../../hooks/useLocation";
import type { LocationType } from "../../types/location.type";
import PageTransition from "../../components/PageTransition";

const Location = () => {
    const Locations: LocationType[] = useLocation();

    return (
        <PageTransition>
            <Section title="Find vej" description="Praktisk info om de forskellige lokationer">

                <div className="grid grid-cols-2 gap-3">

                    {Locations.map((location, index) =>
                        <LocationTiles
                            key={location.title + index}
                            title={location.title}
                            address={location.address}
                            description={location.description}
                            mapUrl={location.mapUrl}
                            time={location.time}
                            imageUrl={location.imageUrl}
                        />
                    )}

                </div>

                <div className="flex flex-col gap-2 w-full h-fit border-primary-30 border my-5 text-left p-5 rounded-lg">
                    <HeadingWithIcon icon={Car} text="Transport" />

                    <p className="px-5">Alle steder har rigelig parkering. Hvis du har brug for et lift eller kan tilbyde et til andre gæster, bedes du give os besked i din tilmelding! Vi hjælper gerne med at koordinere samkørsel.</p>
                </div>
            </Section>
        </PageTransition>
    )
}

export default Location;