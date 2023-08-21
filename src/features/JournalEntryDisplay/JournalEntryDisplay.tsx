import React, { useState } from 'react';
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
    WritingSectionContainer,
    EditButtonContainer
} from "./JournalEntryDisplay.styled";
import UpdateEntryModal from '../../components/UpdateEntryModal/UpdateEntryModal';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDeleteJournalEntry } from '../../api/journalEntries/journalEntry';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import useMediaQuery from '@mui/material/useMediaQuery';

interface JournalEntryDisplayProps {
    journalEntry: JournalEntry | null;
    user: User;
    refetch: () => void;
    triggerSnackBar: (err: boolean, message: string) => void;
}

const JournalEntryDisplay: React.FC<JournalEntryDisplayProps> = (props) => {
    const { journalEntry, user, refetch, triggerSnackBar } = props;
    const [isUpdateEntryModalOpen, setIsUpdateEntryModalOpen] = useState(false);
    const [sectionEditing, setSectionEditing] = useState<string>("");
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const deleteJournalEntry = useDeleteJournalEntry();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:450px)');

    const { 
        // id: goalsId,
        exerciseGoal, 
        garlandPoseGoal, 
        kegelsGoal, 
        proteinIntakeGoal, 
        waterIntakeGoal 
    } = user.goals;

    const {
        id,
        // authorId,
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

    const editSection = (section: string) => {
        setSectionEditing(section);
        setIsUpdateEntryModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateEntryModalOpen(false);
        setSectionEditing("");
    };

    const onUpdateClick = (err: boolean, message: string) => {
        triggerSnackBar(err, message);
        if (err) {
          setIsUpdateEntryModalOpen(true);
        } else {
          setIsUpdateEntryModalOpen(false);
          refetch();
        };
    };

    const onDeleteClick = () => {
        if (id) {
            setIsDeleting(true);
            deleteJournalEntry.mutate(id, {
                onError: (err: any) => {
                    triggerSnackBar(true, err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.');
                    setIsDeleting(false);
                },
                onSuccess: () => {
                    triggerSnackBar(false, 'Journal entry deletion successful!');
                    if (date === dayjs().startOf('day').toISOString()) {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    } else {
                        setTimeout(() => {
                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            navigate(`/journal/entries`);
                        }, 1500);
                    }
                }
            });
        } else {
            triggerSnackBar(true, 'Something went wrong, please try again or contact us for help.');
        }
    };

    return (
        <>
            <Box width={"100%"} display="flex" flexDirection="column" mt={3}>
                <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-around">
                    <GraphContainer onClick={() => editSection("waterIntake")} mx={2} mt={2}>
                        <DoughnutGraph name={'Water'} completed={waterIntake} goal={waterIntakeGoal} color={"#1ca3ec"}/>
                        <EditButtonContainer className="editButton">
                            <IconButton color="inherit">
                                <EditIcon />
                            </IconButton>
                        </EditButtonContainer>
                    </GraphContainer>
                    <GraphContainer onClick={() => editSection("proteinIntake")} mx={2} mt={2}>
                        <DoughnutGraph name={'Protein'} completed={proteinIntake} goal={proteinIntakeGoal} color={"#FF6961"}/>
                        <EditButtonContainer className="editButton">
                            <IconButton color="inherit">
                                <EditIcon />
                            </IconButton>
                        </EditButtonContainer>
                    </GraphContainer>
                    <GraphContainer onClick={() => editSection("exercise")} mx={2} mt={2}>
                        <DoughnutGraph name={'Exercise'} completed={exercise} goal={exerciseGoal} color={"#7FFFD4"}/>
                        <EditButtonContainer className="editButton">
                            <IconButton color="inherit">
                                <EditIcon />
                            </IconButton>
                        </EditButtonContainer>
                    </GraphContainer>
                </Box>    
                <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-evenly">
                    <GraphContainer onClick={() => editSection("kegels")} mx={2} mt={2}>
                        <DoughnutGraph name={'Kegels'} completed={kegels} goal={kegelsGoal} color={"#C27BA0"}/>
                        <EditButtonContainer className="editButton">
                            <IconButton color="inherit">
                                <EditIcon />
                            </IconButton>
                        </EditButtonContainer>
                    </GraphContainer>
                    <GraphContainer onClick={() => editSection("garlandPose")} mx={2} mt={2}>
                        <DoughnutGraph name={'Garland Pose'} completed={garlandPose} goal={garlandPoseGoal} color={"#9966CC"}/>
                        <EditButtonContainer className="editButton">
                            <IconButton color="inherit">
                                <EditIcon />
                            </IconButton>
                        </EditButtonContainer>
                    </GraphContainer>
                </Box>
                <CheckBoxContainer mt={7} mx={3} height={isMobile ? 200 : 150} flexDirection={isMobile ? 'column' : 'row'} onClick={() => editSection("checkbox")}>
                    <CheckBoxSection className="checkBoxSection">
                        <Typography variant="body1" pr={2}><strong>Prenatal Vitamins</strong></Typography>
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
                <Box mt={7} mx={3} height={"100%"}>
                    <Box display="flex" flexDirection="row" justifyContent="space-evenly">
                        <WritingContainer onClick={() => editSection("childbirthEducation")}>
                            <WritingSection className="writingSection">
                                <Typography variant="body1"><strong>Childbirth Education</strong></Typography>
                                <WritingSectionContainer borderRadius={5} height={"100%"} width={"100%"} p={1}>
                                    <Typography variant="body1">{childbirthEducation}</Typography>
                                </WritingSectionContainer>
                            </WritingSection>
                            <EditButtonContainer className="editButton" top={-15}>
                                <IconButton color="inherit">
                                    <EditIcon />
                                </IconButton>
                            </EditButtonContainer>
                        </WritingContainer>
                        <WritingContainer onClick={() => editSection("selfCare")}>
                            <WritingSection className="writingSection">
                                <Typography variant="body1"><strong>Self Care</strong></Typography>
                                <WritingSectionContainer borderRadius={5} height={"100%"} width={"100%"} p={1}>
                                    <Typography variant="body1">{selfCare}</Typography>
                                </WritingSectionContainer> 
                                <EditButtonContainer className="editButton" top={-15}>
                                    <IconButton color="inherit">
                                        <EditIcon />
                                    </IconButton>
                                </EditButtonContainer>
                            </WritingSection>
                        </WritingContainer>
                    </Box>
                    <Box display="flex" flexDirection="row"  justifyContent="space-evenly" mt={7}>
                        <WritingContainer onClick={() => editSection("postpartumPrep")}>
                            <WritingSection className="writingSection">
                                <Typography variant="body1"><strong>Postpartum Prep</strong></Typography>
                                <WritingSectionContainer borderRadius={5} height={"100%"} width={"100%"} p={1}>
                                    <Typography variant="body1">{postpartumPrep}</Typography>
                                </WritingSectionContainer>
                                <EditButtonContainer className="editButton" top={-15}>
                                    <IconButton color="inherit">
                                        <EditIcon />
                                    </IconButton>
                                </EditButtonContainer>
                            </WritingSection>
                        </WritingContainer>
                        <WritingContainer onClick={() => editSection("fetalLoveBreak")}>
                            <WritingSection className="writingSection">
                                <Typography variant="body1"><strong>Fetal Love Break</strong></Typography>
                                <WritingSectionContainer borderRadius={5} height={"100%"} width={"100%"} p={1}>
                                    <Typography variant="body1">{fetalLoveBreak}</Typography>
                                </WritingSectionContainer>
                                <EditButtonContainer className="editButton" top={-15}>
                                    <IconButton color="inherit">
                                        <EditIcon />
                                    </IconButton>
                                </EditButtonContainer>
                            </WritingSection>
                        </WritingContainer>
                    </Box>
                </Box>
                <MoodContainer my={3} mx={3}>
                    <MoodSection className="moodSection" onClick={() => editSection("mood")}>
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
                {id && 
                    (<Box my={5}>
                        <Typography variant="body1" mb={1}>Want to remove this journal entry?</Typography>
                        <LoadingButton 
                            loading={isDeleting}
                            onClick={onDeleteClick}
                            variant="contained" 
                            color="warning"
                            size="small"
                        >
                                Delete Entry
                        </LoadingButton> 
                    </Box>)
                }
            </Box>
            <UpdateEntryModal 
                isOpen={isUpdateEntryModalOpen}
                onClose={() => closeUpdateModal()}
                modalTitle="Update Journal Entry Section"
                modalDescription="Update the journal entry or go back to the dashboard."
                modalMessage="Please input your updated information for this journal entry."
                section={sectionEditing}
                journalEntry={journalEntry}
                user={user}
                onUpdateClick={onUpdateClick}
            />
        </>
    );
};

export default JournalEntryDisplay;