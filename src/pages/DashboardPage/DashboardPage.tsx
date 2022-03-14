import React, { useContext } from 'react';
import { AuthContext } from '../../shared/auth-context';
import MessagePage from '../../components/MessagePage/MessagePage';
import JournalEntryCard from '../../components/JournalEntryCard/JournalEntryCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { PossibleRoutes } from '../../utils/constants';

import './DashboardPage.css';

export interface mockData {
    id: number;
    userId: string;
    date: string;
    waterIntake: number;
    proteinIntake: number;
    exercise: number;
    kegels: number;
    garlandPose: number;
    prenatalVitamins: boolean;
    probiotics: boolean;
}

export const mockEntries: mockData[]= [
    {
        "id": 1,
        "userId": "fV5De0bivMRqBoHxJuwT4UwFJtT2",
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
        "id": 2,
        "userId": "fV5De0bivMRqBoHxJuwT4UwFJtT2",
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
        "id": 3,
        "userId": "fV5De0bivMRqBoHxJuwT4UwFJtT2",
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
        "id": 4,
        "userId": "DRYvbhpN9UPqJPcbKV21TH3Yp8N2",
        "date": "2022-03-10T19:58:57.000Z",
        "waterIntake": 4,
        "proteinIntake": 4,
        "exercise": 4,
        "kegels": 4,
        "garlandPose": 4,
        "prenatalVitamins": true,
        "probiotics": true 
     },
     {
        "id": 5,
        "userId": "fV5De0bivMRqBoHxJuwT4UwFJtT2",
        "date": "2022-03-09T19:58:57.000Z",
        "waterIntake": 5,
        "proteinIntake": 5,
        "exercise": 5,
        "kegels": 5,
        "garlandPose": 5,
        "prenatalVitamins": false,
        "probiotics": false
     },
     {
        "id": 6,
        "userId": "fV5De0bivMRqBoHxJuwT4UwFJtT2",
        "date": "2022-03-09T19:58:57.000Z",
        "waterIntake": 6,
        "proteinIntake": 6,
        "exercise": 6,
        "kegels": 6,
        "garlandPose": 6,
        "prenatalVitamins": false,
        "probiotics": false
     },
     {
        "id": 7,
        "userId": "fV5De0bivMRqBoHxJuwT4UwFJtT2",
        "date": "2022-03-09T19:58:57.000Z",
        "waterIntake": 7,
        "proteinIntake": 7,
        "exercise": 7,
        "kegels": 7,
        "garlandPose": 7,
        "prenatalVitamins": false,
        "probiotics": false
     },
     {
        "id": 8,
        "userId": "fV5De0bivMRqBoHxJuwT4UwFJtT2",
        "date": "2022-03-09T19:58:57.000Z",
        "waterIntake": 8,
        "proteinIntake": 8,
        "exercise": 8,
        "kegels": 8,
        "garlandPose": 8,
        "prenatalVitamins": false,
        "probiotics": false
     },
]

const DashboardPage = () => {
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const foundEntries = 
        mockEntries.filter((entry: mockData) => {
            return user.id === entry.userId
        }
    )

    const handleNavigateToJournalEntryForm = (callback: () => void) => {
        return () => {
            callback()
        }
    }

    return user.isLoggedIn ? (
        <div className="dashboard">
            <Typography variant="h2">Welcome back {user.displayName}!</Typography>
            {foundEntries.length ? 
            (
                <Box className='dashboard-journal-entries-container'>
                    {foundEntries.map((entry: mockData) => {
                        return <JournalEntryCard entry={entry} key={entry.id}/>
                    })}
                </Box>
            ) : (
                <Box className='dashboard-no-entries-container'>
                    <Typography variant="h6">Looks like you don't have any journal entries yet. Click the button below to create your first entry!</Typography>
                    <Box className='dashboard-create-journal-entry-button-container'>
                        <Button onClick={handleNavigateToJournalEntryForm(() => navigate(PossibleRoutes.JOURNAL_ENTRY_FORM))} variant='contained' color='success'>
                            <Typography variant="body1">New Journal Entry</Typography>
                        </Button>
                    </Box>
                </Box>
            )}
        </div>
    ) : (
        <MessagePage 
            title="Uh oh, looks like you're not logged in."
            subtitle="You must be logged-in to view this page."
        />
    )
}

export default DashboardPage;