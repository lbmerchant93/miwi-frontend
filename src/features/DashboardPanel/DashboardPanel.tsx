import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import './DashboardPanel.css';

export enum DashboardPageRoutes {
    home = 'home',
    newEntry = 'newEntry',
    profile = 'profile'
}

const dashboardPageMap = [
    {
        route: DashboardPageRoutes.home,
        label: 'Home',
        // Component: 
    },{
        route: DashboardPageRoutes.newEntry,
        label: 'NewEntry',
        // Component: 
    },{
        route: DashboardPageRoutes.profile,
        label: 'Profile',
        // Component: 
    }
]

const DashboardPanel = () => {
    return (
        <div>DashboardPanel</div>
    )
}

export default DashboardPanel