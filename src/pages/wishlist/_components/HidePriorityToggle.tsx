import { useState } from "react";

type HidePriorityToggle = {
    children: (hide: boolean, toggle: () => void) => React.ReactNode;
}

/**
 * Render props function to handle toggle hide priority
 */
const HidePriorityToggle = ({ children }: HidePriorityToggle): React.ReactNode => {
    const [hidePriorityTags, setHidePriorityTags] = useState<boolean>(false);
    const handleHidePriorityClick = () => setHidePriorityTags(prev => !prev);

    return children(hidePriorityTags, handleHidePriorityClick);
}

export default HidePriorityToggle;