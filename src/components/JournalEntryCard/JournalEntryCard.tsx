import React from 'react';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { JournalEntry } from '../../pages/HomePage/HomePage';
import { JournalEntryCardContainer, JournalEntryCardStyled, EditButtonContainer } from './JournalEntryCard.styled';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

interface JournalEntryCardProps {
  entry: JournalEntry;
};

const JournalEntryCard: React.FC<JournalEntryCardProps> = (props) => {
  const { entry } = props;

  return (
    <JournalEntryCardContainer onClick={() => console.log("view entry")}>
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