import { useState } from "react";
import StaggeredItem from "../../../components/StaggeredItem"
import TabContentHeading from "./shared/TabContentHeading";
import AdminProgramTile from "./shared/AdminProgramTile";
import useProgram from "../../../hooks/useProgram";
import Modal from "../../../components/Modal";
import InnerModal from "./shared/InnerModal";
import FormWrapper from "../../../components/FormWrapper";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import TextArea from "../../../components/ui/TextArea";
import Select from "../../../components/ui/Select";
import type { SelectItemType } from "../../../types/utilsTypes";
import type { AdminTabContentProps } from "../../../types/adminTypes";


const AdminProgram = ({ activeTab, previousTab }: AdminTabContentProps) => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const { program } = useProgram();

    const selectItems: SelectItemType[] = [{
        name: "Users",
        iconKey: "users"
    }]

    return (
        <>
            <StaggeredItem variants={{
                hidden: {
                    opacity: 0,
                    x: activeTab > previousTab ? -10 : 10,
                    scale: 1
                },
                visible: {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: {
                        duration: 0.6,
                        delay: 0,
                        ease: "easeInOut",
                    }
                }
            }}>
                <TabContentHeading title="Program" description="Administrer og planlæg programmets begivenheder" ctaText="Tilføj begivenhed" onClick={() => setModalIsOpen(true)} />

                {program.map((item, index) => (
                    <AdminProgramTile
                        key={item.title + index}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                        location={item.location}
                        time={item.time}
                    />

                ))}

            </StaggeredItem>

            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                <InnerModal title="Tilføj ny gæst">
                    <FormWrapper className="mb-4 flex-row gap-2">
                        <Input label="Navn" name="guestName" value="" placeholder="John Smith" required />
                        <Input label="Email" name="guestEmail" value="" placeholder="john@example.com" required />
                    </FormWrapper>

                    <FormWrapper className="mb-4">
                        <TextArea
                            label="Beskrivelse"
                            name="description"
                            value={""}
                            placeholder="Beskriv begivenheden..."
                            rows={3}
                            required
                        />
                        <Input label="Lokation" name="location" value="" placeholder="Borgervænget 17, 5000 Odense" required />
                    </FormWrapper>

                    <FormWrapper className="mb-4">
                        <Select label="Ikon" items={selectItems} onValueChange={() => { }} required />
                    </FormWrapper>

                    <Button variant="secondary" size="small">Tilføj begivenhed</Button>
                </InnerModal>
            </Modal>
        </>
    )
}

export default AdminProgram;