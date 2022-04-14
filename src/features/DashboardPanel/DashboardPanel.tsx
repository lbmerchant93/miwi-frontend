import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Home from '../../pages/DashboardPage/DashboardHomePage/DashboardHomePage';
import Box, { BoxProps } from '@mui/material/Box';
import { useParams, useNavigate } from 'react-router-dom';
import Profile from '../../pages/DashboardPage/DashboardProfilePage/DashboardProfilePage';

import './DashboardPanel.css';

export enum DashboardPageRoutes {
    home = 'home',
    entryForm = 'entryForm',
    profile = 'profile'
}

const dashboardPageMap = [
    {
        route: DashboardPageRoutes.home,
        label: 'home',
        Component: Home
    }
    // ,{
    //     route: DashboardPageRoutes.entryForm,
    //     label: 'entryForm',
    //     // Component: 
    // }
    ,{
        route: DashboardPageRoutes.profile,
        label: 'profile',
        Component: Profile
    }
]

const DashboardTabs: React.FC<{
    selectedTab: string;
}> = (props) => {
    const { selectedTab } = props;
    const navigate = useNavigate();
    const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
        navigate(`/dashboard/${newValue}`)
    };

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



const DashboardPanelViews: React.FC<{ selectedPanel: string; data: any; triggerDeleteSnackBar: any; }> = (props) => {
    const { selectedPanel, data, triggerDeleteSnackBar } = props;

    return (
        <>
            {dashboardPageMap.map(({ route, Component }) => (
                <DashboardTabPanel isSelected={selectedPanel === route} value={route} key={route}>
                    <Component data={data} triggerDeleteSnackBar={triggerDeleteSnackBar} />
                </DashboardTabPanel>
            ))}
            
        </>
        
    )
}

interface DashboardPanelProps {
    data: any;
    triggerDeleteSnackBar: any;
}

const DashboardPanel: React.FC<DashboardPanelProps> = (props) => {
    const { data, triggerDeleteSnackBar } = props;
    const { tab } = useParams();
    const navigate = useNavigate();
    const panelRoutes = React.useMemo(() => dashboardPageMap.map(panel => panel.label), []);

    React.useEffect(() => {
        if (tab && !panelRoutes.includes(tab)) {
        navigate(`/dashboard/${panelRoutes[0]}`)
    }
    }, [tab, panelRoutes, navigate])
    
    return (
        <Box className='dashboard-panel'>
            <Box>
                <DashboardTabs selectedTab={tab ? tab : dashboardPageMap[0].label} />
            </Box>
            <DashboardPanelViews selectedPanel={tab ? tab : dashboardPageMap[0].label} data={data} triggerDeleteSnackBar={triggerDeleteSnackBar}/>
        </Box>
        
    )
}

export default DashboardPanel