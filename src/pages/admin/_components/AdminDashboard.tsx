import PageTransition from "../../../components/PageTransition";
import Section from "../../../components/Section";
import StaggeredContent from "../../../components/StaggeredContent";
import Button from "../../../components/ui/Button";
import useAuth from "../../../hooks/useAuth";

const AdminDashboard = () => {
    const { logout } = useAuth();


    return (
        <PageTransition>
            <StaggeredContent>
                <Section title="Admin dashboard">
                    <Button variant="secondary" onClick={logout}>Logout</Button>
                </Section>
            </StaggeredContent>
        </PageTransition>
    )
}

export default AdminDashboard;