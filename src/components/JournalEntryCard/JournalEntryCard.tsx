import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { JournalEntry } from '../../pages/HomePage/HomePage';
import { JournalEntryCardContainer, JournalEntryCardStyled } from './JournalEntryCard.styled';

interface JournalEntryCardProps {
  entry: JournalEntry;
};

const JournalEntryCard: React.FC<JournalEntryCardProps> = (props) => {
  const { entry } = props;

  return (
    <JournalEntryCardContainer onClick={() => console.log("view entry")}>
      <JournalEntryCardStyled className="journalEntryCard">
        <Typography variant="h5"><b>{moment(entry.date).format("dddd, MMMM Do YYYY ")}</b></Typography>
      </JournalEntryCardStyled>
    </JournalEntryCardContainer>
  );
};

export default JournalEntryCard;