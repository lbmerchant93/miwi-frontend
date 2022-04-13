import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Home from '../../pages/DashboardPage/DashboardHomePage/DashboardHomePage';
import Box, { BoxProps } from '@mui/material/Box';
import { useParams } from 'react-router-dom';

import './DashboardPanel.css';

export enum DashboardPageRoutes {
    home = 'Home',
    newEntry = 'NewEntry',
    profile = 'Profile'
}

const dashboardPageMap = [
    {
        route: DashboardPageRoutes.home,
        label: 'Home',
        Component: Home
    }
    
]

const DashboardTabs: React.FC<{
    selectedTab: string;
}> = (props) => {
    const { selectedTab } = props
    const handleChange = () => {
        console.log("change")
    }

    return (
        <Tabs
            value={selectedTab}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="primary"
        >
            {dashboardPageMap.map(({ label, route }) => (
                <Tab 
                    key={route}
                    label={label}
                    value={route}
                />
            ))}
        </Tabs>
    )
}

interface DashboardTabPanelProps extends BoxProps {
    isSelected: boolean;
    value: string;
}

const DashboardTabPanel: React.FC<DashboardTabPanelProps> = (props) => {
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
}



const DashboardPanelViews: React.FC<{ selectedPanel: string; }> = (props) => {
    const { selectedPanel } = props;

    return (
        <>
            {dashboardPageMap.map(({ route, Component }) => (
                <DashboardTabPanel isSelected={selectedPanel === route} value={route} key={route}>
                    <Component data={undefined} triggerDeleteSnackBar={undefined} />
                </DashboardTabPanel>
            ))}
            
        </>
        
    )
}

const DashboardPanel = () => {
    const { tab } = useParams();

    return (
        <>
            <Box>
                <DashboardTabs selectedTab={tab ? tab : dashboardPageMap[0].label} />
            </Box>
            <DashboardPanelViews selectedPanel={''} />
        </>
        
    )
}

export default DashboardPanel