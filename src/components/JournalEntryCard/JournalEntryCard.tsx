import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WarningModal from '../WarningModal/WarningModal';
import { useNavigate } from 'react-router-dom';
import { JournalEntry } from '../../pages/DashboardPage/DashboardPage';
import { deleteJournalEntryMutation } from '../../api/journalEntries/journalEntry';
import { useMutation, useQueryClient } from 'react-query';
import './JournalEntryCard.css';

interface JournalEntryCardProps {
  entry: JournalEntry;
  triggerDeleteSnackBar: (deleteResults: boolean) => void;
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = (props) => {
  const { entry, triggerDeleteSnackBar } = props;
  const navigate = useNavigate();
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();
  // console.log(queryClient)
  const deleteJournalEntryChange = useMutation(deleteJournalEntryMutation, {
    onSuccess: (_, id) => {
      queryClient.setQueryData("journalEntries", (oldData: any) => oldData.filter((entry: { id: number; }) => entry.id !== id))
    }
});

  const onEditClick = (callback: () => void) => {
    return () => {
      callback()
    }
  }

  const onDeleteClick = async () => {
    try {
      deleteJournalEntryChange.mutate(entry.id)
      triggerDeleteSnackBar(true);
    } catch (err) {
      console.log(err);
      triggerDeleteSnackBar(false);
    };
    
    setIsWarningModalOpen(false);
  }

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
        <Box className="journal-entry-card-options">
            <IconButton onClick={onEditClick(() => navigate(`/journal_entry_form/${entry.id}`))} color="default"><EditIcon /></IconButton> 
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