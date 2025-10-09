/* import { useEffect } from "react";

const useMediaQuery = () => {

    useEffect(() => {

            const checkWidth = () => {
                if (window.innerWidth >= 768) {
                    setIsOpen(false);
                }
            }
    
            checkWidth();
    
            window.addEventListener("resize", checkWidth);
    
            return () => window.removeEventListener("resize", checkWidth);
        }, []);
}

export default useMediaQuery; */