import { Edit, Trash2 } from "lucide-react";
import Button from "../../../../components/ui/Button";
import ConfirmDialog from "../../../../components/ui/ConfirmDialog";
import { useState } from "react";

type ActionButtonsType<T> = {
  excludeEdit?: boolean;
  row: T;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  rowText?: string;
}

const ActionButtons = <T,>({ row, onDelete, onEdit, excludeEdit = false, rowText }: ActionButtonsType<T>) => {

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-row mr-auto max-w-15">
      {!excludeEdit && (
        <Button
          variant="ghost"
          className="active:bg-tertiary"
          icon={Edit}
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(row)
          }}></Button>
      )}

      <Button
        variant="ghost"
        className="text-destructive active:bg-destructive/35"
        icon={Trash2}
        iconStyle="text-red-600"
        onClick={(e) => {
          e.stopPropagation();
          setDialogIsOpen(true);
        }} />

      <ConfirmDialog
        open={dialogIsOpen}
        onOpenChange={setDialogIsOpen}
        onConfirm={() => onDelete?.(row)}
        onCancel={() => setDialogIsOpen(false)}
        contextText={rowText}
      />
    </div>
  )
};

export default ActionButtons;