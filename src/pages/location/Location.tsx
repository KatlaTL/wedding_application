import { Car } from "lucide-react";
import Section from "../../components/Section"
import LocationTiles from "./_components/LocationsTiles";

const Location = () => {

    return (
        <Section title="Find vej" description="Praktisk info om de forskellige lokationer">

            <div className="grid grid-cols-2 gap-3">

                <LocationTiles />
                <LocationTiles />
                <LocationTiles />

            </div>

            <div className="flex gap-2 w-full h-fit border-primary/30 border my-5 text-left p-5 rounded-lg">
                <Car className="h-4 w-4 text-primary"/>
                <div>
                    <h3 className="pb-2">Transport</h3>
                    <p>Alle steder har rigelig parkering. Hvis du har brug for et lift eller kan tilbyde et til andre gæster, bedes du give os besked i din tilmelding! Vi hjælper gerne med at koordinere samkørsel.</p>
                </div>
            </div>
        </Section>
    )
}

export default Location;