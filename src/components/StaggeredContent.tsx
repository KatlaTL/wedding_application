import type { PropsWithChildren } from "react";
import { motion, stagger } from 'framer-motion';

type StaggeredContentType = {
    staggeredDelay?: number;
    initialDelay?: number;
    className?: string;
}

const StaggeredContent = ({ className = "", initialDelay = 0.1, staggeredDelay = 0.2, children }: PropsWithChildren<StaggeredContentType>) => {
    return (
        <motion.div
            className={className}
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        when: "beforeChildren",
                        delayChildren: stagger(staggeredDelay, { startDelay: initialDelay })
                    }
                }
            }}
        >
            {children}
        </motion.div>
    )
}

export default StaggeredContent;