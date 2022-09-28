import React, { useContext, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { AuthContext } from '../../shared/auth-context';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MessagePage from '../../components/MessagePage/MessagePage';
import { useJournalEntries, useJournalEntriesCount } from '../../api/journalEntries/journalEntries';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import JournalEntryCard from '../../components/JournalEntryCard/JournalEntryCard';
import { JournalEntry } from '../HomePage/HomePage';

const JournalPage = () => {
    // const { user } = useParams();
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const [skipCount, setSkipCount] = useState<number>(0);
    const { data: count, isFetching: isFetchingCount, refetch: refetchCount } = useJournalEntriesCount(user.id);

    const { data, isFetching, refetch } = useJournalEntries(user.id, 15, skipCount, count);

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

    if (!user.isLoggedIn) {
        return (
            <MessagePage 
                title="Uh oh, looks like you're not logged in."
                subtitle="You must be logged-in to view this page."
            />
        )
    }
    
    return (
        <>
            <Box width={'100%'} display="flex" flexDirection="column" textAlign="center" mt={2}>
                    <Typography variant="h4"><strong>Journal Entries</strong></Typography>
                    {(!isFetching && data && data.length) ? 
                    (
                        <Box width={'100%'} display="flex" flexDirection="column" textAlign="center" mt={2}>
                            <Box className='dashboard-journal-entries-container'>
                                {data.map((entry: JournalEntry) => {
                                    return (
                                    <JournalEntryCard 
                                        entry={entry} 
                                        key={entry.id} 
                                    />)
                                })}
                            </Box>
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
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h6" mt={2}>Looks like you don't have any journal entries yet.<br/> Click the button below to go to your dashboard and create a journal for today!</Typography>
                            <Box mt={2}>
                                <Button onClick={() => navigate(`/home/${user.email?.split('@')[0]}`)} variant='contained' color='success'>
                                    <Typography variant="body1">Dashboard</Typography>
                                </Button>
                            </Box>
                        </>
                    )}
            </Box>
        </>
    );
}

export default JournalPage;