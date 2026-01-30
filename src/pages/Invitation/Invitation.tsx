import { Car, CheckCircle, Mail, RotateCcw, Users, XCircle } from "lucide-react";
import Section from "../../components/Section"
import { CheckIcon } from "@radix-ui/react-icons";
import Button, { type ButtonVariant } from "../../components/ui/Button";
import HeadingWithIcon from "../../components/HeadingWithIcon";
import ButtonGroup from "./_components/ButtonGroup";
import Wrapper from "./_components/Wrapper";
import { Checkbox, CheckboxIndicator } from "../../components/ui/Checkbox";
import { useState } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";
import InvitationGuestCodeEntry from "./_components/InvitationGuestCodeEntry";
import { useNavigate, useParams } from "react-router-dom";
import useInvitation from "../../hooks/useInvitation";
import RSVPSubmitted from "./_components/RSVPSubmitted";
import type { DietaryType } from "../../types/invitationTypes";
import { DietaryLabels } from "../../constants/dietaryLabels";
import Error from "../../components/Error";
import Modal from "../../components/Modal";
import invitationImage from "../../assets/images/invitation.jpeg";
import PageTransition from "../../components/PageTransition";
import StaggeredContent from "../../components/StaggeredContent";
import StaggeredItem from "../../components/StaggeredItem";
import useBindGuestCode from "../../hooks/useBindGuestCode";
import { SOMETHING_WENT_WRONG } from "../../constants/errorMessages";

/**
 * Invitation page component. \
 * Renders both the RSVP form, the RSVPSubmitted component and the InvitationCodeEntry component.
 */
