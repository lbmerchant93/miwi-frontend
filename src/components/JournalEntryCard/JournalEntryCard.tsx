import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { JournalEntry } from '../../pages/HomePage/HomePage';
import './JournalEntryCard.css';

interface JournalEntryCardProps {
  entry: JournalEntry;
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = (props) => {
  const { entry } = props;

  return (
    <>
      <Box className="journal-entry-card"> 
        <Typography variant="h5"><b>{moment(entry.date).format("MMMM Do YYYY")}</b></Typography>
        <Typography variant="body1">You drank <b>{entry.waterIntake}oz</b> of water</Typography>
        <Typography variant="body1">You had <b>{entry.proteinIntake}g</b> of protein</Typography>
        <Typography variant="body1">You exercised for <b>{entry.exercise} minute{entry.exercise === 1 ? '' : 's'}</b></Typography>
        <Typography variant="body1">You did <b>{entry.kegels} kegel{entry.kegels === 1 ? '' : 's'}</b></Typography>
        <Typography variant="body1">You did garland pose for <b>{entry.garlandPose} minute{entry.garlandPose === 1 ? '' : 's'}</b></Typography>
        <Typography variant="body1">You <b>{entry.prenatalVitamins ? 'did' : 'did not'}</b> take your prenatal vitamins </Typography>
        <Typography variant="body1">You <b>{entry.probiotics ? 'did' : 'did not'}</b> take your probiotics </Typography>
      </Box>
    </>
    
  )
}

export default JournalEntryCard;