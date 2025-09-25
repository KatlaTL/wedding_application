import type { PropsWithChildren } from "react";
import { motion } from 'framer-motion';

type StaggeredItemType = {
    className?: string;
    delay?: number;
    duration?: number;
}

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