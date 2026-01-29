import { LoaderIcon, Lock } from "lucide-react";
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
import useBindGuestCode from "../../../hooks/useBindGuestCode";
import { INVALID_GUEST_CODE } from "../../../constants/errorMessages";

/**
 * InvitationCodeEntry component.
 */
const InvitationGuestCodeEntry = () => {
    const [invitationCode, setInvitationCode] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const { bindGuestCodeMutation } = useBindGuestCode();
    const { guestCode, saveGuestInfo, setGuestListQueryEnabled, refetchGuestList } = useInvitation();
    const navigate = useNavigate();

    // If a code is found in memory then redirect to the guest invitation page
    useEffect(() => {
        if (guestCode) {
            navigate(`/invitation/${guestCode}`);
        }
    }, [])


    const handleSubmit = () => {
        setError("");
        setIsLoading(true);

        const trimedCode = invitationCode.trim();

        bindGuestCodeMutation.mutate({ guestCode: trimedCode }, {
            onSuccess: async () => {
                setGuestListQueryEnabled(true);

                const { data } = await refetchGuestList()

                if (data && data[trimedCode]) {

                    const guestNames = {
                        firstName: data[trimedCode].firstName,
                        lastName: data[trimedCode].lastName
                    }

                    saveGuestInfo(guestNames, trimedCode);

                    navigate(`/invitation/${trimedCode}`);
                } else {
                    setError(INVALID_GUEST_CODE);
                }
            },
            onError: () => {
                setError(INVALID_GUEST_CODE);
                setIsLoading(false);
            },
        })
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


                                <Button variant="secondary" isLoading={isLoading} disabled={!invitationCode || isLoading} onClick={handleSubmit}>Tilgå min invitation</Button>
                            </div>
                        </div>
                    </form>
                </StaggeredItem>
            </Section>
        </StaggeredContent>
    )
}

export default InvitationGuestCodeEntry;