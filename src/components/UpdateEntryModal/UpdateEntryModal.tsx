import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import DoughnutGraph from '../DoughnutGraph/DoughnutGraph';
import { JournalEntry } from '../../pages/HomePage/HomePage';
import { User } from '../../shared/auth-context';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';

interface UpdateEntryModalProps {
    isOpen: boolean;
    onClose: () => void;
    modalTitle: string;
    modalDescription: string;
    modalMessage: string;
    section: string;
    journalEntry: JournalEntry | null;
    user: User;
};

const UpdateEntryModal: React.FC<UpdateEntryModalProps> = (props) => {
    const { 
        isOpen, 
        onClose, 
        modalTitle, 
        modalDescription, 
        // modalMessage, 
        section,
        journalEntry,
        user
    } = props;

    const {
        // id,
        // authorId,
        // date,
        waterIntake = 0, 
        // proteinIntake = 0, 
        // exercise = 0, 
        // kegels = 0, 
        // garlandPose = 0, 
        // prenatalVitamins, 
        // probiotics, 
        // mood = "",
        // childbirthEducation = "Write about what you read today...",
        // selfCare = "Write about what you did for your body today...",
        // postpartumPrep = "Write about how you are preparing for postpartum...",
        // fetalLoveBreak = "Write about what you said to your baby today..."
    } = journalEntry ?? {};

    const { 
        // id: goalsId,
        // exerciseGoal, 
        // garlandPoseGoal, 
        // kegelsGoal, 
        // proteinIntakeGoal, 
        waterIntakeGoal 
    } = user.goals;

    const [isLoading, setIsLoading] = useState(false);
    const [updateWaterIntake, setUpdateWaterIntake] = useState(waterIntake);

    const renderCurrentInputType = () => {
        switch (section) {
            case "waterIntake":
                return (
                    <>
                        <Box height={250} width={250}>
                            <DoughnutGraph name={'Water'} completed={updateWaterIntake} goal={waterIntakeGoal} color={"#1ca3ec"}/>
                        </Box>
                        <Box display="flex" flexDirection="row" mt={5}>
                            <Box mr={5}>
                                <Button 
                                    variant="outlined"
                                    onClick={() => setUpdateWaterIntake(prev => prev - 1)}
                                    disabled={updateWaterIntake === 0}
                                >
                                    <RemoveIcon/>
                                </Button>
                            </Box>
                            <Typography variant="h6">{updateWaterIntake}</Typography>
                            <Box ml={5}>
                                <Button variant="outlined" onClick={() => setUpdateWaterIntake(prev => prev + 1)}>
                                    <AddIcon/>
                                </Button>
                            </Box>
                        </Box>
                    </>
                );
            case "proteinIntake":
                return (
                    <Box height={250} width={250}>
                        <DoughnutGraph name={'Protein'} completed={5} goal={20} color={"#FF6961"}/>
                    </Box>
                );
            case "exercise":
                return (
                    <Box height={250} width={250}>
                        <DoughnutGraph name={'Exercise'} completed={5} goal={20} color={"#7FFFD4"}/>
                    </Box>
                );
            case "kegels":
                return (
                    <Box height={250} width={250}>
                        <DoughnutGraph name={'Kegels'} completed={5} goal={20} color={"#C27BA0"}/>
                    </Box>
                );
            case "garlandPose":
                return (
                    <Box height={250} width={250}>
                        <DoughnutGraph name={'Garland Pose'} completed={5} goal={20} color={"#9966CC"}/>
                    </Box>
                );
            case "checkbox":
                return (<Typography variant="body1">checkbox</Typography>);
            case "writing":
                return (<Typography variant="body1">writing</Typography>);
            case "mood":
                return (<Typography variant="body1">mood</Typography>);
            default:
                return (<Typography variant="body1">An error occurred, please try again!</Typography>)
        }
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby={`${modalTitle}`}
            aria-describedby={`${modalDescription}`}
            className="update-entry-modal"
        >
            <Box bgcolor="white" width={450} height={450} position="relative" p={3} display="flex" flexDirection="column" textAlign={"center"} alignItems="center">
                <Box position={"absolute"} left={"92%"} top={"1%"}>
                    <IconButton onClick={onClose} edge="start" color="inherit" aria-label="exit">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant="h4" mb={3}>Update Journal Entry</Typography>
                {renderCurrentInputType()}
                <Box display="flex" justifyContent={"center"} mt={3}>
                    <LoadingButton
                        onClick={() => console.log("update")} 
                        variant='contained' 
                        color='success'
                        loading={isLoading}
                    >
                            Update
                    </LoadingButton>
                </Box>
            </Box>
        </Modal>
    )
};

export default UpdateEntryModal;