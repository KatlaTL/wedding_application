import PageTransition from "../../components/PageTransition";
import Section from "../../components/Section";
import useProgram from "../../hooks/useProgram";
import type { ProgramType } from "../../types/program.type";
import GradientLine from "./_components/GradientLine";
import GradientLineDot from "./_components/GradientLineDot";
import ProgramTile from "./_components/ProgramTile";

const Program = () => {
    const program: ProgramType[] = useProgram();

    return (
        <PageTransition>
            <Section title="Program" description="Her er hvordan dagen kommer til at udfolde sig!">
                <div className="flex relative">
                    <GradientLine />

                    <div className="flex flex-col gap-3 relative">
                        {program.map((item) => {
                            return (
                                <>
                                    <GradientLineDot />
                                    <ProgramTile
                                        icon={item.icon}
                                        title={item.title}
                                        description={item.description}
                                        location={item.location}
                                        time={item.time}
                                    />
                                </>
                            )
                        })}
                    </div>
                </div>
            </Section>
        </PageTransition>
    )
}

export default Program;
