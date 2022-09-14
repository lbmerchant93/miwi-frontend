import React, { useContext } from 'react';
// import { useParams } from 'react-router-dom';
import { AuthContext } from '../../shared/auth-context';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import JournalEntryDisplay from '../../features/JournalEntryDisplay/JournalEntryDisplay';


const HomePage = () => {
    // const { user } = useParams();
    const user = useContext(AuthContext);
    
    return (
        <Box width={'100%'} display="flex" flexDirection="column" textAlign="center">
            <Typography variant="h4"><strong>Today's Journal Entry</strong></Typography>
            <JournalEntryDisplay />
        </Box>
    );
}

export default HomePage