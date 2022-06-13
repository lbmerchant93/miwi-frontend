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
        <Box className='dashboard'>
            {Array(9).fill(<JournalEntryCardSkeleton />)}
        </Box>
    )
}

export default JournalEntryCardSkeletonGrid;