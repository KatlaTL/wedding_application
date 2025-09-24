import ReactDOM from 'react-dom';

type ModalType = {
    isOpen: boolean;
    onClose: () => void;
}

const Modal = ({ isOpen, onClose, children }: React.PropsWithChildren<ModalType>) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed top-0 left-0 w-full h-full bg-black/50  flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-lg pt-7 p-6 max-w-lg h-[95vh] relative" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-0 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold hover:cursor-pointer" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root")!
    )
}

export default Modal;