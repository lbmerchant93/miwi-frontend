import React, { useContext } from 'react';
// import { useParams } from 'react-router-dom';
import { AuthContext } from '../../shared/auth-context';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import JournalEntryDisplay from '../../features/JournalEntryDisplay/JournalEntryDisplay';
import { useFindFirstEntry } from '../../api/journalEntries/journalEntry';
import moment from 'moment';

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
    const { data: firstJournalEntry, isLoading } = useFindFirstEntry(user.id, moment().startOf('day').toISOString(true));
    return (
        <Box width={'100%'} display="flex" flexDirection="column" textAlign="center" mt={5}>
            <Typography variant="h4"><strong>Today's Journal Entry</strong></Typography>
            <JournalEntryDisplay journalEntry={firstJournalEntry} user={user} isLoading={isLoading} />
        </Box>
    );
}

export default HomePage