import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./AlertDialogRadix";

type ConfirmDialogType = {
    onConfirm: () => void;
    onCancel: () => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    contextText?: string;
}

const ConfirmDialog = ({ onConfirm, onCancel, onOpenChange, open, contextText }: ConfirmDialogType) => {

    const description = contextText ? 
        `Denne handling kan ikke fortrydes. Dette vil permanent slette ${contextText} fra listen.` :
        "Denne handling kan ikke fortrydes."

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Er du helt sikker?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description} 
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmDialog;