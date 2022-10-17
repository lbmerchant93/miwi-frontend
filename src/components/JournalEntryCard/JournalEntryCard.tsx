import React from 'react';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { JournalEntry } from '../../pages/HomePage/HomePage';
import { JournalEntryCardContainer, JournalEntryCardStyled, EditButtonContainer } from './JournalEntryCard.styled';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

interface JournalEntryCardProps {
  entry: JournalEntry;
  email: string | null;
};

const JournalEntryCard: React.FC<JournalEntryCardProps> = (props) => {
  const { entry, email } = props;
  const navigate = useNavigate();

  const navigateToEntry = () => {
    if (entry.date === moment().startOf('day').toISOString(true)) {
      navigate(`/home/${email?.split('@')[0]}`)
    } else {
      navigate(`/journal/entries/${entry.id}`)
    }
    
  }

  return (
    <JournalEntryCardContainer onClick={navigateToEntry}>
      <EditButtonContainer className="editButton">
        <IconButton color="inherit">
          <EditIcon />
        </IconButton>
      </EditButtonContainer>
      <JournalEntryCardStyled className="journalEntryCard">
        <Typography variant="h5"><b>{moment(entry.date).format("dddd, MMMM Do YYYY ")}</b></Typography>
      </JournalEntryCardStyled>
    </JournalEntryCardContainer>
  );
};

export default JournalEntryCard;