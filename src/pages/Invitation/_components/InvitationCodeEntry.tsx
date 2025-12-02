import { Lock } from "lucide-react";
import HeadingWithIcon from "../../../components/HeadingWithIcon";
import Section from "../../../components/Section"
import Wrapper from "./Wrapper";
import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import useInvitation from "../../../hooks/useInvitation";
import { useNavigate } from "react-router-dom";
import Error from "../../../components/Error";
import StaggeredContent from "../../../components/StaggeredContent";
import StaggeredItem from "../../../components/StaggeredItem";

/**
 * InvitationCodeEntry component.
 */
const InvitationCodeEntry = () => {
    const [invitationCode, setInvitationCode] = useState<string>("");
    const [error, setError] = useState<string>("");

    const { validCodes, code, saveGuestInfo } = useInvitation();
    const navigate = useNavigate();

    // If a code is found in memory then redirect to the guest invitation page
    useEffect(() => {
        if (code) {
            navigate(`/invitation/${code}`);
        }
    }, [])


    const handleSubmit = () => {
        setError("");

        const trimedCode = invitationCode.trim();

        if (validCodes[trimedCode]) {
            const guestNames = {
                firstName: validCodes[trimedCode].firstName,
                lastName: validCodes[trimedCode].lastName
            }

            saveGuestInfo(guestNames, trimedCode);

            navigate(`/invitation/${trimedCode}`);
        } else {
            setError("Ugyldig invitationskode. Tjek venligst din invitation, og prøv igen.");
        }
    }

    return (
        <StaggeredContent>
            <Section title="Invitation" description="Indtast din kode for at se din personlige bryllupsinvitation">
                <StaggeredItem>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="bg-background-muted rounded-lg border-primary-30 md:w-120 border p-5 mx-5 md:mx-0">
                            <div className="flex flex-col items-start text-left gap-3">
                                <HeadingWithIcon icon={Lock} text="Få adgang til din invitation" />

                                <Wrapper className="mb-2">
                                    <p className="!text-color-text">Invitations kode</p>

                                    <input
                                        name="inviationCode"
                                        value={invitationCode}
                                        onChange={e => setInvitationCode(e.target.value)}
                                        placeholder="Skriv din personlig invitations kode her"
                                        required
                                        className="rounded-md h-7 px-2 text-xs text-color-text placeholder-muted-foreground placeholder:text-xs border border-primary-30 focus:outline-primary"
                                    />
                                </Wrapper>

                                {error && <Error errorText={error} />}

                                <Button variant="secondary" disabled={!invitationCode} onClick={handleSubmit}>Tilgå min invitation</Button>
                            </div>
                        </div>
                    </form>
                </StaggeredItem>
            </Section>
        </StaggeredContent>
    )
}

export default InvitationCodeEntry;