import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

interface JournalEntryDisplayProps {

}

const JournalEntryDisplay: React.FC<JournalEntryDisplayProps> = (props) => {
    return (
        <Box width={"100%"} display="flex" flexDirection="column" mt={7}>
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-around">
                <Box>
                    <Typography variant="body1"><strong>Water</strong></Typography>
                    <Box border={"1px solid black"} borderRadius={"50%"} height={200} width={200}>
                        <Typography variant="body1">100%</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="body1"><strong>Protein</strong></Typography>
                    <Box border={"1px solid black"} borderRadius={"50%"} height={200} width={200}>
                        <Typography variant="body1">100%</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="body1"><strong>Exercise</strong></Typography>
                    <Box border={"1px solid black"} borderRadius={"50%"} height={200} width={200}>
                        <Typography variant="body1">100%</Typography>
                    </Box>
                </Box>
            </Box>    
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-evenly" mt={7}>
                <Box>
                    <Typography variant="body1"><strong>Kegels</strong></Typography>
                    <Box border={"1px solid black"} borderRadius={"50%"} height={200} width={200}>
                        <Typography variant="body1">100%</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="body1"><strong>Garland Pose</strong></Typography>
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
                mx={3}
            >
                <Box display="flex" flexDirection="row">
                    <Typography variant="body1" pr={2}><strong>Vitamins</strong></Typography>
                    <CheckBoxIcon />
                </Box>
                <Box display="flex" flexDirection="row">
                    <Typography variant="body1" pr={2}><strong>Probiotics</strong></Typography>
                    <CheckBoxOutlineBlankIcon />
                </Box>
            </Box>    
            <Box mt={7}>
                <Box display="flex" flexDirection="row" justifyContent="space-evenly">
                    <Box>
                        <Typography variant="body1"><strong>Childbirth Education</strong></Typography>
                        <Box border={"1px solid black"} height={300} width={350} borderRadius={5}>
                            Childbirth Education
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="body1"><strong>Self Care</strong></Typography>
                       <Box border={"1px solid black"} height={300} width={350} borderRadius={5}>
                            Self Care
                        </Box> 
                    </Box>
                    
                </Box>
                <Box display="flex" flexDirection="row"  justifyContent="space-evenly" mt={7}>
                    <Box>
                        <Typography variant="body1"><strong>Postpartum Prep</strong></Typography>
                        <Box border={"1px solid black"} height={300} width={350} borderRadius={5}>
                            Postpartum Prep
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="body1"><strong>Fetal Love Break</strong></Typography>
                        <Box border={"1px solid black"} height={300} width={350} borderRadius={5}>
                            Fetal Love Break
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                border={"1px solid black"} 
                my={7} 
                display="flex" 
                flexDirection="column" 
                height={90}
                mx={3}
            >
                <Typography variant="body1" mb={1}><strong>Mood</strong></Typography>
                <Box display="flex" flexDirection="row" justifyContent="space-around">
                    <SentimentVeryDissatisfiedIcon fontSize="large" />
                    <SentimentDissatisfiedIcon fontSize="large" />
                    <SentimentNeutralIcon fontSize="large" />
                    <SentimentSatisfiedIcon fontSize="large" />
                    <SentimentSatisfiedAltIcon fontSize="large" color="success"/>
                </Box>
            </Box>
        </Box>
    );
};

export default JournalEntryDisplay;