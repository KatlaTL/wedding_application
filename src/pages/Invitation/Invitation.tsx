import { CheckCircle, Users, XCircle } from "lucide-react";
import Section from "../../components/Section"
import { Select, SelectContent, SelectIcon, SelectItem, SelectPortal, SelectScrollDownButton, SelectScrollUpButton, SelectValue, SelectViewport } from "../../components/Select";
import { SelectTrigger } from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import Button from "../../components/Button";

const Invitation = () => {

    return (
        <Section title="Bekræft deltagelse" description="Lad os vide, om du kommer!">

            <div className="bg-background-muted rounded-lg border-primary border p-5 w-120">
                <div className="flex flex-col items-start text-left gap-3">
                    <div className="flex gap-1.5">
                        <Users className="h-3.5 w-3.5 text-primary" />
                        <h3>Tilmelding</h3>
                    </div>

                    <div className="flex flex-col gap-2 w-full mb-2">
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
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <p className="!text-color-text">Deltager du?</p>
                        <div className="flex gap-2">
                            <Button size="small" icon={CheckCircle}>Ja, jeg kommer</Button>
                            <Button size="small" icon={XCircle}>Nej, desværre ikke</Button>
                        </div>
                    </div>


                </div>
            </div>
        </Section>
    )
}

export default Invitation;