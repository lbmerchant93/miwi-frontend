import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Home from '../../pages/DashboardPage/DashboardHomePage/DashboardHomePage';
import Box, { BoxProps } from '@mui/material/Box';
import { useParams, useNavigate } from 'react-router-dom';
import Profile from '../../pages/DashboardPage/DashboardProfilePage/DashboardProfilePage';
import NewJournalEntryForm from '../../pages/DashboardPage/DashboardNewJournalEntryFormPage/DashboardNewJournalEntryFormPage';

import './DashboardPanel.css';

export enum DashboardPageRoutes {
    home = 'home',
    journalEntryForm = 'journal_entry_form',
    profile = 'profile'
}

const dashboardPageMap = [
    {
        route: DashboardPageRoutes.home,
        label: 'home',
        tabName: 'HOME',
        Component: Home
    }
    ,{
        route: DashboardPageRoutes.journalEntryForm,
        label: 'journal_entry_form',
        tabName: 'JOURNAL ENTRY FORM',
        Component: NewJournalEntryForm
    }
    ,{
        route: DashboardPageRoutes.profile,
        label: 'profile',
        tabName: 'PROFILE',
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
            {dashboardPageMap.map(({ tabName, route }) => (
                <Tab 
                    key={route}
                    label={tabName}
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

interface DashboardPanelViewsProps {
    selectedPanel: string; 
    data: any; 
    triggerSnackBar: (err: boolean, message: string) => void;
}

const DashboardPanelViews: React.FC<DashboardPanelViewsProps> = (props) => {
    const { selectedPanel, data, triggerSnackBar } = props;

    return (
        <>
            {dashboardPageMap.map(({ route, Component }) => (
                <DashboardTabPanel isSelected={selectedPanel === route} value={route} key={route}>
                    <Component data={data} triggerSnackBar={triggerSnackBar} />
                </DashboardTabPanel>
            ))}
            
        </>
        
    )
}

interface DashboardPanelProps {
    data: any;
    triggerSnackBar: (err: boolean, message: string) => void;
}

const DashboardPanel: React.FC<DashboardPanelProps> = (props) => {
    const { data, triggerSnackBar } = props;
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
            <Box className='dashboard'>
                <DashboardPanelViews 
                    selectedPanel={tab ? tab : dashboardPageMap[0].label} 
                    data={data} 
                    triggerSnackBar={triggerSnackBar}
                />
            </Box>
        </Box>
        
    )
}

export default DashboardPanel