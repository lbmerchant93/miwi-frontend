import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box, { BoxProps } from '@mui/material/Box';
import { useParams, useNavigate } from 'react-router-dom';
import FirstTimeAppFlow from '../FirstTimeAppFlow/FirstTimeAppFlow';
import AppFeatures from '../AppFeatures/AppFeatures';
import AppTerms from '../AppTerms/AppTerms';

export enum HowMiWiWorksPageRoutes {
    firstTimeAppFlow = "first-time-app-flow",
    appFeatures = "app-features",
    appTerms = "app-terms"
};

const howMiWiWorksPageMap = [
    {
        route: HowMiWiWorksPageRoutes.firstTimeAppFlow,
        label: "First Time App Flow",
        tab: "first-time-app-flow",
        Component: FirstTimeAppFlow
    }, {
        route: HowMiWiWorksPageRoutes.appFeatures,
        label: "App Features",
        tab: "app-features",
        Component: AppFeatures
    }, {
        route: HowMiWiWorksPageRoutes.appTerms,
        label: "App Terms",
        tab: "app-terms",
        Component: AppTerms
    }
];

const HowMiWiWorksTabs: React.FC<{ selectedTab: string; }> = (props) => {
    const { selectedTab } = props;
    const navigate = useNavigate();
    const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
        navigate(`/how-miwi-works/${newValue}`)
    };

    return (
        <Tabs
            value={selectedTab}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="primary"
            orientation="vertical"
        >
            {howMiWiWorksPageMap.map(({ label, route }) => (
                <Tab 
                    key={route}
                    label={label}
                    value={route}
                    id={route}
                />
            ))}
        </Tabs>
    )
};

interface HowMiWiWorksTabPanelProps extends BoxProps {
    isSelected: boolean;
    value: string;
};

const HowMiWiWorksTabPanel: React.FC<HowMiWiWorksTabPanelProps> = (props) => {
    const { children, value, isSelected, ...other } = props;

    return (
        <Box
        role="tabpanel"
        hidden={!isSelected} 
        id={`tabpanel-${value}`} 
        aria-labelledby={`tab-${value}`} 
        {...other}
        >
            {isSelected && children}
        </Box>
    )
};

interface HowMiWiWorksPanelViewsProps {
    selectedPanel: string; 
};

const HowMiWiWorksPanelViews: React.FC<HowMiWiWorksPanelViewsProps> = (props) => {
    const { selectedPanel } = props;

    return (
        <>
            {howMiWiWorksPageMap.map(({ route }) => (
                <HowMiWiWorksTabPanel isSelected={selectedPanel === route} value={route} key={route}>
                    
                </HowMiWiWorksTabPanel>
            ))}
        </>
    )
};

interface HowMiWiWorksPanelProps {
    
}

const HowMiWiWorksPanel: React.FC<HowMiWiWorksPanelProps> = (props) => {
    const { tab } = useParams();
    const navigate = useNavigate();
    const panelRoutes = React.useMemo(() => howMiWiWorksPageMap.map(panel => panel.tab), []);

    React.useEffect(() => {
        if (tab && !panelRoutes.includes(tab)) {
        navigate(`/how-miwi-works/${panelRoutes[0]}`)
    }
    }, [tab, panelRoutes, navigate])

    return (
        <Box className='dashboard-panel'>
            <Box>
                <HowMiWiWorksTabs selectedTab={tab ? tab : howMiWiWorksPageMap[0].tab} />
            </Box>
            <Box>
                <HowMiWiWorksPanelViews selectedPanel={tab ? tab : howMiWiWorksPageMap[0].tab} />
            </Box>
        </Box>
    )
}

export default HowMiWiWorksPanel;