const Invitation = () => {
    const [isAttending, setIsAttending] = useState<boolean>();
    const [needLift, setNeedLift] = useState<boolean>();
    const [canOfferLift, setCanOfferLift] = useState<boolean>();
    const [dietary, setDietary] = useState<DietaryType>();
    const [allergies, setAllergies] = useState<string>();
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const { guestCode } = useParams();
    const { guestList, saveRSVP, updateRSVPMutation, isSubmitted, clearGuest, setGuestListQueryEnabled } = useInvitation();
    const { unBindGuestCodeMutation } = useBindGuestCode();

    const dietaryOptions: DietaryType[] = ["Vegetarian", "Vegan", "Omnivore"];

    const handleCheckedChange = (checked: CheckedState, value: DietaryType) => {
        if (checked) {
            setDietary(value);
        }
    }

    const handleNewCodeClick = () => {
        unBindGuestCodeMutation.mutate({}, {
            onSuccess: () => {
                setGuestListQueryEnabled(false);
                clearGuest();
                navigate("/invitation");
            }
        })
    }

    const handleRSVPSubmit = () => {
        setError("");
        setIsLoading(true);

        const RSVPData = {
            isAttending,
            needLift,
            canOfferLift,
            dietary,
            allergies
        };

        updateRSVPMutation.mutate({ RSVP: RSVPData }, {
            onSuccess: () => saveRSVP(RSVPData),
            onError: () => setError(SOMETHING_WENT_WRONG),
            onSettled: () => setIsLoading(false)
        });
    }

    const disableButton = (): boolean => {
        if (isAttending === undefined) {
            return true;
        }

        if (isAttending) {
            return needLift === undefined || canOfferLift === undefined || dietary === undefined;
        }

        return false;
    }

    const setButtonVariant = (buttonState: boolean | undefined, buttonType: "secondary" | "destructive"): ButtonVariant => {
        switch (buttonType) {
            case "secondary":
                return buttonState ? "secondary-no-hover" : "primary";
            case "destructive":
                return buttonState === false ? "destructive" : "primary";
        }
    }

    if (isSubmitted) {
        return (
            <PageTransition>
                <RSVPSubmitted />
            </PageTransition>
        )
    }

    if (!guestCode) {
        return (
            <PageTransition>
                <InvitationGuestCodeEntry />
            </PageTransition>
        )
    }

    return (
        <PageTransition>
            <StaggeredContent>
                <Section title="Bekræft deltagelse" description={`${guestList[guestCode]?.firstName} ${guestList[guestCode]?.lastName} lad os vide, om du kommer!`}>
                    <StaggeredItem>
                        <div className="bg-background-muted rounded-lg border-primary-30 border p-5 max-w-120 mt-7 mb-5 xs:mx-auto mx-5 md:mx-0">
                            <Wrapper>
                                <ButtonGroup className="mx-auto">
                                    <Button type="button" size="small" icon={Mail} className="w-45!" onClick={() => setModalIsOpen(true)}>Se din invitation</Button>
                                    <Button type="button" size="small" icon={RotateCcw} className="w-45!" onClick={handleNewCodeClick}>Indtast en anden kode</Button>
                                </ButtonGroup>
                            </Wrapper>
                        </div>
                    </StaggeredItem>

                    <StaggeredItem>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="bg-background-muted rounded-lg border-primary-30 border p-5 max-w-120 xs:mx-auto mx-5 md:mx-0">
                                <div className="flex flex-col items-start text-left gap-3">
                                    <HeadingWithIcon icon={Users} text="Tilmelding" />

                                    <Wrapper>
                                        <ButtonGroup title="Deltager du?">
                                            <Button type="button" size="small" icon={CheckCircle} variant={setButtonVariant(isAttending, "secondary")} onClick={() => setIsAttending(true)}>Ja, jeg kommer</Button>
                                            <Button type="button" size="small" icon={XCircle} variant={setButtonVariant(isAttending, "destructive")} onClick={() => setIsAttending(false)}>Nej, desværre ikke</Button>
                                        </ButtonGroup>
                                    </Wrapper>


                                    {isAttending && (
                                        <>
                                            <Wrapper className="bg-muted rounded-lg p-2">
                                                <HeadingWithIcon icon={Car} text="Transport" className="mb-2" />

                                                <ButtonGroup title="Har du brug for et lift fra Odense?" className="mb-2">
                                                    <Button type="button" size="small" className="!w-auto px-3" variant={setButtonVariant(needLift, "secondary")} onClick={() => setNeedLift(true)}>Ja, jeg har behov for et lift</Button>
                                                    <Button type="button" size="small" className="!w-auto px-3" variant={setButtonVariant(needLift, "destructive")} onClick={() => setNeedLift(false)}>Nej, jeg klare den</Button>
                                                </ButtonGroup>

                                                <ButtonGroup title="Kan du tilbyde et lift til andre gæster?">
                                                    <Button type="button" size="small" className="!w-auto px-3" variant={setButtonVariant(canOfferLift, "secondary")} onClick={() => setCanOfferLift(true)}>Ja, jeg kan tilbyde et lift</Button>
                                                    <Button type="button" size="small" className="!w-auto px-3" variant={setButtonVariant(canOfferLift, "destructive")} onClick={() => setCanOfferLift(false)}>Nej, desværre ikke</Button>
                                                </ButtonGroup>
                                            </Wrapper>


                                            <Wrapper className="bg-muted rounded-lg p-2 !flex-row text-xs text-color-text">
                                                <div className="flex gap-5">
                                                    {dietaryOptions.map((value, index) =>
                                                        <div className="flex gap-1 text-xs" key={value + index}>
                                                            <Checkbox
                                                                className="flex size-4 items-center justify-center bg-background rounded border-primary outline-none"
                                                                onCheckedChange={(checked) => handleCheckedChange(checked, value)}
                                                                checked={dietary === value}
                                                                id={value}
                                                            >
                                                                <CheckboxIndicator>
                                                                    <CheckIcon className="size-4 bg-primary text-background-muted rounded" />
                                                                </CheckboxIndicator>
                                                            </Checkbox>
                                                            <label htmlFor={value}>
                                                                {DietaryLabels[value]}
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>
                                            </Wrapper>

                                            <Wrapper className="mb-2">
                                                <p className="!text-color-text">Har du kostrestriktioner eller allergier?</p>

                                                <textarea
                                                    name="dietary"
                                                    value={allergies}
                                                    onChange={e => setAllergies(e.target.value)}
                                                    placeholder="Fortæl os gerne, hvis du har allergier eller særlige kostbehov"
                                                    rows={3}
                                                    className="rounded-lg px-2 pt-1 resize-none text-xs text-color-text placeholder-muted-foreground placeholder:text-xs border border-primary-30 focus:outline-primary"
                                                />
                                            </Wrapper>
                                        </>
                                    )}

                                    {error && <Error errorText={error} />}

                                    <Button type="button" variant="secondary" isLoading={isLoading} disabled={disableButton()} onClick={handleRSVPSubmit}>Bekræft deltagelse</Button>
                                </div>
                            </div>
                        </form>
                    </StaggeredItem>
                    <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                        <img src={invitationImage} alt="Invitation" className="h-full" />
                    </Modal>
                </Section>

            </StaggeredContent>
        </PageTransition>
    )
}

export default Invitation;