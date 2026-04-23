import { Copy } from "lucide-react";
import Button from "./ui/Button";
import { useState } from "react";

const CopyClipboardButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);

            setCopied(true);

            // reset after a second
            setTimeout(() => setCopied(false), 1000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    }

    return (
        <div className="w-8 h-8 items-center flex">
            {copied ? (
                <span className="text-sm">Kopieret</span> 
            ) : (
                <Button variant="ghost" icon={Copy} onClick={handleCopy} />
            )}
        </div>
    )
}

export default CopyClipboardButton;