import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { JournalEntry } from '../../pages/HomePage/HomePage';

interface JournalEntryCardProps {
  entry: JournalEntry;
};

const JournalEntryCard: React.FC<JournalEntryCardProps> = (props) => {
  const { entry } = props;

  return (
    <Box border={'1px solid grey'} borderRadius={5} p={2} width={200} height={150} m={2} display={"flex"} alignItems={"center"}> 
      <Typography variant="h5"><b>{moment(entry.date).format("dddd, MMMM Do YYYY ")}</b></Typography>
    </Box>
  );
};

export default JournalEntryCard;