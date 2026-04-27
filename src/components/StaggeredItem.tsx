import type { PropsWithChildren } from "react";
import { motion, type TargetAndTransition, type VariantLabels, type Variants } from 'framer-motion';

type StaggeredItemType = {
    className?: string;
    delay?: number;
    duration?: number;
    variants?: Variants
    initial?: boolean | TargetAndTransition | VariantLabels | undefined;
}

/**
 * Handles the staggered animation of a component or a group of components. Used as a wrapper. \
 * StaggeredItem most be inside a StaggeredContent component to work.
 * @param delay - Delays the animation in seconds. Default value is 0
 * @param duration - The duration of the transition in seconds. Default value is 0.6
 * @returns 
 */
const StaggeredItem = ({ className = "", delay = 0, duration = 0.6, variants, initial, children }: PropsWithChildren<StaggeredItemType>) => {
    const animation: Variants = variants ? variants : {
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
    };

    return (
        <motion.div
            className={className}
            variants={animation}
            initial={initial}
        >
            {children}
        </motion.div>
    )
}

export default StaggeredItem;