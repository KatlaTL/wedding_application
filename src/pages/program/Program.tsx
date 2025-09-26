import React from "react";
import PageTransition from "../../components/PageTransition";
import Section from "../../components/Section";
import useProgram from "../../hooks/useProgram";
import type { ProgramType } from "../../types/programTypes";
import GradientLine from "./_components/GradientLine";
import GradientLineDot from "./_components/GradientLineDot";
import ProgramTile from "./_components/ProgramTile";
import StaggeredContent from "../../components/StaggeredContent";
import StaggeredItem from "../../components/StaggeredItem";

/**
 * Program page component
 */
const Program = () => {
    const program: ProgramType[] = useProgram();

    return (
        <PageTransition>
            <StaggeredContent>
                <Section title="Program" description="Her er hvordan dagen kommer til at udfolde sig!">
                    <StaggeredItem>
                        <div className="flex relative">
                            <GradientLine />

                            <div className="flex flex-col gap-3 relative">
                                {program.map((item, index) => {
                                    return (
                                        <React.Fragment key={item.title + index}>
                                            <GradientLineDot />
                                            <ProgramTile
                                                icon={item.icon}
                                                title={item.title}
                                                description={item.description}
                                                location={item.location}
                                                time={item.time}
                                            />
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </div>
                    </StaggeredItem>
                </Section>
            </StaggeredContent>
        </PageTransition>
    )
}

export default Program;
