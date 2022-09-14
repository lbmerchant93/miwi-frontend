import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface JournalEntryDisplayProps {

}

const JournalEntryDisplay: React.FC<JournalEntryDisplayProps> = (props) => {
    return (
        <Box width={"100%"} display="flex" flexDirection="column" mt={3}>
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-around">
                <Box>
                    <Typography variant="body1">Water</Typography>
                    <Box border={"1px solid black"} borderRadius={"50%"} height={200} width={200}>
                        <Typography variant="body1">100%</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="body1">Protein</Typography>
                    <Box border={"1px solid black"} borderRadius={"50%"} height={200} width={200}>
                        <Typography variant="body1">100%</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="body1">Exercise</Typography>
                    <Box border={"1px solid black"} borderRadius={"50%"} height={200} width={200}>
                        <Typography variant="body1">100%</Typography>
                    </Box>
                </Box>
            </Box>    
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-evenly">
                <Box>
                    <Typography variant="body1">Kegels</Typography>
                    <Box border={"1px solid black"} borderRadius={"50%"} height={200} width={200}>
                        <Typography variant="body1">100%</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="body1">Garland Pose</Typography>
                    <Box border={"1px solid black"} borderRadius={"50%"} height={200} width={200}>
                        <Typography variant="body1">100%</Typography>
                    </Box>
                </Box>
            </Box>
                
            

            <Box>Check list</Box>
            <Box>Writing</Box>
            <Box>Mood</Box>
        </Box>
    );
};

export default JournalEntryDisplay;