import { Lock, LucideShield } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import HeadingWithIcon from "../../../components/HeadingWithIcon";
import PageTransition from "../../../components/PageTransition"
import Section from "../../../components/Section";
import StaggeredContent from "../../../components/StaggeredContent";
import StaggeredItem from "../../../components/StaggeredItem";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const AdminGoogleSignIn = () => {
    const navigate = useNavigate();
    const { login, isLoading } = useAuth();

    const handleBackClick = () => navigate(`/`);

    const handleLoginClick = () => login();

    return (
        <PageTransition>
            <StaggeredContent>
                <StaggeredItem>
                    <div className="relative top-25">
                        <div className="flex mx-auto rounded-full w-14 h-14 bg-primary/10 justify-center items-center">
                            <LucideShield className="h-8 w-8 mx-auto text-primary" />
                        </div>
                    </div>
                </StaggeredItem>
                <Section title="Admin Panel" description="Login for at administrere gæstelisten, program, lokationer og ønskeliste">
                    <StaggeredItem className="justify-items-center">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="bg-background-muted rounded-lg border-primary-30 md:w-120 border p-5 md:mx-0">
                                <div className="flex flex-col items-start text-left gap-3">
                                    <HeadingWithIcon icon={Lock} text="Authentication påkrævet" />

                                    <p>Log venligst ind med din Google-konto for at få adgang til administrationspanelet.</p>

                                    <Button variant="plain" className="text-sm" isLoading={isLoading} loadingText="Logger ind..." icon={FcGoogle} onClick={handleLoginClick}>Sign in with Google</Button>
                                </div>
                            </div>
                        </form>

                        <div className="w-50 mt-5">
                            <Button variant="primary" size="small" className="!border-none" onClick={handleBackClick}>Tilbage til forsiden</Button>
                        </div>
                    </StaggeredItem>
                </Section>
            </StaggeredContent>
        </PageTransition>
    )
}

export default AdminGoogleSignIn;