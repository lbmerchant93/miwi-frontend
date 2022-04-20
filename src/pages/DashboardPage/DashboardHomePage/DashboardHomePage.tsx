import React from 'react';
import JournalEntryCard from '../../../components/JournalEntryCard/JournalEntryCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { JournalEntry } from '../DashboardPage';
import { useNavigate } from 'react-router-dom';

import './DashboardHomePage.css'

interface DashboardHomePageProps {
    data: any;
    triggerSnackBar: (err: boolean, message: string) => void;
    refetch: () => void;
    isFetching: boolean;
    setEntries: any;
}

const DashboardHomePage: React.FC<DashboardHomePageProps> = (props) => {
    const { 
        data, 
        triggerSnackBar, 
        refetch, 
        isFetching,
        setEntries 
    } = props
    const navigate = useNavigate();

    const handleNavigateToJournalEntryForm = (callback: () => void) => {
        return () => {
            callback()
        }
    }

    return (
        <>
            {(!isFetching && data.length) ? 
            (
                <Box className='dashboard-journal-entries-container'>
                    {data.map((entry: JournalEntry) => {
                        return (
                        <JournalEntryCard 
                            entry={entry} 
                            key={entry.id} 
                            triggerSnackBar={triggerSnackBar} 
                            refetch={refetch} 
                            setEntries={setEntries}
                        />)
                    })}
                </Box>
            ) : (
                <Box className='dashboard-no-entries-container'>
                    <Typography variant="h6">Looks like you don't have any journal entries yet. Click the button below to create your first entry!</Typography>
                    <Box className='dashboard-create-journal-entry-button-container'>
                        <Button onClick={handleNavigateToJournalEntryForm(() => navigate('/dashboard/journal_entry_form'))} variant='contained' color='success'>
                            <Typography variant="body1">New Journal Entry</Typography>
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default DashboardHomePage