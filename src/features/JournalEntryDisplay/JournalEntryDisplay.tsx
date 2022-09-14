import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface JournalEntryDisplayProps {

}

const JournalEntryDisplay: React.FC<JournalEntryDisplayProps> = (props) => {
    return (
        <Box width={"100%"} display="flex" flexDirection="column" mt={7}>
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
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-evenly" mt={7}>
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
            <Box 
                border={"1px solid black"} 
                mt={7} 
                display="flex" 
                flexDirection="row" 
                justifyContent="space-around" 
                alignItems="center" 
                height={90}
            >
                <Box display="flex" flexDirection="row">
                    <Typography variant="body1" pr={2}>Vitamins</Typography>
                    <CheckBoxIcon />
                </Box>
                <Box display="flex" flexDirection="row">
                    <Typography variant="body1" pr={2}>Probiotics</Typography>
                    <CheckBoxOutlineBlankIcon />
                </Box>
            </Box>    
            

            
            <Box>Writing</Box>
            <Box>Mood</Box>
        </Box>
    );
};

export default JournalEntryDisplay;