import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './JournalEntryCard.css';

interface mockData {
  id: number;
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

  const onEditClick = () => {
    console.log("Edit button clicked")
  }

  const onDeleteClick = () => {
    console.log("Delete button clicked")
  }

  return (
    <Box className="journal-entry-card"> 
      <Typography variant="h5"><b>{moment(entry.date).format("MMMM Do YYYY")}</b></Typography>
      <Typography variant="body1">You drank <b>{entry.waterIntake}oz</b> of water</Typography>
      <Typography variant="body1">You had <b>{entry.proteinIntake}g</b> of protein</Typography>
      <Typography variant="body1">You exercised for <b>{entry.exercise} minute{entry.exercise === 1 ? '' : 's'}</b></Typography>
      <Typography variant="body1">You did <b>{entry.kegels} kegel{entry.kegels === 1 ? '' : 's'}</b></Typography>
      <Typography variant="body1">You did garland pose for <b>{entry.garlandPose} minute{entry.garlandPose === 1 ? '' : 's'}</b></Typography>
      <Typography variant="body1">You <b>{entry.prenatalVitamins ? 'did' : 'did not'}</b> take your prenatal vitamins </Typography>
      <Typography variant="body1">You <b>{entry.probiotics ? 'did' : 'did not'}</b> take your probiotics </Typography>
      <Box className="journal-entry-card-options">
          <IconButton onClick={onEditClick} color="default"><EditIcon /></IconButton> 
          <IconButton onClick={onDeleteClick} color="warning"><DeleteIcon /></IconButton>
      </Box>
    </Box>
  )
}

export default JournalEntryCard;