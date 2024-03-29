import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import JournalEntryDisplay from '../../features/JournalEntryDisplay/JournalEntryDisplay';
import MessagePage from '../../components/MessagePage/MessagePage';
import { AuthContext } from '../../shared/auth-context';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useFindFirstEntryById } from '../../api/journalEntries/journalEntry';
import { SnackBar, SnackBarDetails } from '../../components/SnackBar/SnackBar';
import { Alert } from '@mui/material';
import JournalEntryDisplaySkeleton from '../../features/JournalEntryDisplay/JournalEntryDisplaySkeleton';
import Skeleton from '@mui/material/Skeleton';

const JournalEntryPage = () => {
    const { entry } = useParams();
    const user = useContext(AuthContext);
    const { data: journalEntryData, isFetching, refetch } = useFindFirstEntryById(user.id, entry, user.email);
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
        );
    };

    return (user.isLoadingUser || isFetching) ? (
        <Box width={'100%'} display="flex" flexDirection="column" textAlign="center" mt={2}>
            <Typography variant="h4"><strong>Journal Entry</strong></Typography>
            <Typography variant="body1" width={200} alignSelf="center"><Skeleton /></Typography>
            <JournalEntryDisplaySkeleton />
        </Box>
        
    ) : (
        <>
            {!journalEntryData && (
                <MessagePage 
                    title="Uh oh, looks like this journal entry doesn't exist."
                    subtitle=""
                />
            )}
            {journalEntryData && (
                <>
                    <SnackBar open={snackBarDetails.show} onClose={dismissSnackBar}>
                        <Alert onClose={dismissSnackBar} severity={snackBarDetails.error ? "error" : "success"} variant="filled">
                            {snackBarDetails.message}
                        </Alert>
                    </SnackBar>
                    <Box width={'100%'} display="flex" flexDirection="column" textAlign="center" mt={2}>
                        <Typography variant="h4"><strong>Journal Entry</strong></Typography>
                        <Typography variant="body1"><strong>{dayjs(journalEntryData.date).format("MMMM D YYYY")}</strong></Typography>
                        <JournalEntryDisplay journalEntry={journalEntryData} user={user} refetch={refetch} triggerSnackBar={triggerSnackBar}/>
                    </Box>
                </>
            )}
        </>
        
        
    );
};

export default JournalEntryPage;