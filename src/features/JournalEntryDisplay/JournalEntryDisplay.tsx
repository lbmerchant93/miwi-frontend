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
import { JournalEntry } from '../../pages/HomePage/HomePage';
import { User } from '../../shared/auth-context';
import DoughnutGraph from '../../components/DoughnutGraph/DoughnutGraph';
import styled from 'styled-components/macro'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

const GraphContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    position: relative;
    height: 250px;
    width: 250px;

    :hover {
        cursor: pointer;
    }

    :hover .graphContainer{
        opacity: 0.6
    }

    :hover .editButton{
        opacity: 1
    }
`;

const CheckBoxContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border: 1px solid black;
    height: 92px;

    :hover {
        cursor: pointer;
    }

    :hover .checkBoxSection{
        opacity: 0.6
    }

    :hover .editButton{
        opacity: 1
    }
`;

const CheckBoxSection = styled(Box)`
    opacity: 1;
    display: flex;
    flex-direction: row;
`;

const MoodContainer = styled(Box)`
    border: 1px solid black;

    :hover {
        cursor: pointer;
    }

    :hover .moodSection{
        opacity: 0.6
    }

    :hover .editButton{
        opacity: 1
    }
`;

const MoodSection = styled(Box)`
    display: flex;
    flex-direction: column;
    height: 92px;
`;

const WritingContainer = styled(Box)`
    position: relative;

    :hover {
        cursor: pointer;
    }

    :hover .writingSection{
        opacity: 0.6
    }

    :hover .editButton{
        opacity: 1
    }
`;

const WritingSection = styled(Box)`
    height: 325px;
    width: 325px;
`;

const EditButtonStyled = styled(Box)`
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    left: 90%;
`;

interface JournalEntryDisplayProps {
    journalEntry: JournalEntry | null;
    user: User;
}

