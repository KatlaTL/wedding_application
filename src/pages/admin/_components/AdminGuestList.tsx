import CopyClipboardButton from "../../../components/CopyClipboardButton";
import StaggeredItem from "../../../components/StaggeredItem";
import Button from "../../../components/ui/Button";
import type { Column } from "../../../components/ui/Table";
import Table from "../../../components/ui/Table";
import useAdmin from "../../../hooks/useAdmin";
import type { AdminGuestModalType, AdminGuestType, AdminTabContentProps } from "../../../types/adminTypes";
import Modal from "../../../components/Modal";
import { memo, useState } from "react";
import InnerModal from "./shared/InnerModal";
import FormWrapper from "../../../components/FormWrapper";
import Input from "../../../components/ui/Input";
import ActionButtons from "./shared/ActionButtons";
import TabContentHeading from "./shared/TabContentHeading";
import AttendingCheckbox from "./shared/AttendingCheckbox";
import Error from "../../../components/Error";
import { ALL_FIELDS_ARE_REQUIRED, SOMETHING_WENT_WRONG } from "../../../constants/errorMessages";
import BorderedBox from "./shared/BorderedBox";
import Loader from "../../../components/ui/Loader";
import DietaryOverviewOptions from "./shared/DietaryOverviewOptions";

const AdminGuestList = ({ activeTab, previousTab }: AdminTabContentProps) => {
    const { guestList, guestListIsLoading, addGuestMutation, deleteGuestMutation, dietaryOverview } = useAdmin();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const initialGuestData: AdminGuestModalType = {
        email: "",
        firstName: "",
        lastName: ""
    }

    const [guest, setGuest] = useState<AdminGuestModalType>(initialGuestData);

    const updateGuest = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, target: keyof AdminGuestModalType) => {
        setGuest(prev => ({
            ...prev,
            [target]: e.target.value
        }))
    }

    const handleAddGuest = () => {
        setError("");
        addGuestMutation.mutate({ guest: { firstName: guest.firstName, lastName: guest.lastName, email: guest.email } }, {
            onSuccess: () => {
                setModalIsOpen(false);
                setGuest(initialGuestData);
            },
            onError: (error) => {
                if (error.message === "ALL_FIELDS_ARE_REQUIRED") {
                    setError(ALL_FIELDS_ARE_REQUIRED);
                } else {
                    setError(SOMETHING_WENT_WRONG);
                }
            }
        })
    }

    const onCloseModal = () => {
        setModalIsOpen(false)
        setError("");
    }

    const totalParticipants = guestList.reduce((acc, current) => {
        if (current.isAttending) {
            return ++acc;
        }
        return acc;
    }, 0)

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
            key: "isAttending", label: "Deltager", render: (row) => (
                <div className="pl-2">
                    <AttendingCheckbox isChecked={row.isAttending} guestCode={row.invitationCode} />
                </div>
            )
        },
        {
            key: "action", label: "Handlinger", textFloat: "right", render: (row) => (
                <ActionButtons
                    row={row}
                    onDelete={(row) => deleteGuestMutation.mutate({ guestCode: row.invitationCode })}
                    excludeEdit={true}
                    rowText={row.name}
                />
            )
        }
    ]


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
                <TabContentHeading title="Gæsteliste" description="Administrer dine gæster og invitationskoder" ctaText="Tilføj gæst" onClick={() => setModalIsOpen(true)} />

                <BorderedBox>
                    <h4 className="text-base text-color-text font-medium">Gæsternes kostpræferencer</h4>

                    <div className="flex justify-around border-b border-[color:var(--color-primary-30)] py-5">
                        <DietaryOverviewOptions dietaryOverview={dietaryOverview} option="Vegan" />
                        <DietaryOverviewOptions dietaryOverview={dietaryOverview} option="Vegetarian" />
                        <DietaryOverviewOptions dietaryOverview={dietaryOverview} option="Omnivore" />
                    </div>

                    <div className="mt-3">
                        <h4 className="text-sm text-color-text font-medium mb-2">Allergier og særlige hensyn:</h4>

                        {dietaryOverview.allergies.map(item => {
                            const name = Object.keys(item)[0];
                            const allergy = item[name];

                            return (
                                <div key={name} className="bg-muted/50 rounded p-2 mb-1">
                                    <p className="text-sm text-color-text">{name}: <span className="text-muted-foreground">{allergy}</span></p>
                                </div>
                            )
                        })}
                    </div>
                </BorderedBox>

                <BorderedBox>
                    <div className="flex justify-between">
                        <h4 className="text-base text-color-text font-medium">Antal gæster: {guestList.length} </h4>
                        <h4 className="text-base text-color-text font-medium">Antal deltager: {totalParticipants} </h4>
                    </div>

                    {guestListIsLoading ? (
                        <Loader />
                    ) : (
                        <Table columns={guestListColumns} data={guestList} />
                    )}
                </BorderedBox>
            </StaggeredItem>

            <Modal isOpen={modalIsOpen} onClose={onCloseModal}>
                <InnerModal title="Tilføj ny gæst">
                    <FormWrapper className="mb-4 flex-row gap-2">
                        <Input label="Fornavn" name="guestFirestName" value={guest.firstName} onChange={(e) => updateGuest(e, "firstName")} placeholder="John" required={true} />
                        <Input label="Efternavn" name="guestLastName" value={guest.lastName} onChange={(e) => updateGuest(e, "lastName")} placeholder="Smith" required={true} />
                    </FormWrapper>

                    <FormWrapper className="mb-4">
                        <Input label="Email" name="guestEmail" value={guest.email} onChange={(e) => updateGuest(e, "email")} placeholder="john@example.com" required={true} />
                    </FormWrapper>

                    {error && <Error errorText={error} className="mb-3" />}

                    <Button variant="secondary" size="small" onClick={handleAddGuest}>Tilføj gæst</Button>
                </InnerModal>
            </Modal>
        </>
    )
}

export default memo(AdminGuestList);