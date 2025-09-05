import Section from "../../components/Section";
import GradientLine from "./_components/GradientLine";
import GradientLineDot from "./_components/GradientLineDot";
import ProgramTile from "./_components/ProgramTile";
import { Clock, MapPin, Camera, Users, Utensils, Martini, Music } from "lucide-react";

const Program = () => {

    return (
        <Section title="Program" description="Her er hvordan dagen kommer til at udfolde sig!">
            <div className="flex relative">
                <GradientLine />

                <div className="flex flex-col gap-3 relative">
                    {/* TODO dynamic create the program */}

                    <GradientLineDot />

                    <ProgramTile
                        icon={Users}
                        title="Vielse"
                        description='Vær med, når vi siger "ja" omgivet af familie og venner'
                        location="Køng Kirke"
                        time="Kl. 12:30"
                    />

                    <GradientLineDot />

                    <ProgramTile
                        icon={Martini}
                        title="Reception"
                        description='Vi tager til hjemstavnsgården hvor der er kage, drikkelse og andet sjov'
                        location="Hjemstavnsgården"
                        time="Kl. 14:00"
                    />

                    <GradientLineDot />

                    <ProgramTile
                        icon={Utensils}
                        title="Festmiddag"
                        description='Vi tager til præstegården i Odense hvor holder festmiddagen'
                        location="Georgsgade 50"
                        time="Kl. 18:00"
                    />

                </div>
            </div>
        </Section>
    )
}

export default Program;
