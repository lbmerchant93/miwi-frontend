import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import JournalEntryDisplay from '../../features/JournalEntryDisplay/JournalEntryDisplay';
import MessagePage from '../../components/MessagePage/MessagePage';
import { AuthContext } from '../../shared/auth-context';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useFindFirstEntryById } from '../../api/journalEntries/journalEntry';

const JournalEntryPage = () => {
    const { entry } = useParams();
    const user = useContext(AuthContext);
    const { data: journalEntryData, isLoading } = useFindFirstEntryById(user.id, entry, user.email);

    if (!user.isLoggedIn) {
        return (
            <MessagePage 
                title="Uh oh, looks like you're not logged in."
                subtitle="You must be logged-in to view this page."
            />
        );
    };

    return (user.isLoadingUser) ? (
        <div>JournalEntryPage</div>
    ) : (
        <>
            { journalEntryData && (
                <Box width={'100%'} display="flex" flexDirection="column" textAlign="center" mt={2}>
                    <Typography variant="h4"><strong>Journal Entry</strong></Typography>
                    <Typography variant="body1"><strong>{moment(journalEntryData.date).format("MMMM Do YYYY")}</strong></Typography>
                    {/* <JournalEntryDisplay journalEntry={firstJournalEntry} user={user} refetch={refetch} triggerSnackBar={triggerSnackBar}/> */}
                </Box>
            )}
            { !journalEntryData && (
                <MessagePage 
                    title="Uh oh, looks like this journal entry doesn't exist."
                    subtitle=""
                />
            )}
        </>
        
        
    );
};

export default JournalEntryPage;