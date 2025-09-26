import type { PropsWithChildren } from "react";
import { motion, stagger } from 'framer-motion';

type StaggeredContentType = {
    staggeredDelay?: number;
    initialDelay?: number;
    className?: string;
}

/**
 * Handles staggered animation by controlling the timing of its childrens animation. \
 * Should be used as a wrapper while StaggeredItem handles the actually animation of its children  
 * @param staggeredDelay - The delay between each of its childrens animation in seconds. Default value is 0.2
 * @param initialDelay - The inital delay before the first animation starts in seconds. Default value is 0.1
 */
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