import { Car } from "lucide-react";
import Section from "../../components/Section"
import LocationTile from "./_components/LocationTile";
import HeadingWithIcon from "../../components/HeadingWithIcon";
import useLocation from "../../hooks/useLocation";
import PageTransition from "../../components/PageTransition";
import StaggeredContent from "../../components/StaggeredContent";
import StaggeredItem from "../../components/StaggeredItem";
import Loader from "../../components/ui/Loader";

/**
 * Location page component
 */
const Location = () => {
    const { locations, isLoading } = useLocation();

    return (
        <PageTransition>
            <StaggeredContent>
                <Section title="Find vej" description="Praktisk info om de forskellige lokationer">
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <div className="flex flex-col md:grid grid-cols-2 gap-3 mx-5 md:mx-0">
                            {locations.map((location, index) =>
                                <StaggeredItem>
                                    <LocationTile
                                        key={location.title + index}
                                        title={location.title}
                                        address={location.address}
                                        description={location.description}
                                        mapUrl={location.mapUrl}
                                        time={location.time}
                                        iframeUrl={location.iframeUrl}
                                    />
                                </StaggeredItem>
                            )}
                        </div>
                    )}

                    <StaggeredItem>
                        <div className="flex flex-col gap-2 w-full h-fit border-primary-30 border my-5 text-left p-5 rounded-lg">
                            <HeadingWithIcon icon={Car} text="Transport" />

                            <p className="px-5">Alle steder har rigelig parkering. Hvis du har brug for et lift eller kan tilbyde et til andre gæster, bedes du give os besked i din tilmelding! Vi hjælper gerne med at koordinere samkørsel.</p>
                        </div>
                    </StaggeredItem>
                </Section>
            </StaggeredContent>
        </PageTransition>
    )
}

export default Location;