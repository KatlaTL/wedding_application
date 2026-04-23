import CopyClipboardButton from "../../../components/CopyClipboardButton";
import StaggeredItem from "../../../components/StaggeredItem";
import type { Column } from "../../../components/ui/Table";
import Table from "../../../components/ui/Table";
import useAdmin from "../../../hooks/useAdmin";
import type { AdminGuestType } from "../../../types/adminTypes";
import ActionButtons from "./ActionButtons";

const AdminGuestList = () => {
    const { guestList } = useAdmin();

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
                    onDelete={(row) => { }}
                    excludeEdit={false}
                />
            )
        }
    ]

    return (
        <StaggeredItem>
            <div className="mt-10">
                <h3 className="text-color-text font-medium text-lg">Gæsteliste</h3>
                <p>Administrer dine gæster og invitationskoder</p>
            </div>

            <div className="bg-background-muted rounded-lg border-primary-30 border p-5 mt-5 mb-5 xs:mx-auto mx-5 md:mx-0">
                <h4 className="text-base">Antal gæster: {guestList.length} </h4>

                <Table columns={guestListColumns} data={guestList} />
            </div>
        </StaggeredItem>
    )
}

export default AdminGuestList;