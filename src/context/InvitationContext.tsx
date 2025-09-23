import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { InvitationContextI, InvitationStateType } from "../types/invitation.types";

const initialState: InvitationStateType = {
    isSubmitted: false,
};

const InvitationContext = createContext<InvitationContextI>({
    ...initialState,
    setIsSubmitted: () => { }
});

export const InvitationProvider = ({ children }: PropsWithChildren) => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(initialState.isSubmitted);

    return (
        <InvitationContext.Provider value={{
            isSubmitted,
            setIsSubmitted
        }}>
            {children}
        </InvitationContext.Provider>
    )
}

export const useInvitationContext = () => {
    const context = useContext(InvitationContext);
    if (context === undefined) {
        throw new Error('useInvitationContext must be used within a LoadingProvider');
    }
    return context;
};