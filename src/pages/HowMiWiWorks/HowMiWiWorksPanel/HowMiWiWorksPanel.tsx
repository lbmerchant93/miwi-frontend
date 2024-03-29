import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box, { BoxProps } from '@mui/material/Box';
import { useParams, useNavigate } from 'react-router-dom';
import FirstTimeAppFlow from '../FirstTimeAppFlow/FirstTimeAppFlow';
import AppFeatures from '../AppFeatures/AppFeatures';
import AppTerms from '../AppTerms/AppTerms';
import Typography from '@mui/material/Typography';

export enum HowMiWiWorksPageRoutes {
    firstTimeAppFlow = "first-time-app-flow",
    appFeatures = "app-features",
    appTerms = "app-terms"
};

const howMiWiWorksPageMap = [
    {
        route: HowMiWiWorksPageRoutes.appTerms,
        label: "App Terms",
        tab: "app-terms",
        Component: AppTerms
    },{
        route: HowMiWiWorksPageRoutes.appFeatures,
        label: "App Features",
        tab: "app-features",
        Component: AppFeatures
    },{
        route: HowMiWiWorksPageRoutes.firstTimeAppFlow,
        label: "First Time App Flow",
        tab: "first-time-app-flow",
        Component: FirstTimeAppFlow
    }, 
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
                    sx={{ alignItems: 'flex-end' }}
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

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [selectedPanel]);

    return (
        <>
            {howMiWiWorksPageMap.map(({ route, Component }) => (
                <HowMiWiWorksTabPanel isSelected={selectedPanel === route} value={route} key={route} width={"min(80ch, 100%)"}>
                    <Component />
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
    }, [tab, panelRoutes, navigate]);

    return (
        <Box display="flex" flexDirection="column">
            <Box border={"1px solid gray"} borderRadius="20px" height={150} pl={4} my={3} display="flex" flexDirection="column" justifyContent="center">
                <Typography variant="h3"><strong>Help Center</strong></Typography>
                <Typography variant="h5" sx={{ color: "text.secondary" }}>Information on how to use MiWi</Typography>
            </Box>
            <Box display="flex" flexDirection="row">
                <HowMiWiWorksTabs selectedTab={tab ? tab : howMiWiWorksPageMap[0].tab} />
                <HowMiWiWorksPanelViews selectedPanel={tab ? tab : howMiWiWorksPageMap[0].tab} />
            </Box>
        </Box>
    )
}

export default HowMiWiWorksPanel;