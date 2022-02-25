import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './JournalEntryCard.css';


const JournalEntryCard = () => {
  return (
    <Box className="journal-entry-card">
        <Typography variant="h5">Entry Date</Typography>
        <Typography variant="body1">Amount of water you drank: </Typography>
        <Typography variant="body1">Amount of protein you had: </Typography>
        <Typography variant="body1">How long you exercised for: </Typography>
        <Typography variant="body1">How many kegels you did: </Typography>
        <Typography variant="body1">How long you did garland pose for: </Typography>
        <Typography variant="body1">Did you take your prenatal vitamins? </Typography>
        <Typography variant="body1">Did you take your probiotics? </Typography>
        <Box className="journal-entry-card-options">
            <Button color="inherit" variant="outlined">Delete Entry</Button>
            <Button color="inherit" variant="outlined">Edit Entry</Button> 
        </Box>
        
    </Box>
  )
}

export default JournalEntryCard;