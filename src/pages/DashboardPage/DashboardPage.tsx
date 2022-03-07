import React, { useContext } from 'react';
import { AuthContext } from '../../shared/auth-context';
import MessagePage from '../../components/MessagePage/MessagePage';
import JournalEntryCard from '../../components/JournalEntryCard/JournalEntryCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import './DashboardPage.css';

interface mockData {
    date: string;
    waterIntake: number;
    proteinIntake: number;
    exercise: number;
    kegels: number;
    garlandPose: number;
    prenatalVitamins: boolean;
    probiotics: boolean;
}

const mockEntries: mockData[]= [
    {
       "date": "2022-03-07T19:58:57.000Z",
       "waterIntake": 1,
       "proteinIntake": 1,
       "exercise": 1,
       "kegels": 1,
       "garlandPose": 1,
       "prenatalVitamins": true,
       "probiotics": true 
    },
    {
        "date": "2022-03-08T19:58:57.000Z",
        "waterIntake": 2,
        "proteinIntake": 2,
        "exercise": 2,
        "kegels": 2,
        "garlandPose": 2,
        "prenatalVitamins": true,
        "probiotics": false
     },
     {
        "date": "2022-03-09T19:58:57.000Z",
        "waterIntake": 3,
        "proteinIntake": 3,
        "exercise": 3,
        "kegels": 3,
        "garlandPose": 3,
        "prenatalVitamins": false,
        "probiotics": false
     },
     {
        "date": "2022-03-10T19:58:57.000Z",
        "waterIntake": 4,
        "proteinIntake": 4,
        "exercise": 4,
        "kegels": 4,
        "garlandPose": 4,
        "prenatalVitamins": true,
        "probiotics": true 
     },
]

const DashboardPage = () => {
    const user = useContext(AuthContext);

    return user.isLoggedIn ? (
        <main className="dashboard-main">
            <Typography variant="h5">Welcome back {user.displayName}!</Typography>
            <Box className='dashboard-journal-entries-container'>
                {mockEntries.map((entry: mockData) => {
                   return <JournalEntryCard entry={entry} key={entry.waterIntake}/>
                })}  
            </Box>
        </main>
    ) : (
        <MessagePage 
            title="Uh oh, looks like you're not logged in."
            subtitle="You must be logged-in to view this page."
        />
    )
}

export default DashboardPage;