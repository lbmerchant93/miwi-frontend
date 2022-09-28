import React from 'react';
// import JournalEntryCard from '../../../components/JournalEntryCard/JournalEntryCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import { JournalEntry } from '../DashboardPage';
import { useNavigate } from 'react-router-dom';
import JournalEntryCardSkeletonGrid from '../../../components/JournalEntryCardSkeleton/JournalEntryCardSkeleton'

import './DashboardHomePage.css'

interface DashboardHomePageProps {
    data: any;
    triggerSnackBar: (err: boolean, message: string) => void;
    isFetching: boolean;
    count: number;
    skipCount: number;
    setSkipCount: any;
    refetch: () => void;
    refetchCount: () => void;
}

const DashboardHomePage: React.FC<DashboardHomePageProps> = (props) => {
    const { 
        data, 
        // triggerSnackBar, 
        isFetching,
        count,
        skipCount,
        setSkipCount,
        // refetch,
        // refetchCount
    } = props
    const navigate = useNavigate();

    const handleNavigateToJournalEntryForm = (callback: () => void) => {
        return () => {
            callback()
        }
    };

    const onPaginationClick = (direction: string) => {
        window.scrollTo(0, 0);

        setTimeout(() => {
            switch (direction) {
                case 'back':
                setSkipCount((currVal: number) => currVal - 15);
                break;
                case 'forward':
                setSkipCount((currVal: number) => currVal + 15);
                break;
            }
        });
    };

    if (isFetching) {
        return (
            <JournalEntryCardSkeletonGrid/>
        )
    }

    return (
        <>
            {(!isFetching && data && data.length) ? 
            (
                <>
                    {/* <Box className='dashboard-journal-entries-container'>
                        {data.map((entry: JournalEntry) => {
                            return (
                            <JournalEntryCard 
                                entry={entry} 
                                key={entry.id} 
                                triggerSnackBar={triggerSnackBar}
                                refetch={refetch}
                                refetchCount={refetchCount}
                            />)
                        })}
                    </Box> */}
                    <Box display="flex" justifyContent="center">
                    <Box mx={2}>
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={() => onPaginationClick('back')}
                            disabled={skipCount === 0}
                        >
                            Back
                        </Button>
                    </Box>
                    <Box mx={2}>
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={() => onPaginationClick('forward')}
                            disabled={skipCount + 15 >= count}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
                </>
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