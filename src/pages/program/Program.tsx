import Section from "../../components/Section";
import ProgramTile from "./_components/ProgramTile";
import { Clock, MapPin, Camera, Users, Utensils, Martini, Music } from "lucide-react";

const Program = () => {

    return (
        <Section title="Program">
            <p className="text-sm text-muted-foreground m-3">Her er hvordan dagen kommer til at udfolde sig!</p>
            <div className="flex relative">
                <div className="absolute -left-18 top-0 bottom-0 w-0.5 gradient hidden md:block" />

                <div className="flex flex-col gap-3 relative">
                    {/* TODO dynamic create the program */}

                    <div className="space-y-8">
                        <div className="absolute -left-[78.4px] w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block" />

                        <ProgramTile
                            icon={Users}
                            title="Vielse"
                            description='Vær med, når vi siger "ja" omgivet af familie og venner'
                            location="Køng Kirke"
                            time="Kl. 12:30"
                        />
                    </div>

                    <div className="space-y-8">
                        <div className="absolute -left-[78.4px] w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block" />

                        <ProgramTile
                            icon={Martini}
                            title="Reception"
                            description='Vi tager til hjemstavnsgården hvor der er kage, drikkelse og andet sjov'
                            location="Hjemstavnsgården"
                            time="Kl. 14:00"
                        />
                    </div>

                    <div className="space-y-8">
                        <div className="absolute -left-[78.4px] w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block" />

                        <ProgramTile
                            icon={Utensils}
                            title="Festmiddag"
                            description='Vi tager til præstegården i Odense hvor holder festmiddagen'
                            location="Georgsgade 50"
                            time="Kl. 18:00"
                        />
                    </div>

                </div>
            </div>
        </Section>
    )
}

export default Program;
