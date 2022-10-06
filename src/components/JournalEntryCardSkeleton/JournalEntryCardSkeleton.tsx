import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';


const JournalEntryCardSkeleton = () => {
    return (
        <Skeleton sx={{ borderRadius: '20px', margin: '16px', width: "232px", height: "182px" }} variant='rectangular'/>
    )
};

const JournalEntryCardSkeletonGrid = () => {
    return (
        <Box display="flex" flexWrap="wrap" justifyContent="center">
            {Array.from({length:15}, (_,i) => <JournalEntryCardSkeleton key={i} />)}
        </Box>
    )
}

export default JournalEntryCardSkeletonGrid;