import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import moment from 'moment';
import './JournalEntryCard.css';

interface mockData {
  date: string;
  waterIntake: number;
  proteinIntake: number;
  exercise: number;
  kegels: number;
  garlandPose: number;
  prenatalVitamins: boolean;
  probiotics: boolean;
}
interface JournalEntryCardProps {
  entry: mockData;
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = (props) => {
  const { entry } = props;
  return (
    <Box className="journal-entry-card">
        <Typography variant="h5">Entry Date: {moment(entry.date).format("MMMM Do YYYY")}</Typography>
        <Typography variant="body1">Amount of water you drank: {entry.waterIntake}oz</Typography>
        <Typography variant="body1">Amount of protein you had: {entry.proteinIntake}g</Typography>
        <Typography variant="body1">How long you exercised for: {entry.exercise}min</Typography>
        <Typography variant="body1">How many kegels you did: {entry.kegels}</Typography>
        <Typography variant="body1">How long you did garland pose for: {entry.garlandPose}min</Typography>
        <Typography variant="body1">Did you take your prenatal vitamins? {entry.prenatalVitamins ? 'yes' : 'no'}</Typography>
        <Typography variant="body1">Did you take your probiotics? {entry.probiotics ? 'yes' : 'no'}</Typography>
        <Box className="journal-entry-card-options">
            <Button color="inherit" variant="outlined">Delete Entry</Button>
            <Button color="inherit" variant="outlined">Edit Entry</Button> 
        </Box>
    </Box>
  )
}

export default JournalEntryCard;