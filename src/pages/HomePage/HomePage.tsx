import React, { useContext } from 'react';
// import { useParams } from 'react-router-dom';
import { AuthContext } from '../../shared/auth-context';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import JournalEntryDisplay from '../../features/JournalEntryDisplay/JournalEntryDisplay';
import { useFindFirstEntry } from '../../api/journalEntries/journalEntry';
import moment from 'moment';
import MessagePage from '../../components/MessagePage/MessagePage';

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
    const { data: firstJournalEntry } = useFindFirstEntry(user.id, moment().startOf('day').toISOString(true));

    if (!user.isLoggedIn) {
        return (
            <MessagePage 
                title="Uh oh, looks like you're not logged in."
                subtitle="You must be logged-in to view this page."
            />
        )
    }

    return user.isLoadingUser ? (
        <Box width={'100%'} display="flex" flexDirection="column" textAlign="center" mt={2}>
            <Typography variant="h4"><strong>Today's Journal Entry</strong></Typography>
            <Typography variant="body1"><strong>{moment().format("MMMM Do YYYY")}</strong></Typography>
            {/* Insert loading for journal entry display */}
        </Box>
    ) : (
        <Box width={'100%'} display="flex" flexDirection="column" textAlign="center" mt={2}>
            <Typography variant="h4"><strong>Today's Journal Entry</strong></Typography>
            <Typography variant="body1"><strong>{moment().format("MMMM Do YYYY")}</strong></Typography>
            <JournalEntryDisplay journalEntry={firstJournalEntry} user={user} />
        </Box>
    )
}

export default HomePage