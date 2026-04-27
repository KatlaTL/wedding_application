import { memo, useState } from "react";
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
import type { AdminEventType, AdminTabContentProps } from "../../../types/adminTypes";


const AdminProgram = ({ activeTab, previousTab }: AdminTabContentProps) => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const { program } = useProgram();

    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const modalTitle = isEditMode ? "Opdater begivenhed" : "Tilføj begivenhed";

    const initialEventData: AdminEventType = {
        time: "",
        description: "",
        lokation: "",
        title: "",
        icon: undefined
    }

    const [event, setEvent] = useState<AdminEventType>(initialEventData);

    const updateEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, target: keyof AdminEventType) => {
        setEvent(prev => ({
            ...prev,
            [target]: e.target.value
        }))
    }

    const modalClose = () => {
        setModalIsOpen(false);
        setIsEditMode(false);
        setEvent(initialEventData);
    }

    const selectItems: SelectItemType[] = [{
        name: "Users",
        iconKey: "users"
    }]

    return (
        <>
            <StaggeredItem initial={activeTab === previousTab ? false : "hidden"} variants={{
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
                        onEdit={() => {
                            setIsEditMode(true);
                            setModalIsOpen(true);
                            setEvent({
                                title: item.title,
                                description: item.description,
                                icon: item.icon,
                                lokation: item.location,
                                time: item.time
                            })
                        }}
                    />

                ))}

            </StaggeredItem>

            <Modal isOpen={modalIsOpen} onClose={modalClose}>
                <InnerModal title={modalTitle}>
                    <FormWrapper className="mb-4 flex-row gap-2">
                        <Input label="Tid" name="time" value={event.time} onChange={(e) => updateEvent(e, "time")} placeholder="14:00" required />
                        <Input label="Titel" name="title" value={event.title} onChange={(e) => updateEvent(e, "title")} placeholder="Vielse" required />
                    </FormWrapper>

                    <FormWrapper className="mb-4">
                        <TextArea
                            label="Beskrivelse"
                            name="description"
                            value={event.description}
                            onChange={(e) => updateEvent(e, "description")}
                            placeholder="Beskriv begivenheden..."
                            rows={3}
                            required
                        />
                        <Input label="Lokation" name="location" value={event.lokation} onChange={(e) => updateEvent(e, "lokation")} placeholder="Borgervænget 17, 5000 Odense" required />
                    </FormWrapper>

                    <FormWrapper className="mb-4">
                        <Select label="Ikon" items={selectItems} onValueChange={() => { }} required />
                    </FormWrapper>

                    <Button variant="secondary" size="small">{modalTitle}</Button>
                </InnerModal>
            </Modal>
        </>
    )
}

export default memo(AdminProgram);