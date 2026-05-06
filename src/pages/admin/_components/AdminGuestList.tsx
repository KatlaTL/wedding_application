import CopyClipboardButton from "../../../components/CopyClipboardButton";
import StaggeredItem from "../../../components/StaggeredItem";
import Button from "../../../components/ui/Button";
import type { Column } from "../../../components/ui/Table";
import Table from "../../../components/ui/Table";
import useAdmin from "../../../hooks/useAdmin";
import { isAdminGuestModalKey, type AdminGuestModalType, type AdminGuestType, type AdminTabContentProps } from "../../../types/adminTypes";
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
import DietaryOptions from "../../../components/DietaryOptions";
import type { DietaryType } from "../../../types/invitationTypes";

const AdminGuestList = ({ activeTab, previousTab }: AdminTabContentProps) => {
    const { guestList, guestListIsLoading, addGuestMutation, deleteGuestMutation, dietaryOverview, updateGuestMutation } = useAdmin();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const initialGuestData: AdminGuestModalType = {
        email: "",
        firstName: "",
        lastName: "",
        allergies: "",
        dietary: undefined,
        invitationCode: ""
    }

    const [guest, setGuest] = useState<AdminGuestModalType>(initialGuestData);

    const updateGuest = <K extends keyof AdminGuestModalType>(value: AdminGuestModalType[K], target: keyof AdminGuestModalType) => {
        setGuest(prev => ({
            ...prev,
            [target]: value
        }))
    }

    const mutateOptions = {
        onSuccess: () => {
            setModalIsOpen(false);
            setGuest(initialGuestData);
        },
        onError: (error: unknown) => {
            const err = error as Error;

            if (err.message === "ALL_FIELDS_ARE_REQUIRED") {
                setError(ALL_FIELDS_ARE_REQUIRED);
            } else {
                setError(SOMETHING_WENT_WRONG);
            }
        }
    }

    const handleAddGuest = () => {
        setError("");
        addGuestMutation.mutate({
            guest: {
                firstName: guest.firstName,
                lastName: guest.lastName,
                email: guest.email
            }
        }, mutateOptions)
    }

    const handleUpdateGuest = () => {
        setError("");
        updateGuestMutation.mutate({
            guest: {
                firstName: guest.firstName,
                lastName: guest.lastName,
                email: guest.email,
                dietary: guest.dietary,
                allergies: guest.allergies
            },
            guestCode: guest.invitationCode
        }, mutateOptions)
    }

    const editGuest = (guest: AdminGuestType) => {
        (Object.entries(guest) as [keyof AdminGuestType, AdminGuestType[keyof AdminGuestType]][]).forEach(([key, value]) => {
            if (isAdminGuestModalKey(key) && value !== undefined) {
                updateGuest(value as string, key);
            }
        })

        setModalIsOpen(true);
        setEditMode(true);
    }

    const onCloseModal = () => {
        setModalIsOpen(false)
        setEditMode(false);
        setError("");
        setGuest(initialGuestData);
    }

    const totalParticipants = guestList.reduce((acc, current) => {
        if (current.isAttending) {
            return ++acc;
        }
        return acc;
    }, 0)

    const modalTitle = editMode ? "Opdater gæst" : "Tilføj ny gæst";

    const modalCtaText = editMode ? "Opdater gæst" : "Tilføj gæst";

    const handleModalCta = editMode ? handleUpdateGuest : handleAddGuest;

    const guestListColumns: Column<AdminGuestType>[] = [
        { key: "fullName", label: "Navn", render: (row) => <span className="font-medium">{row.fullName}</span> },
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
                    onEdit={(row) => editGuest(row)}
                    rowText={row.fullName}
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

                        {dietaryOverview.allergies.map((item, index) => {
                            const name = Object.keys(item)[0];
                            const allergy = item[name];

                            return (
                                <div key={name + index} className="bg-muted/50 rounded p-2 mb-1">
                                    <p className="text-sm text-color-text">{name}: <span className="text-muted-foreground">{allergy}</span></p>
                                </div>
                            )
                        })}
                    </div>
                </BorderedBox>

                <BorderedBox>
                    <div className="flex justify-between">
                        <h4 className="text-base text-color-text font-medium">Inviterede: {guestList.length} </h4>
                        <h4 className="text-base text-color-text font-medium">Deltager: {totalParticipants} </h4>
                    </div>

                    {guestListIsLoading ? (
                        <Loader />
                    ) : (
                        <Table columns={guestListColumns} data={guestList} />
                    )}
                </BorderedBox>
            </StaggeredItem>

            <Modal isOpen={modalIsOpen} onClose={onCloseModal}>
                <InnerModal title={modalTitle}>
                    <FormWrapper className="mb-4 flex-row gap-2">
                        <Input label="Fornavn" name="guestFirestName" value={guest.firstName} onChange={(e) => updateGuest(e.target.value, "firstName")} placeholder="John" required={true} />
                        <Input label="Efternavn" name="guestLastName" value={guest.lastName} onChange={(e) => updateGuest(e.target.value, "lastName")} placeholder="Smith" required={true} />
                    </FormWrapper>

                    <FormWrapper className="mb-4">
                        <Input label="Email" name="guestEmail" value={guest.email} onChange={(e) => updateGuest(e.target.value, "email")} placeholder="john@example.com" required={true} />
                    </FormWrapper>

                    {editMode && (
                        <>
                            <DietaryOptions dietary={guest.dietary} setDietary={(value: DietaryType) => updateGuest(value, "dietary")} className="mb-4" />

                            <FormWrapper className="mb-4">
                                <p className="!text-color-text">Kostrestriktioner eller allergier?</p>

                                <textarea
                                    name="dietary"
                                    value={guest.allergies ?? ""}
                                    onChange={e => updateGuest(e.target.value, "allergies")}
                                    placeholder="Allergier eller særlige kostbehov"
                                    rows={3}
                                    className="rounded-lg px-2 pt-1 resize-none text-sm text-color-text placeholder-muted-foreground placeholder:text-sm border border-primary-30 focus:outline-primary"
                                />
                            </FormWrapper>
                        </>
                    )}

                    {error && <Error errorText={error} className="mb-3" />}

                    <Button variant="secondary" size="small" onClick={handleModalCta}>{modalCtaText}</Button>
                </InnerModal>
            </Modal>
        </>
    )
}

export default memo(AdminGuestList);