import React, { useContext, useState, useEffect } from 'react';
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
import { useCreateJournalEntry } from '../../api/journalEntries/journalEntry';
import { SnackBar, SnackBarDetails } from '../../components/SnackBar/SnackBar';
import { Alert } from '@mui/material';
import JournalEntryCardSkeletonGrid from '../../components/JournalEntryCardSkeleton/JournalEntryCardSkeleton';
import { useFindFirstEntry } from '../../api/journalEntries/journalEntry';

const JournalPage = () => {
    // const { user } = useParams();
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const [skipCount, setSkipCount] = useState<number>(0);
    const [newJournalEntryDate, setNewJournalEntryDate] = useState<string | null>(null);
    const [searchJournalEntryDate, setSearchJournalEntryDate] = useState<string | undefined>(undefined);
    const [isLoadingNewEntryDate, setIsLoadingNewEntryDate] = useState<boolean>(false);
    const [isLoadingSearchEntryDate, setIsLoadingSearchEntryDate] = useState<boolean>(false);
    const [snackBarDetails, setSnackBarDetails] = useState<SnackBarDetails>({} as SnackBarDetails);
    const createJournalEntry = useCreateJournalEntry();
    const { data: count, isFetching: isFetchingCount, refetch: refetchCount } = useJournalEntriesCount(user.id, user.email);

    const { data, isFetching, refetch } = useJournalEntries(user.id, 15, skipCount, count);
    const { data: foundJournalEntry, isFetching: isFetchingSearchDate, refetch: refetchSearchDate } = useFindFirstEntry(user.id, searchJournalEntryDate, user.email);

    const onPaginationClick = (direction: string) => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

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

    const triggerSnackBar = (err: boolean, message: string) => {
        setSnackBarDetails({ 
            error: err, 
            show: true, 
            message: message
        })
    }

    const dismissSnackBar = () => {
        setSnackBarDetails({ ...snackBarDetails, show: false });
    };

    const handleCreateNewEntryByDate = () => {
        setIsLoadingNewEntryDate(true);

        if (newJournalEntryDate === moment().startOf('day').toISOString(true)) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            navigate(`/home/${user.email?.split('@')[0]}`)
        } else {
            const journalEntry = {
                authorId: user.id,
                date: newJournalEntryDate,
                waterIntake: 0,
                proteinIntake: 0,
                exercise: 0,
                kegels: 0,
                garlandPose: 0,
                prenatalVitamins: false,
                probiotics: false,
                mood: "",
                childbirthEducation: "Write about what you read today...",
                selfCare: "Write about what you did for your body today...",
                postpartumPrep: "Write about how you are preparing for postpartum...",
                fetalLoveBreak: "Write about what you said to your baby today..."
            };
            createJournalEntry.mutate(journalEntry, {
                onError: (err: any) => {
                    triggerSnackBar(true, err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                },
                onSuccess: (data) => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    navigate(`/journal/entries/${data.id}`)
                },
                onSettled: () => {
                    setIsLoadingNewEntryDate(false);
                }
            });
        }
    };

    const handleSearchEntriesByDate = () => {
        setIsLoadingSearchEntryDate(true);
        console.log(foundJournalEntry)
        setIsLoadingSearchEntryDate(false);
    }

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    if (!user.isLoggedIn) {
        return (
            <MessagePage 
                title="Uh oh, looks like you're not logged in."
                subtitle="You must be logged-in to view this page."
            />
        )
    };
    
    return (
        <>
            <SnackBar open={snackBarDetails.show} onClose={dismissSnackBar}>
                <Alert onClose={dismissSnackBar} severity={snackBarDetails.error ? "error" : "success"} variant="filled">
                    {snackBarDetails.message}
                </Alert>
            </SnackBar>
            <Box width={'100%'} display="flex" flexDirection="column" textAlign="center" mt={2}>
                <Typography variant="h4"><strong>Journal Entries</strong></Typography>

                {(isFetching || isFetchingCount) && (
                    <Box width={'100%'} display="flex" flexDirection="column" textAlign="center" mt={2}>
                        <JournalEntryCardSkeletonGrid/>
                    </Box>
                )}

                {((!isFetching || !isFetchingCount) && data && data.length !== 0) && (
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
                )} 

                {(!isFetching || !isFetchingCount) && data && !data.length && (
                    <>
                        <Typography variant="h6" mt={2}>Looks like you don't have any journal entries yet.<br/> Click the button below to go to your dashboard and create a journal for today!</Typography>
                        <Box m={3}>
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
                                disabled={isLoadingNewEntryDate || isFetchingCount || isFetching}
                                disableFuture
                            />
                        </LocalizationProvider>
                        <Box ml={1} display="flex">
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleCreateNewEntryByDate}
                                endIcon={<NoteAddIcon />}
                                disabled={isLoadingNewEntryDate || isFetchingCount || isFetching || !newJournalEntryDate}
                            >
                                Create
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Divider variant="middle" />
                <Box my={3}>
                    <Typography variant="h6" mb={2}>Search journal entries for a specific date:</Typography>
                    <Box display="flex" justifyContent="center">
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DatePicker
                            label="Search Entry Date"
                            value={searchJournalEntryDate === undefined ? null : searchJournalEntryDate}
                            onChange={(newDate) => setSearchJournalEntryDate(moment(newDate).startOf('day').toISOString(true))}
                            renderInput={(params) => <TextField size="small" sx={{width: "200px"}} {...params} />}
                            disabled={isLoadingSearchEntryDate || isFetchingCount || isFetching}
                            disableFuture
                        />
                        </LocalizationProvider>
                        <Box ml={1} display="flex">
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleSearchEntriesByDate}
                                endIcon={<NoteAddIcon />}
                                disabled={isLoadingSearchEntryDate || isFetchingCount || isFetching || !searchJournalEntryDate}
                            >
                                Search
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default JournalPage;