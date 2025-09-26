import type { PropsWithChildren } from "react";
import { motion } from 'framer-motion';

type StaggeredItemType = {
    className?: string;
    delay?: number;
    duration?: number;
}

/**
 * Handles the staggered animation of a component or a group of components. Used as a wrapper. \
 * StaggeredItem most be inside a StaggeredContent component to work.
 * @param delay - Delays the animation in seconds. Default value is 0
 * @param duration - The duration of the transition in seconds. Default value is 0.6
 * @returns 
 */
const StaggeredItem = ({ className = "", delay = 0, duration = 0.6, children }: PropsWithChildren<StaggeredItemType>) => {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: {
                    opacity: 0,
                    y: 30,
                    scale: 0.95
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                        duration,
                        delay,
                        ease: "easeInOut",
                    }
                }
            }}
        >
            {children}
        </motion.div>
    )
}

export default StaggeredItem;