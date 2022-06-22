import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';


const JournalEntryCardSkeleton = () => {
    return (
        <Skeleton sx={{ borderRadius: '10px', margin: '10px' }} variant='rectangular' width={300} height={263}/>
    )
};

const JournalEntryCardSkeletonGrid = () => {
    return (
        <Box className='dashboard-journal-entries-container'>
            {Array.from({length:9}, (_,i) => <JournalEntryCardSkeleton key={i} />)}
        </Box>
    )
}

export default JournalEntryCardSkeletonGrid;