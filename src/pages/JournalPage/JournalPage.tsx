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
import Divider from '@mui/material/Divider';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import IconButton from '@mui/material/IconButton';

const JournalPage = () => {
    // const { user } = useParams();
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const [skipCount, setSkipCount] = useState<number>(0);
    const [newJournalEntryDate, setNewJournalEntryDate] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data: count, isFetching: isFetchingCount, refetch: refetchCount } = useJournalEntriesCount(user.id, user.email);

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
                            <Box display="flex" flexWrap="wrap" justifyContent="center">
                                {data.map((entry: JournalEntry) => {
                                    return (
                                    <JournalEntryCard 
                                        entry={entry}
                                        email={user.email} 
                                        key={entry.id} 
                                    />)
                                })}
                            </Box>
                            <Box display="flex" justifyContent="center" m={3}>
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
                    <Divider variant="middle" />
                    <Box my={3}>
                                <Typography variant="h6" mb={2}>Create a new journal entry for a specific date:</Typography>
                                <Box display="flex" justifyContent="center">
                                    <LocalizationProvider dateAdapter={DateAdapter}>
                                        <DatePicker
                                            label="New Entry Date"
                                            value={newJournalEntryDate}
                                            onChange={(newDate) => setNewJournalEntryDate(moment(newDate).startOf('day').toISOString(true))}
                                            renderInput={(params) => <TextField size="small" sx={{width: "200px"}} {...params} />}
                                            disabled={isLoading}
                                        />
                                    </LocalizationProvider>
                                    <Box ml={1} display="flex">
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => console.log('create new')}
                                            endIcon={<NoteAddIcon />}
                                        >
                                            Create
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
            </Box>
        </>
    );
}

export default JournalPage;