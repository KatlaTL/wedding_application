import { CheckCircle } from "lucide-react";
import Section from "../../../components/Section";
import Button from "../../../components/ui/Button";
import Wrapper from "./Wrapper";
import useInvitation from "../../../hooks/useInvitation";
import StaggeredContent from "../../../components/StaggeredContent";
import StaggeredItem from "../../../components/StaggeredItem";

/**
 * RSVP submitted component
 */
const RSVPSubmitted = () => {
    const { updatedRSVP } = useInvitation();

    return (
        <StaggeredContent>
            <Section>
                <StaggeredItem>
                    <div className="bg-background-muted rounded-lg border-primary-30 md:w-120 border p-5 mx-5 md:mx-0">
                        <CheckCircle className="h-12 w-12 text-tertiary mx-auto mb-4" />
                        <Wrapper>
                            <h2>Tak! Invitation besvaret</h2>
                            <p className="text-sm! mt-1">We've received your RSVP and can't wait to celebrate with you!</p>
                        </Wrapper>

                        <Button className="mt-6 w-40!" onClick={updatedRSVP}>Ændre besvarelse</Button>
                    </div>
                </StaggeredItem>
            </Section>
        </StaggeredContent>
    )
}

export default RSVPSubmitted;