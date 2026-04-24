import CopyClipboardButton from "../../../components/CopyClipboardButton";
import StaggeredItem from "../../../components/StaggeredItem";
import Button from "../../../components/ui/Button";
import type { Column } from "../../../components/ui/Table";
import Table from "../../../components/ui/Table";
import useAdmin from "../../../hooks/useAdmin";
import type { AdminGuestType, AdminTabContentProps } from "../../../types/adminTypes";
import Modal from "../../../components/Modal";
import { useState } from "react";
import InnerModal from "./shared/InnerModal";
import FormWrapper from "../../../components/FormWrapper";
import Input from "../../../components/ui/Input";
import ActionButtons from "./shared/ActionButtons";
import TabContentHeading from "./shared/TabContentHeading";

const AdminGuestList = ({ activeTab, previousTab }: AdminTabContentProps) => {
    const { guestList } = useAdmin();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const guestListColumns: Column<AdminGuestType>[] = [
        { key: "name", label: "Navn", render: (row) => <span className="font-medium">{row.name}</span> },
        { key: "email", label: "Email" },
        {
            key: "invitationCode", label: "Invitations kode", render: (row) => (
                <div className="flex gap-2">
                    <div className="bg-muted p-1.5 w-fit">
                        {row.invitationCode}
                    </div>
                    <CopyClipboardButton text={row.invitationCode} />
                </div>
            )
        },
        {
            key: "action", label: "Handlinger", textFloat: "right", render: (row) => (
                <ActionButtons
                    row={row}
                    onDelete={(row) => { }} //TO-DO add delete logic
                    excludeEdit={false}
                />
            )
        }
    ]


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
                <TabContentHeading title="Gæsteliste" description="Administrer dine gæster og invitationskoder" ctaText="Tilføj gæst" onClick={() => setModalIsOpen(true)} />

                <div className="bg-background-muted rounded-lg border-primary-30 border p-5 mb-5 xs:mx-auto mx-5 md:mx-0">
                    <h4 className="text-base">Antal gæster: {guestList.length} </h4>

                    <Table columns={guestListColumns} data={guestList} />
                </div>
            </StaggeredItem>

            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                <InnerModal title="Tilføj ny gæst">
                    <FormWrapper className="mb-4">
                        <Input label="Navn" name="guestName" value="" placeholder="John Smith" required={true} />
                        <Input label="Email" name="guestEmail" value="" placeholder="john@example.com" required={true} />
                    </FormWrapper>

                    <Button variant="secondary" size="small">Tilføj gæst</Button>
                </InnerModal>
            </Modal>
        </>
    )
}

export default AdminGuestList;