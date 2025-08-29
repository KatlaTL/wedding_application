import { Car, CheckCircle, Users, XCircle } from "lucide-react";
import Section from "../../components/Section"
import { Select, SelectContent, SelectIcon, SelectItem, SelectPortal, SelectScrollDownButton, SelectScrollUpButton, SelectValue, SelectViewport } from "../../components/Select";
import { SelectTrigger } from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import Button from "../../components/Button";
import HeadingWithIcon from "../../components/HeadingWithIcon";
import ButtonGroup from "./_components/ButtonGroup";
import Wrapper from "./_components/Wrapper";

const Invitation = () => {

    const dietaryOptions: string[] = ["Veganer", "Vegetar", "Altspisende"];

    return (
        <Section title="Bekræft deltagelse" description="Lad os vide, om du kommer!">

            <div className="bg-background-muted rounded-lg border-primary border p-5 w-120">
                <div className="flex flex-col items-start text-left gap-3">
                    <HeadingWithIcon icon={Users} text="Tilmelding" />

                    <Wrapper className="mb-2">
                        <p className="!text-color-text">Find dit navn</p>

                        <Select>
                            <SelectTrigger className="SelectTrigger rounded-lg cursor-pointer flex w-full border-[var(--color-primary)] border outline-none text-left text-xs px-1.5 py-1 text-muted-foreground justify-between focus:outline-none" aria-label="Name">
                                <SelectValue placeholder="Vælg dit navn på listen" />
                                <SelectIcon className="SelectIcon">
                                    <ChevronDownIcon />
                                </SelectIcon>
                            </SelectTrigger>

                            <SelectPortal>
                                <SelectContent className="w-full rounded-lg text-muted-foreground bg-white border border-primary text-xs overflow-hidden rounder-lg">
                                    <SelectScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-muted-foreground">
                                        <ChevronUpIcon />
                                    </SelectScrollUpButton>

                                    <SelectViewport>
                                        <SelectItem value="asger">Asger</SelectItem>
                                        <SelectItem value="rikke">Rikke</SelectItem>
                                        <SelectItem value="jakob">Jakob</SelectItem>
                                    </SelectViewport>

                                    <SelectScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-muted-foreground">
                                        <ChevronDownIcon />
                                    </SelectScrollDownButton>
                                </SelectContent>
                            </SelectPortal>

                        </Select>
                    </Wrapper>

                    <Wrapper>
                        <ButtonGroup title="Deltager du?">
                            <Button size="small" icon={CheckCircle}>Ja, jeg kommer</Button>
                            <Button size="small" icon={XCircle}>Nej, desværre ikke</Button>
                        </ButtonGroup>
                    </Wrapper>

                    <Wrapper className="bg-muted rounded-lg p-2">
                        <HeadingWithIcon icon={Car} text="Transport" />

                        <ButtonGroup title="Har du brug for et lift fra Odense?" className="mb-">
                            <Button size="small" className="!w-auto px-3">Ja, jeg har behov for et lift</Button>
                            <Button size="small" className="!w-auto px-3">Nej, jeg klare den</Button>
                        </ButtonGroup>

                        <ButtonGroup title="Kan du tilbyde et lift til andre gæster?">
                            <Button size="small" className="!w-auto px-3">Ja, jeg kan tilbyde et lift</Button>
                            <Button size="small" className="!w-auto px-3">Nej, desværre ikke</Button>
                        </ButtonGroup>
                    </Wrapper>

                    <Wrapper className="bg-muted rounded-lg p-2 !flex-row text-xs text-color-text">
                        {dietaryOptions.map(value => (
                            <label key="value" >
                                <input
                                    className=""
                                    type="checkbox"
                                />
                                {value}
                            </label>
                        ))}
                    </Wrapper>

                    <Wrapper>
                        <p className="!text-color-text">Har du kostrestriktioner eller allergier? (valgfrit)</p>

                        <textarea
                            name="dietary"
                            placeholder="Fortæl os gerne, hvis du har allergier eller særlige kostbehov"
                            rows={3}
                            className="rounded-lg px-2 pt-1 resize-none text-xs text-color-text placeholder-muted-foreground placeholder:text-xs border border-primary focus:outline-primary"
                        />
                    </Wrapper>

                    <Button variant="secondary">Bekræft deltagelse</Button>

                </div>
            </div>
        </Section>
    )
}

export default Invitation;