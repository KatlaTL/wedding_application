import { motion } from 'framer-motion';
import type { TabsType } from '../../../../types/adminTypes';
import Button from '../../../../components/ui/Button';

type AnimatedTabsProps = {
    tabs: TabsType[];
    activeTab: number;
    setActiveTab: (value: number) => void;
}

const AnimatedTabs = ({ tabs, activeTab, setActiveTab }: AnimatedTabsProps) => {

    return (
        <div className="relative flex gap-1 bg-muted px-1 rounded-full">
            <motion.div
                className="absolute left-1 rounded-full my-1 bg-white h-8 z-0"
                style={{
                    width: `${100 / tabs.length}%`,
                }}
                animate={{ transform: `translateX(${activeTab * 100}%)` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            {tabs.map((tab, index) => (
                <Button
                    key={tab.title + index}
                    variant="tab"
                    size="small"
                    className={"z-10"}
                    icon={tab.icon}
                    onClick={() => setActiveTab(index)}
                >
                    {tab.title}
                </Button>
            ))}
        </div>
    )
}

export default AnimatedTabs;