const JournalEntryDisplay: React.FC<JournalEntryDisplayProps> = (props) => {
    const { journalEntry, user } = props;

    const { 
        id: goalsId,
        exerciseGoal, 
        garlandPoseGoal, 
        kegelsGoal, 
        proteinIntakeGoal, 
        waterIntakeGoal 
    } = user.goals;

    const {
        id,
        authorId,
        date,
        waterIntake = 0, 
        proteinIntake = 0, 
        exercise = 0, 
        kegels = 0, 
        garlandPose = 0, 
        prenatalVitamins, 
        probiotics, 
        mood = "",
        childbirthEducation = "Write about what you read today...",
        selfCare = "Write about what you did for your body today...",
        postpartumPrep = "Write about how you are preparing for postpartum...",
        fetalLoveBreak = "Write about what you said to your baby today..."
    } = journalEntry ?? {};

    const editSection = () => {
        console.log("Edit Section")
    }

    return (
        <Box width={"100%"} display="flex" flexDirection="column" mt={3}>
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-around">
                <GraphContainer onClick={() => editSection()}>
                    <DoughnutGraph name={'Water'} completed={waterIntake} goal={waterIntakeGoal} color={"#1ca3ec"}/>
                    <EditButtonStyled className="editButton">
                        <IconButton color="inherit">
                            <EditIcon />
                        </IconButton>
                    </EditButtonStyled>
                </GraphContainer>
                <GraphContainer onClick={() => editSection()}>
                    <DoughnutGraph name={'Protein'} completed={proteinIntake} goal={proteinIntakeGoal} color={"#FF6961"}/>
                    <EditButtonStyled className="editButton">
                        <IconButton color="inherit">
                            <EditIcon />
                        </IconButton>
                    </EditButtonStyled>
                </GraphContainer>
                <GraphContainer onClick={() => editSection()}>
                    <DoughnutGraph name={'Exercise'} completed={exercise} goal={exerciseGoal} color={"#7FFFD4"}/>
                    <EditButtonStyled className="editButton">
                        <IconButton color="inherit">
                            <EditIcon />
                        </IconButton>
                    </EditButtonStyled>
                </GraphContainer>
            </Box>    
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-evenly" mt={7}>
                <GraphContainer onClick={() => editSection()}>
                    <DoughnutGraph name={'Kegels'} completed={kegels} goal={kegelsGoal} color={"#C27BA0"}/>
                    <EditButtonStyled className="editButton">
                        <IconButton color="inherit">
                            <EditIcon />
                        </IconButton>
                    </EditButtonStyled>
                </GraphContainer>
                <GraphContainer onClick={() => editSection()}>
                    <DoughnutGraph name={'Garland Pose'} completed={garlandPose} goal={garlandPoseGoal} color={"#9966CC"}/>
                    <EditButtonStyled className="editButton">
                        <IconButton color="inherit">
                            <EditIcon />
                        </IconButton>
                    </EditButtonStyled>
                </GraphContainer>
            </Box>
            <CheckBoxContainer mt={7} mx={3} onClick={() => editSection()}>
                <CheckBoxSection className="checkBoxSection">
                    <Typography variant="body1" pr={2}><strong>Vitamins</strong></Typography>
                    {prenatalVitamins ? <CheckBoxIcon color="disabled" /> : <CheckBoxOutlineBlankIcon color="disabled" />}
                </CheckBoxSection>
                <CheckBoxSection className="checkBoxSection">
                    <Typography variant="body1" pr={2}><strong>Probiotics</strong></Typography>
                    {probiotics ? <CheckBoxIcon color="disabled" /> : <CheckBoxOutlineBlankIcon color="disabled" />}
                </CheckBoxSection>
                <EditButtonStyled className="editButton">
                    <IconButton color="inherit">
                        <EditIcon />
                    </IconButton>
                </EditButtonStyled>
            </CheckBoxContainer>    
            <Box mt={7}>
                <Box display="flex" flexDirection="row" justifyContent="space-evenly">
                    <WritingContainer onClick={() => editSection()}>
                        <WritingSection className="writingSection">
                            <Typography variant="body1"><strong>Childbirth Education</strong></Typography>
                            <Box border={"1px solid black"} borderRadius={5} height={"100%"} width={"100%"}>
                                <Typography variant="body1">{childbirthEducation}</Typography>
                            </Box>
                        </WritingSection>
                        <EditButtonStyled className="editButton" top={-15}>
                            <IconButton color="inherit">
                                <EditIcon />
                            </IconButton>
                        </EditButtonStyled>
                    </WritingContainer>
                    <WritingContainer onClick={() => editSection()}>
                        <WritingSection className="writingSection">
                            <Typography variant="body1"><strong>Self Care</strong></Typography>
                            <Box border={"1px solid black"} borderRadius={5} height={"100%"} width={"100%"}>
                                <Typography variant="body1">{selfCare}</Typography>
                            </Box> 
                            <EditButtonStyled className="editButton" top={-15}>
                                <IconButton color="inherit">
                                    <EditIcon />
                                </IconButton>
                            </EditButtonStyled>
                        </WritingSection>
                    </WritingContainer>
                </Box>
                <Box display="flex" flexDirection="row"  justifyContent="space-evenly" mt={7}>
                    <WritingContainer onClick={() => editSection()}>
                        <WritingSection className="writingSection">
                            <Typography variant="body1"><strong>Postpartum Prep</strong></Typography>
                            <Box border={"1px solid black"} borderRadius={5} height={"100%"} width={"100%"}>
                                <Typography variant="body1">{postpartumPrep}</Typography>
                            </Box>
                            <EditButtonStyled className="editButton" top={-15}>
                                <IconButton color="inherit">
                                    <EditIcon />
                                </IconButton>
                            </EditButtonStyled>
                        </WritingSection>
                    </WritingContainer>
                    <WritingContainer onClick={() => editSection()}>
                        <WritingSection className="writingSection">
                            <Typography variant="body1"><strong>Fetal Love Break</strong></Typography>
                            <Box border={"1px solid black"} borderRadius={5} height={"100%"} width={"100%"}>
                                <Typography variant="body1">{fetalLoveBreak}</Typography>
                            </Box>
                            <EditButtonStyled className="editButton" top={-15}>
                                <IconButton color="inherit">
                                    <EditIcon />
                                </IconButton>
                            </EditButtonStyled>
                        </WritingSection>
                    </WritingContainer>
                </Box>
            </Box>
            <MoodContainer my={7} mx={3}>
                <MoodSection className="moodSection" onClick={() => editSection()}>
                    <Typography variant="body1" mb={1}><strong>Mood</strong></Typography>
                    <Box display="flex" flexDirection="row" justifyContent="space-around" >
                        <SentimentVeryDissatisfiedIcon fontSize="large" color={mood === "horrible" ? "error" : "disabled"}/>
                        <SentimentDissatisfiedIcon fontSize="large" color={mood === "bad" ? "error" : "disabled"}/>
                        <SentimentNeutralIcon fontSize="large" color={mood === "ok" ? "inherit" : "disabled"}/>
                        <SentimentSatisfiedIcon fontSize="large" color={mood === "good" ? "success" : "disabled"}/>
                        <SentimentSatisfiedAltIcon fontSize="large" color={mood === "great" ? "success" : "disabled"}/>
                    </Box>
                    <EditButtonStyled className="editButton">
                        <IconButton color="inherit">
                            <EditIcon />
                        </IconButton>
                    </EditButtonStyled>
                </MoodSection>
            </MoodContainer>
        </Box>
    );
};

export default JournalEntryDisplay;