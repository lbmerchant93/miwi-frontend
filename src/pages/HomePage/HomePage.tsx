import React, { useContext, useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { AuthContext } from '../../shared/auth-context';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import JournalEntryDisplay from '../../features/JournalEntryDisplay/JournalEntryDisplay';
import { useFindFirstEntry } from '../../api/journalEntries/journalEntry';
import dayjs from 'dayjs';
import MessagePage from '../../components/MessagePage/MessagePage';
import { SnackBar, SnackBarDetails } from '../../components/SnackBar/SnackBar';
import { Alert } from '@mui/material';
import JournalEntryDisplaySkeleton from '../../features/JournalEntryDisplay/JournalEntryDisplaySkeleton';

export interface JournalEntry {
    id: number;
    authorId: string;
    date: string;
    waterIntake?: number;
    proteinIntake?: number;
    exercise?: number;
    kegels?: number;
    garlandPose?: number;
    prenatalVitamins?: boolean;
    probiotics?: boolean;
    mood?: string;
    childbirthEducation?: string;
    selfCare?: string;
    postpartumPrep?: string;
    fetalLoveBreak?: string;
}

const HomePage = () => {
    // const { user } = useParams();
    const user = useContext(AuthContext);
    const { data: firstJournalEntry, refetch, isFetching } = useFindFirstEntry(user.id, dayjs().startOf('day').toISOString(), user.email);
    const [snackBarDetails, setSnackBarDetails] = useState<SnackBarDetails>({} as SnackBarDetails);

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
    }

    return (user.isLoadingUser || isFetching) ? (
        <Box width={'100%'} display="flex" flexDirection="column" textAlign="center" mt={2}>
            <Typography variant="h4"><strong>Today's Journal Entry</strong></Typography>
            <Typography variant="body1"><strong>{dayjs().format("MMMM D YYYY")}</strong></Typography>
            <JournalEntryDisplaySkeleton />
        </Box>
    ) : (
        <>
            <SnackBar open={snackBarDetails.show} onClose={dismissSnackBar}>
                <Alert onClose={dismissSnackBar} severity={snackBarDetails.error ? "error" : "success"} variant="filled">
                    {snackBarDetails.message}
                </Alert>
            </SnackBar>
            <Box width={'100%'} display="flex" flexDirection="column" textAlign="center" mt={2}>
                <Typography variant="h4"><strong>Today's Journal Entry</strong></Typography>
                <Typography variant="body1"><strong>{dayjs().format("MMMM D YYYY")}</strong></Typography>
                <JournalEntryDisplay journalEntry={firstJournalEntry} user={user} refetch={refetch} triggerSnackBar={triggerSnackBar}/>
            </Box>
        </>
        
    )
}

export default HomePage