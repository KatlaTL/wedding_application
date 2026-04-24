import { Calendar, Gift, LogOut, LucideShield, MapPin, Users } from "lucide-react";
import PageTransition from "../../../components/PageTransition";
import StaggeredContent from "../../../components/StaggeredContent";
import StaggeredItem from "../../../components/StaggeredItem";
import Button from "../../../components/ui/Button";
import useAuth from "../../../hooks/useAuth";
import type { TabsType } from "../../../types/adminTypes";
import AnimatedTabs from "./shared/AnimatedTabs";
import AdminGuestList from "./AdminGuestList";
import { useState } from "react";
import AdminProgram from "./AdminProgram";

const AdminDashboard = () => {
    const { logout, user } = useAuth();
    
    const [activeTab, setActiveTab] = useState<number>(0);
    const [previousTab, setPreviousTab] = useState<number>(0);

    const handleTabChange = (value: number) => {
        setPreviousTab(activeTab);
        setActiveTab(value);
    }

    const tabs: TabsType[] = [
        {
            title: "Gæster",
            icon: Users,
            tabComponent: () => <AdminGuestList activeTab={activeTab} previousTab={previousTab} />
        },
        {
            title: "Program",
            icon: Calendar,
            tabComponent: () => <AdminProgram activeTab={activeTab} previousTab={previousTab} />
        },
        {
            title: "Lokationer",
            icon: MapPin,
            tabComponent: () => null
        },
        {
            title: "Ønskeliste",
            icon: Gift,
            tabComponent: () => null
        }
    ]

    const ActiveContent = tabs[activeTab].tabComponent;

    return (
        <PageTransition>
            <StaggeredContent>
                <section className="relative min-h-screen flex flex-col py-15 overflow-hidden ">
                    <div className="w-4xl md:mx-auto">
                        <StaggeredItem>
                            <div className="flex justify-between">
                                <div className="flex gap-3">
                                    <div className="flex rounded-full w-12 h-12 bg-primary/10 justify-center items-center self-center">
                                        <LucideShield className="h-6 w-6 mx-auto text-primary" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h2>Admin Panel</h2>
                                        <p>Administrere indholdet</p>
                                    </div>

                                </div>

                                <div className="flex gap-3 items-center">
                                    <div className="flex flex-col text-right text-sm min-w-50">
                                        <h4>{user?.displayName}</h4>
                                        <p>{user?.email}</p>
                                    </div>

                                    <div className="flex rounded-full w-10 h-10 bg-primary text-white justify-center items-center shrink-0">
                                        <span className="text-[24px]">{user?.displayName?.charAt(0)}</span>
                                    </div>

                                    <Button className="px-2" variant="primary" icon={LogOut} size="small" onClick={logout}>Logout</Button>
                                </div>
                            </div>
                        </StaggeredItem>

                        <StaggeredItem>
                            <div className="bg-background-muted rounded-lg border-primary-30 border p-5 mt-7 mb-5 xs:mx-auto mx-5 md:mx-0">
                                <AnimatedTabs tabs={tabs} activeTab={activeTab} setActiveTab={handleTabChange} />

                                <ActiveContent />
                            </div>
                        </StaggeredItem>
                    </div>
                </section>
            </StaggeredContent>
        </PageTransition >
    )
}

export default AdminDashboard;