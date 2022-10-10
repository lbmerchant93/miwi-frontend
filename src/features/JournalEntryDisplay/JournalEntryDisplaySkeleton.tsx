import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    GraphContainer,
    CheckBoxContainer,
    CheckBoxSection,
    MoodContainer,
    MoodSection,
    WritingContainer,
    WritingSection
} from "./JournalEntryDisplay.styled";
import Skeleton from '@mui/material/Skeleton';

const JournalEntryDisplaySkeleton = () => {
    return (
        <Box width={"100%"} display="flex" flexDirection="column" mt={3}>
                <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-around">
                    <GraphContainer>
                        <Skeleton  variant="circular" height={250} width={250}/>
                    </GraphContainer>
                    <GraphContainer>
                        <Skeleton  variant="circular" height={250} width={250}/>
                    </GraphContainer>
                    <GraphContainer>
                        <Skeleton  variant="circular" height={250} width={250}/>
                    </GraphContainer>
                </Box>    
                <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-evenly" mt={7}>
                    <GraphContainer>
                        <Skeleton  variant="circular" height={250} width={250}/>
                    </GraphContainer>
                    <GraphContainer>
                        <Skeleton  variant="circular" height={250} width={250}/>
                    </GraphContainer>
                </Box>
                <CheckBoxContainer mt={7} mx={3} height={150}>
                    <CheckBoxSection className="checkBoxSection">
                        <Typography variant="body1" pr={2} width={125}><Skeleton /></Typography>
                    </CheckBoxSection>
                    <CheckBoxSection className="checkBoxSection">
                        <Typography variant="body1" pr={2} width={125}><Skeleton /></Typography>
                    </CheckBoxSection>
                </CheckBoxContainer>    
                <Box mt={7} mx={3} height={"100%"}>
                    <Box display="flex" flexDirection="row" justifyContent="space-evenly">
                        <WritingContainer>
                            <WritingSection className="writingSection">
                                <Typography variant="body1"><strong>Childbirth Education</strong></Typography>
                                <Box border={"1px solid black"} borderRadius={5} height={"100%"} width={"100%"} p={1}>
                                    <Typography variant="body1"><Skeleton /></Typography>
                                    <Typography variant="body1"><Skeleton /></Typography>
                                    <Typography variant="body1"><Skeleton /></Typography>
                                    <Typography variant="body1"><Skeleton /></Typography>
                                </Box>
                            </WritingSection>
                        </WritingContainer>
                        <WritingContainer>
                            <WritingSection className="writingSection">
                                <Typography variant="body1"><strong>Self Care</strong></Typography>
                                <Box border={"1px solid black"} borderRadius={5} height={"100%"} width={"100%"} p={1}>
                                    <Typography variant="body1"><Skeleton /></Typography>
                                    <Typography variant="body1"><Skeleton /></Typography>
                                    <Typography variant="body1"><Skeleton /></Typography>
                                    <Typography variant="body1"><Skeleton /></Typography>
                                </Box> 
                            </WritingSection>
                        </WritingContainer>
                    </Box>
                    <Box display="flex" flexDirection="row"  justifyContent="space-evenly" mt={7}>
                        <WritingContainer>
                            <WritingSection className="writingSection">
                                <Typography variant="body1"><strong>Postpartum Prep</strong></Typography>
                                <Box border={"1px solid black"} borderRadius={5} height={"100%"} width={"100%"} p={1}>
                                    <Typography variant="body1"><Skeleton /></Typography>
                                    <Typography variant="body1"><Skeleton /></Typography>
                                    <Typography variant="body1"><Skeleton /></Typography>
                                    <Typography variant="body1"><Skeleton /></Typography>
                                </Box>
                            </WritingSection>
                        </WritingContainer>
                        <WritingContainer>
                            <WritingSection className="writingSection">
                                <Typography variant="body1"><strong>Fetal Love Break</strong></Typography>
                                <Box border={"1px solid black"} borderRadius={5} height={"100%"} width={"100%"} p={1}>
                                    <Typography variant="body1"><Skeleton /></Typography>
                                    <Typography variant="body1"><Skeleton /></Typography>
                                    <Typography variant="body1"><Skeleton /></Typography>
                                    <Typography variant="body1"><Skeleton /></Typography>
                                </Box>
                            </WritingSection>
                        </WritingContainer>
                    </Box>
                </Box>
                <MoodContainer my={3} mx={3}>
                    <MoodSection className="moodSection">
                        <Typography variant="body1" mb={1}><strong>Mood</strong></Typography>
                        <Box display="flex" flexDirection="row" justifyContent="space-around" >
                            <Skeleton variant="circular" height={30} width={30}/>
                            <Skeleton variant="circular" height={30} width={30}/>
                            <Skeleton variant="circular" height={30} width={30}/>
                            <Skeleton variant="circular" height={30} width={30}/>
                            <Skeleton variant="circular" height={30} width={30}/>
                        </Box>
                    </MoodSection>
                </MoodContainer>
            </Box>
    );
};

export default JournalEntryDisplaySkeleton;