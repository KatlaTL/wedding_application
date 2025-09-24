import { motion } from 'framer-motion';
import type { PropsWithChildren } from "react";

const PageTransition = ({ children }: PropsWithChildren) => {

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut'}}
        >
            {children}
        </motion.div>
    )
}

export default PageTransition;