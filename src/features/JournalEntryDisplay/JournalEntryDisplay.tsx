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
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import { JournalEntry } from '../../pages/HomePage/HomePage';
import { User } from '../../shared/auth-context';

interface JournalEntryDisplayProps {
    journalEntry: JournalEntry | null;
    user: User;
    isLoading: boolean;
}

const JournalEntryDisplay: React.FC<JournalEntryDisplayProps> = (props) => {
    const { journalEntry, user } = props;

    const { 
        id: goalsId,
        // Can use id here for the flash of wrong goals when a page is refreshed.. should fix later when fixing default goals on backend
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

    const calcPercentage = (completed: number, goal: number) => {
        let percentage = (100 * completed) / goal;
        if (isNaN(percentage)) {
            percentage = 0
        }
        return `${percentage}%`
    }

    return (
        <Box width={"100%"} display="flex" flexDirection="column" mt={7}>
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-around">
                <Box>
                    <Typography variant="body1"><strong>Water</strong></Typography>
                    <Box border={"1px solid black"} borderRadius={"50%"} height={200} width={200}>
                        <LocalDrinkIcon fontSize="large" color="info"/>
                        <Typography variant="body1">{waterIntake}</Typography>
                        <Typography variant="body1">{calcPercentage(waterIntake, waterIntakeGoal)}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="body1"><strong>Protein</strong></Typography>
                    <Box border={"1px solid black"} borderRadius={"50%"} height={200} width={200}>
                        <RestaurantIcon fontSize="large" color="disabled" />
                        <Typography variant="body1">{proteinIntake}</Typography>
                        <Typography variant="body1">{calcPercentage(proteinIntake, proteinIntakeGoal)}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="body1"><strong>Exercise</strong></Typography>
                    <Box border={"1px solid black"} borderRadius={"50%"} height={200} width={200}>
                        <FitnessCenterIcon fontSize="large" color="success" />
                        <Typography variant="body1">{exercise}</Typography>
                        <Typography variant="body1">{calcPercentage(exercise, exerciseGoal)}</Typography>
                    </Box>
                </Box>
            </Box>    
            <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-evenly" mt={7}>
                <Box>
                    <Typography variant="body1"><strong>Kegels</strong></Typography>
                    <Box border={"1px solid black"} borderRadius={"50%"} height={200} width={200}>
                        <Typography variant="body1">{kegels}</Typography>
                        <Typography variant="body1">{calcPercentage(kegels, kegelsGoal)}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="body1"><strong>Garland Pose</strong></Typography>
                    <Box border={"1px solid black"} borderRadius={"50%"} height={200} width={200}>
                        <SelfImprovementIcon fontSize="large" />
                        <Typography variant="body1">{garlandPose}</Typography>
                        <Typography variant="body1">{calcPercentage(garlandPose, garlandPoseGoal)}</Typography>
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
                    {prenatalVitamins ? <CheckBoxIcon color="disabled" /> : <CheckBoxOutlineBlankIcon color="disabled" />}
                </Box>
                <Box display="flex" flexDirection="row">
                    <Typography variant="body1" pr={2}><strong>Probiotics</strong></Typography>
                    {probiotics ? <CheckBoxIcon color="disabled" /> : <CheckBoxOutlineBlankIcon color="disabled" />}
                </Box>
            </Box>    
            <Box mt={7}>
                <Box display="flex" flexDirection="row" justifyContent="space-evenly">
                    <Box>
                        <Typography variant="body1"><strong>Childbirth Education</strong></Typography>
                        <Box border={"1px solid black"} height={300} width={350} borderRadius={5}>
                            <Typography variant="body1">{childbirthEducation}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="body1"><strong>Self Care</strong></Typography>
                       <Box border={"1px solid black"} height={300} width={350} borderRadius={5}>
                            <Typography variant="body1">{selfCare}</Typography>
                        </Box> 
                    </Box>
                    
                </Box>
                <Box display="flex" flexDirection="row"  justifyContent="space-evenly" mt={7}>
                    <Box>
                        <Typography variant="body1"><strong>Postpartum Prep</strong></Typography>
                        <Box border={"1px solid black"} height={300} width={350} borderRadius={5}>
                            <Typography variant="body1">{postpartumPrep}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="body1"><strong>Fetal Love Break</strong></Typography>
                        <Box border={"1px solid black"} height={300} width={350} borderRadius={5}>
                            <Typography variant="body1">{fetalLoveBreak}</Typography>
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
                    <SentimentVeryDissatisfiedIcon fontSize="large" color={mood === "horrible" ? "error" : "disabled"}/>
                    <SentimentDissatisfiedIcon fontSize="large" color={mood === "bad" ? "error" : "disabled"}/>
                    <SentimentNeutralIcon fontSize="large" color={mood === "ok" ? "inherit" : "disabled"}/>
                    <SentimentSatisfiedIcon fontSize="large" color={mood === "good" ? "success" : "disabled"}/>
                    <SentimentSatisfiedAltIcon fontSize="large" color={mood === "great" ? "success" : "disabled"}/>
                </Box>
            </Box>
        </Box>
    );
};

export default JournalEntryDisplay;