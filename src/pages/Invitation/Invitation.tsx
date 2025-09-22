import { Car, CheckCircle, Users, XCircle } from "lucide-react";
import Section from "../../components/Section"
import { Select, SelectContent, SelectIcon, SelectItem, SelectPortal, SelectScrollDownButton, SelectScrollUpButton, SelectValue, SelectViewport } from "../../components/Select";
import { SelectTrigger } from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import Button from "../../components/Button";
import HeadingWithIcon from "../../components/HeadingWithIcon";
import ButtonGroup from "./_components/ButtonGroup";
import Wrapper from "./_components/Wrapper";
import { Checkbox, CheckboxIndicator } from "../../components/Checkbox";
import { useState } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";
import InvitationCodeEntry from "./_components/InvitationCodeEntry";
import { useParams } from "react-router-dom";
import useInvitation from "../../hooks/useInvitation";

const Invitation = () => {
    const [isAttending, setIsAttending] = useState<boolean>();
    const [needLift, setNeedLift] = useState<boolean>();
    const [canOfferLift, setCanOfferLift] = useState<boolean>();
    const [dietary, setDietary] = useState<string>();
    const [allergies, setAllergies] = useState<string>();

    const { code } = useParams();
    const { validCodes } = useInvitation();

    const dietaryOptions: string[] = ["Veganer", "Vegetar", "Altspisende"];

    const handleCheckedChange = (checked: CheckedState, value: string) => {
        if (checked) {
            setDietary(value);
        }
    }

    if (!code) {
        return <InvitationCodeEntry />
    }

    return (
        <Section title="Bekræft deltagelse" description={`${validCodes[code].name} lad os vide, om du kommer!`}>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="bg-background-muted rounded-lg border-primary-30 border p-5 w-120">
                    <div className="flex flex-col items-start text-left gap-3">
                        <HeadingWithIcon icon={Users} text="Tilmelding" />

                        <Wrapper>
                            <ButtonGroup title="Deltager du?">
                                <Button size="small" icon={CheckCircle} variant={isAttending ? "secondary-no-hover" : "primary"} onClick={() => setIsAttending(true)}>Ja, jeg kommer</Button>
                                <Button size="small" icon={XCircle} variant={isAttending === false ? "destructive" : "primary"} onClick={() => setIsAttending(false)}>Nej, desværre ikke</Button>
                            </ButtonGroup>
                        </Wrapper>


                        {isAttending && (
                            <>
                                <Wrapper className="bg-muted rounded-lg p-2">
                                    <HeadingWithIcon icon={Car} text="Transport" className="mb-2" />

                                    <ButtonGroup title="Har du brug for et lift fra Odense?" className="mb-2">
                                        <Button size="small" className="!w-auto px-3" variant={needLift ? "secondary-no-hover" : "primary"} onClick={() => setNeedLift(true)}>Ja, jeg har behov for et lift</Button>
                                        <Button size="small" className="!w-auto px-3" variant={needLift === false ? "destructive" : "primary"} onClick={() => setNeedLift(false)}>Nej, jeg klare den</Button>
                                    </ButtonGroup>

                                    <ButtonGroup title="Kan du tilbyde et lift til andre gæster?">
                                        <Button size="small" className="!w-auto px-3" variant={canOfferLift ? "secondary-no-hover" : "primary"} onClick={() => setCanOfferLift(true)}>Ja, jeg kan tilbyde et lift</Button>
                                        <Button size="small" className="!w-auto px-3" variant={canOfferLift === false ? "destructive" : "primary"} onClick={() => setCanOfferLift(false)}>Nej, desværre ikke</Button>
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
                                                    {value}
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </Wrapper>

                                <Wrapper>
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

                        <Button variant="secondary" className="mt-4">Bekræft deltagelse</Button>
                    </div>
                </div>
            </form>
        </Section>
    )
}

export default Invitation;