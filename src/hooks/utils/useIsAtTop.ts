import { useEffect, useState } from "react";

/**
 * Tracks whether the window scroll position is within a given distance from the top
 * @param threshold Threshold Distance in pixels from the top to consider as "at top"
 * @returns Boolean indicating if the scroll position is within the threshold
 */
const useIsAtTop = (threshold: number): boolean => {
    const [isAtTop, setIsAtTop] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY <= threshold)
        }

        window.addEventListener("scroll", handleScroll);

        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return isAtTop;
} 

export default useIsAtTop;