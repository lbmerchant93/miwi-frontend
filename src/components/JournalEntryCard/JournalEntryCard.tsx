import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WarningModal from '../WarningModal/WarningModal';
import { SnackBar, SnackBarDetails } from '../SnackBar/SnackBar';
import { Alert } from '@mui/material';
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
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [snackBarDetails, setSnackBarDetails] = useState<SnackBarDetails>({} as SnackBarDetails);
  const [error, setError] = useState(false)

  const dismissSnackBar = () => {
    setSnackBarDetails({ ...snackBarDetails, show: false });
};

  const onEditClick = () => {
    console.log("Edit button clicked")
  }

  const onDeleteClick = () => {
    console.log('Delete')
    setSnackBarDetails({ error, show: true, message: "Journal entry deleted!" })
    setIsWarningModalOpen(false);
  }

  return (
    <>
      <SnackBar open={snackBarDetails.show} onClose={dismissSnackBar}>
        <Alert onClose={dismissSnackBar} severity={snackBarDetails.error ? "error" : "success"} variant="filled">
          {snackBarDetails.message}
        </Alert>
      </SnackBar>
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
            <IconButton onClick={() => setIsWarningModalOpen(true)} color="warning"><DeleteIcon /></IconButton>
        </Box>
      </Box>
      <WarningModal 
        isOpen={isWarningModalOpen} 
        onClose={() => setIsWarningModalOpen(false)} 
        modalTitle="Delete journal entry modal" 
        modalDescription="Confirm journal entry delete or go back to the dashboard."
        modalMessage="Are you sure you want to delete this entry? This action is irreversible."
        verifiedAction={onDeleteClick}
      />
    </>
    
  )
}

export default JournalEntryCard;