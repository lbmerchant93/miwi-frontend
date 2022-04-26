import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import WarningModal from '../WarningModal/WarningModal';
import { JournalEntry } from '../../pages/DashboardPage/DashboardPage';
// import { useDeleteJournalEntry } from '../../api/journalEntries/journalEntry';
import UpdateJournalEntryModal from '../UpdateJournalEntryModal/UpdateJournalEntryModal';
import './JournalEntryCard.css';

interface JournalEntryCardProps {
  entry: JournalEntry;
  triggerSnackBar: (err: boolean, message: string) => void;
  setEntries: any;
  refetch: () => void;
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = (props) => {
  const { 
    entry, 
    triggerSnackBar, 
    setEntries, 
    refetch
  } = props;
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  // const deleteJournalEntry = useDeleteJournalEntry();
  

  // const onDeleteClick = () => {
  //   deleteJournalEntry.mutate(entry.id, {
  //     onError: (err: any) => {
  //       triggerSnackBar(true, err.message || 'Something went wrong, please try again or contact us for help.');
  //       setIsWarningModalOpen(true);
  //     },
  //     onSuccess: () => {
  //       triggerSnackBar(false, 'Journal entry deletion successful!');
  //       setEntries((prev: any) => prev.filter((prevEntry: any) => prevEntry.id !== entry.id))
  //       setIsWarningModalOpen(false);
  //       refetch()
  //     }
  //   });
  // };

  const onUpdateClick = (err: boolean, message: string) => {
    triggerSnackBar(err, message);
    if (err) {
      setIsUpdateModalOpen(true);
    } else {
      setIsUpdateModalOpen(false);
      refetch()
    }
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
            <IconButton onClick={() => setIsUpdateModalOpen(true)} color="default"><EditIcon /></IconButton> 
            <IconButton onClick={() => setIsWarningModalOpen(true)} color="warning"><DeleteIcon /></IconButton>
        </Box>
      </Box>
      {/* <WarningModal 
        isOpen={isWarningModalOpen} 
        onClose={() => setIsWarningModalOpen(false)} 
        modalTitle="Delete journal entry modal" 
        modalDescription="Confirm journal entry delete or go back to the dashboard."
        modalMessage="Are you sure you want to delete this entry? This action is irreversible."
        // verifiedAction={onDeleteClick}
      /> */}
      <UpdateJournalEntryModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        modalTitle="Update journal entry modal"
        modalDescription="Update the journal entry or go back to the dashboard."
        modalMessage="Are you sure you want to update this entry? This action is irreversible." 
        entry={entry}
        onUpdateClick={onUpdateClick}
        setEntries={setEntries}
      />
    </>
    
  )
}

export default JournalEntryCard;