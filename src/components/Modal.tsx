import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

type ModalType = {
    isOpen: boolean;
    onClose: () => void;
}

const Modal = ({ isOpen, onClose, children }: React.PropsWithChildren<ModalType>) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black/50  flex items-center justify-center z-50"
            onClick={onClose}
            initial={"hidden"}
            animate={"visible"}
            exit={"hidden"}
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
            }}
        >
            <motion.div
                className="bg-white rounded-lg shadow-lg pt-7 p-6 max-w-lg h-[95vh] relative"
                onClick={(e) => e.stopPropagation()}
                initial={"hidden"}
                animate={"visible"}
                variants={{
                    hidden: {
                        opacity: 0,
                        y: -20,
                        scale: 0.95,
                    },
                    visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                            duration: 0.6
                        }
                    },
                }}
            >
                <button className="absolute top-0 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold hover:cursor-pointer" onClick={onClose}>
                    &times;
                </button>
                {children}
            </motion.div>
        </motion.div>,
        document.getElementById("modal-root")!
    )
}

export default Modal;