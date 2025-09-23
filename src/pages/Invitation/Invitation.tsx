import { Car, CheckCircle, Mail, RotateCcw, Users, XCircle } from "lucide-react";
import Section from "../../components/Section"
import { CheckIcon } from "@radix-ui/react-icons";
import Button, { type ButtonVariant } from "../../components/Button";
import HeadingWithIcon from "../../components/HeadingWithIcon";
import ButtonGroup from "./_components/ButtonGroup";
import Wrapper from "./_components/Wrapper";
import { Checkbox, CheckboxIndicator } from "../../components/Checkbox";
import { useState } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";
import InvitationCodeEntry from "./_components/InvitationCodeEntry";
import { useNavigate, useParams } from "react-router-dom";
import useInvitation from "../../hooks/useInvitation";
import RSVPSubmitted from "./_components/RSVPSubmitted";
import type { DietaryType } from "../../types/invitation.types";
import { DietaryLabels } from "../../constants/dietaryLabels";
import Error from "./_components/Error";

const Invitation = () => {
    const [isAttending, setIsAttending] = useState<boolean>();
    const [needLift, setNeedLift] = useState<boolean>();
    const [canOfferLift, setCanOfferLift] = useState<boolean>();
    const [dietary, setDietary] = useState<DietaryType>();
    const [allergies, setAllergies] = useState<string>();
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();
    const { code } = useParams();
    const { validCodes, saveRSVP, isSubmitted, removeCode } = useInvitation();

    const dietaryOptions: DietaryType[] = ["Vegetarian", "Vegan", "Omnivore"];

    const handleCheckedChange = (checked: CheckedState, value: DietaryType) => {
        if (checked) {
            setDietary(value);
        }
    }

    const handleNewCodeClick = () => {
        removeCode();
        navigate("/invitation");
    }

    const handleRSVPSubmit = () => {
        setError("");

        saveRSVP();
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
        return <RSVPSubmitted />
    }

    if (!code) {
        return <InvitationCodeEntry />
    }

    return (
        <Section title="Bekræft deltagelse" description={`${validCodes[code].name} lad os vide, om du kommer!`}>
            <div className="bg-background-muted rounded-lg border-primary-30 border p-5 w-120 mt-7 mb-5">
                <Wrapper>
                    <ButtonGroup className="mx-auto">
                        <Button size="small" icon={Mail} className="w-45!">Se din invitation</Button>
                        <Button size="small" icon={RotateCcw} className="w-45!" onClick={handleNewCodeClick}>Indtast en anden kode</Button>
                    </ButtonGroup>
                </Wrapper>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="bg-background-muted rounded-lg border-primary-30 border p-5 w-120">
                    <div className="flex flex-col items-start text-left gap-3">
                        <HeadingWithIcon icon={Users} text="Tilmelding" />

                        <Wrapper>
                            <ButtonGroup title="Deltager du?">
                                <Button size="small" icon={CheckCircle} variant={setButtonVariant(isAttending, "secondary")} onClick={() => setIsAttending(true)}>Ja, jeg kommer</Button>
                                <Button size="small" icon={XCircle} variant={setButtonVariant(isAttending, "destructive")} onClick={() => setIsAttending(false)}>Nej, desværre ikke</Button>
                            </ButtonGroup>
                        </Wrapper>


                        {isAttending && (
                            <>
                                <Wrapper className="bg-muted rounded-lg p-2">
                                    <HeadingWithIcon icon={Car} text="Transport" className="mb-2" />

                                    <ButtonGroup title="Har du brug for et lift fra Odense?" className="mb-2">
                                        <Button size="small" className="!w-auto px-3" variant={setButtonVariant(needLift, "secondary")} onClick={() => setNeedLift(true)}>Ja, jeg har behov for et lift</Button>
                                        <Button size="small" className="!w-auto px-3" variant={setButtonVariant(needLift, "destructive")} onClick={() => setNeedLift(false)}>Nej, jeg klare den</Button>
                                    </ButtonGroup>

                                    <ButtonGroup title="Kan du tilbyde et lift til andre gæster?">
                                        <Button size="small" className="!w-auto px-3" variant={setButtonVariant(canOfferLift, "secondary")} onClick={() => setCanOfferLift(true)}>Ja, jeg kan tilbyde et lift</Button>
                                        <Button size="small" className="!w-auto px-3" variant={setButtonVariant(canOfferLift, "destructive")} onClick={() => setCanOfferLift(false)}>Nej, desværre ikke</Button>
                                    </ButtonGroup>
                                </Wrapper>


                                <Wrapper className="bg-muted rounded-lg p-2 !flex-row text-xs text-color-text">
                                    <div className="flex gap-5">
                                        {dietaryOptions.map(value =>
                                            <div className="flex gap-1 text-xs">
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

                        <Button variant="secondary" className="" disabled={disableButton()} onClick={handleRSVPSubmit}>Bekræft deltagelse</Button>
                    </div>
                </div>
            </form>
        </Section>
    )
}

export default Invitation;