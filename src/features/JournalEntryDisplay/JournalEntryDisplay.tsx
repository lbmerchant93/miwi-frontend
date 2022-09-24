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
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import {
    GraphContainer,
    CheckBoxContainer,
    CheckBoxSection,
    MoodContainer,
    MoodSection,
    WritingContainer,
    WritingSection,
    EditButtonContainer
} from "./JournalEntryDisplay.styled"

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
                    <EditButtonContainer className="editButton">
                        <IconButton color="inherit">
                            <EditIcon />
                        </IconButton>
                    </EditButtonContainer>
                </GraphContainer>
                <GraphContainer onClick={() => editSection()}>
                    <DoughnutGraph name={'Protein'} completed={proteinIntake} goal={proteinIntakeGoal} color={"#FF6961"}/>
                    <EditButtonContainer className="editButton">
                        <IconButton color="inherit">
                            <EditIcon />
                        </IconButton>
                    </EditButtonContainer>
                </GraphContainer>
                <GraphContainer onClick={() => editSection()}>
                    <DoughnutGraph name={'Exercise'} completed={exercise} goal={exerciseGoal} color={"#7FFFD4"}/>
                    <EditButtonContainer className="editButton">
                        <IconButton color="inherit">
                            <EditIcon />
                        </IconButton>
                    </EditButtonContainer>
                </GraphContainer>
            </Box>    
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-evenly" mt={7}>
                <GraphContainer onClick={() => editSection()}>
                    <DoughnutGraph name={'Kegels'} completed={kegels} goal={kegelsGoal} color={"#C27BA0"}/>
                    <EditButtonContainer className="editButton">
                        <IconButton color="inherit">
                            <EditIcon />
                        </IconButton>
                    </EditButtonContainer>
                </GraphContainer>
                <GraphContainer onClick={() => editSection()}>
                    <DoughnutGraph name={'Garland Pose'} completed={garlandPose} goal={garlandPoseGoal} color={"#9966CC"}/>
                    <EditButtonContainer className="editButton">
                        <IconButton color="inherit">
                            <EditIcon />
                        </IconButton>
                    </EditButtonContainer>
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
                <EditButtonContainer className="editButton">
                    <IconButton color="inherit">
                        <EditIcon />
                    </IconButton>
                </EditButtonContainer>
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
                        <EditButtonContainer className="editButton" top={-15}>
                            <IconButton color="inherit">
                                <EditIcon />
                            </IconButton>
                        </EditButtonContainer>
                    </WritingContainer>
                    <WritingContainer onClick={() => editSection()}>
                        <WritingSection className="writingSection">
                            <Typography variant="body1"><strong>Self Care</strong></Typography>
                            <Box border={"1px solid black"} borderRadius={5} height={"100%"} width={"100%"}>
                                <Typography variant="body1">{selfCare}</Typography>
                            </Box> 
                            <EditButtonContainer className="editButton" top={-15}>
                                <IconButton color="inherit">
                                    <EditIcon />
                                </IconButton>
                            </EditButtonContainer>
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
                            <EditButtonContainer className="editButton" top={-15}>
                                <IconButton color="inherit">
                                    <EditIcon />
                                </IconButton>
                            </EditButtonContainer>
                        </WritingSection>
                    </WritingContainer>
                    <WritingContainer onClick={() => editSection()}>
                        <WritingSection className="writingSection">
                            <Typography variant="body1"><strong>Fetal Love Break</strong></Typography>
                            <Box border={"1px solid black"} borderRadius={5} height={"100%"} width={"100%"}>
                                <Typography variant="body1">{fetalLoveBreak}</Typography>
                            </Box>
                            <EditButtonContainer className="editButton" top={-15}>
                                <IconButton color="inherit">
                                    <EditIcon />
                                </IconButton>
                            </EditButtonContainer>
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
                    <EditButtonContainer className="editButton">
                        <IconButton color="inherit">
                            <EditIcon />
                        </IconButton>
                    </EditButtonContainer>
                </MoodSection>
            </MoodContainer>
        </Box>
    );
};

export default JournalEntryDisplay;