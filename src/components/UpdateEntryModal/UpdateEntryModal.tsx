import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import DoughnutGraph from '../DoughnutGraph/DoughnutGraph';
import { JournalEntry } from '../../pages/HomePage/HomePage';
import { User } from '../../shared/auth-context';
import { useUpdateJournalEntry, useCreateJournalEntry } from '../../api/journalEntries/journalEntry';
import dayjs from 'dayjs';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import InputAdornment from '@mui/material/InputAdornment';

interface UpdateEntryModalProps {
    isOpen: boolean;
    onClose: () => void;
    modalTitle: string;
    modalDescription: string;
    modalMessage: string;
    section: string;
    journalEntry: JournalEntry | null;
    user: User;
    onUpdateClick: (err: boolean, message: string) => void;
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
        user, 
        onUpdateClick
    } = props;

    const {
        id,
        authorId = user.id,
        date = dayjs().startOf('day').toISOString(),
        waterIntake = 0, 
        proteinIntake = 0, 
        exercise = 0, 
        kegels = 0, 
        garlandPose = 0, 
        prenatalVitamins = false, 
        probiotics = false, 
        mood = "",
        childbirthEducation = "Write about what you read today...",
        selfCare = "Write about what you did for your body today...",
        postpartumPrep = "Write about how you are preparing for postpartum...",
        fetalLoveBreak = "Write about what you said to your baby today..."
    } = journalEntry ?? {};

    const { 
        // id: goalsId,
        exerciseGoal, 
        garlandPoseGoal, 
        kegelsGoal, 
        proteinIntakeGoal, 
        waterIntakeGoal 
    } = user.goals;

    const [isLoading, setIsLoading] = useState(false);
    const [updateWaterIntake, setUpdateWaterIntake] = useState(waterIntake);
    const [updateProteinIntake, setUpdateProteinIntake] = useState(proteinIntake);
    const [updateExercise, setUpdateExercise] = useState(exercise);
    const [updateKegels, setUpdateKegels] = useState(kegels);
    const [updateGarlandPose, setUpdateGarlandPose] = useState(garlandPose);
    const [updatePrenatalVitamins, setUpdatePrenatalVitamins] = useState(prenatalVitamins);
    const [updateProbiotics, setUpdateProbiotics] = useState(probiotics);
    const [updateChildbirthEducation, setUpdateChildbirthEducation] = useState(childbirthEducation);
    const [updateSelfCare, setUpdateSelfCare] = useState(selfCare);
    const [updatePostpartumPrep, setUpdatePostpartumPrep] = useState(postpartumPrep);
    const [updateFetalLoveBreak, setUpdateFetalLoveBreak] = useState(fetalLoveBreak);
    const [updateMood, setUpdateMood] = useState(mood);
    const updateJournalEntry = useUpdateJournalEntry();
    const createJournalEntry = useCreateJournalEntry();

    const handleUpdateEntry = () => {
        setIsLoading(true)
        if (id === undefined) {
            const journalEntry = {
                authorId: user.id,
                date: date,
                waterIntake: updateWaterIntake,
                proteinIntake: updateProteinIntake,
                exercise: updateExercise,
                kegels: updateKegels,
                garlandPose: updateGarlandPose,
                prenatalVitamins: updatePrenatalVitamins,
                probiotics: updateProbiotics,
                mood: updateMood,
                childbirthEducation: updateChildbirthEducation,
                selfCare: updateSelfCare,
                postpartumPrep: updatePostpartumPrep,
                fetalLoveBreak: updateFetalLoveBreak
            };
            createJournalEntry.mutate(journalEntry, {
                onError: (err: any) => {
                    onUpdateClick(true, err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                },
                onSuccess: () => {
                    onUpdateClick(false, 'Journal entry update successful!')
                },
                onSettled: () => {
                    setIsLoading(false)
                }
            });
        } else {
            const updatedEntry = {
                id: JSON.stringify(id),
                date: date,
                waterIntake: updateWaterIntake,
                proteinIntake: updateProteinIntake,
                exercise: updateExercise,
                kegels: updateKegels,
                garlandPose: updateGarlandPose,
                prenatalVitamins: updatePrenatalVitamins,
                probiotics: updateProbiotics,
                authorId: authorId,
                mood: updateMood,
                childbirthEducation: updateChildbirthEducation,
                selfCare: updateSelfCare,
                postpartumPrep: updatePostpartumPrep,
                fetalLoveBreak: updateFetalLoveBreak
            };
        
            const previousEntry = {
                id: JSON.stringify(id),
                date: date,
                waterIntake: waterIntake,
                proteinIntake: proteinIntake,
                exercise: exercise,
                kegels: kegels,
                garlandPose: garlandPose,
                prenatalVitamins: prenatalVitamins,
                probiotics: probiotics,
                authorId: authorId,
                mood: mood,
                childbirthEducation: childbirthEducation,
                selfCare: selfCare,
                postpartumPrep: postpartumPrep,
                fetalLoveBreak: fetalLoveBreak
            }
        
            if (JSON.stringify(updatedEntry) !== JSON.stringify(previousEntry)) {
                updateJournalEntry.mutate(updatedEntry, {
                    onError: (err: any) => {
                        onUpdateClick(true, err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                    },
                    onSuccess: () => {
                        onUpdateClick(false, 'Journal entry update successful!')
                    },
                    onSettled: () => {
                        setIsLoading(false)
                    }
                });
            } else {
                onUpdateClick(true, 'Please update the form before clicking submit.')
                setIsLoading(false)
            }; 
        };
    };

    const renderCurrentInputType = () => {
        switch (section) {
            case "waterIntake":
                return (
                    <>
                        <Box height={250} width={250}>
                            <DoughnutGraph name={'Water'} completed={updateWaterIntake} goal={waterIntakeGoal} color={"#1ca3ec"}/>
                        </Box>
                        <Box width={125} mt={1}>
                            <TextField
                                id="water-intake-update-input"
                                type="number"
                                value={updateWaterIntake}
                                onChange={(e) => setUpdateWaterIntake(parseInt(`${e.currentTarget.value}`))}
                                InputProps={{ inputProps: { min: 0 }, endAdornment: <InputAdornment position="end">oz</InputAdornment> }}
                                size='small'
                                disabled={isLoading}
                            />
                        </Box>
                    </>
                );
            case "proteinIntake":
                return (
                    <>
                        <Box height={250} width={250}>
                            <DoughnutGraph name={'Protein'} completed={updateProteinIntake} goal={proteinIntakeGoal} color={"#FF6961"}/>
                        </Box>
                        <Box width={125} mt={1}>
                            <TextField
                                id="protein-intake-update-input"
                                type="number"
                                value={updateProteinIntake}
                                onChange={(e) => setUpdateProteinIntake(parseInt(`${e.currentTarget.value}`))}
                                InputProps={{ inputProps: { min: 0 }, endAdornment: <InputAdornment position="end">g</InputAdornment> }}
                                size='small'
                                disabled={isLoading}
                            />
                        </Box>
                    </>
                );
            case "exercise":
                return (
                    <>
                        <Box height={250} width={250}>
                            <DoughnutGraph name={'Exercise'} completed={updateExercise} goal={exerciseGoal} color={"#7FFFD4"}/>
                        </Box>
                        <Box width={125} mt={1}>
                            <TextField
                                id="exercise-update-input"
                                type="number"
                                value={updateExercise}
                                onChange={(e) => setUpdateExercise(parseInt(`${e.currentTarget.value}`))}
                                InputProps={{ inputProps: { min: 0 }, endAdornment: <InputAdornment position="end">min</InputAdornment> }}
                                size='small'
                                disabled={isLoading}
                            />
                        </Box>
                    </>
                );
            case "kegels":
                return (
                    <>
                        <Box height={250} width={250}>
                            <DoughnutGraph name={'Kegels'} completed={updateKegels} goal={kegelsGoal} color={"#C27BA0"}/>
                        </Box>
                        <Box width={125} mt={1}>
                            <TextField
                                id="kegels-update-input"
                                type="number"
                                value={updateKegels}
                                onChange={(e) => setUpdateKegels(parseInt(`${e.currentTarget.value}`))}
                                InputProps={{ inputProps: { min: 0 }, endAdornment: <InputAdornment position="end">reps</InputAdornment> }}
                                size='small'
                                disabled={isLoading}
                            />
                        </Box>
                    </>
                );
            case "garlandPose":
                return (
                    <>
                        <Box height={250} width={250}>
                            <DoughnutGraph name={'Garland Pose'} completed={updateGarlandPose} goal={garlandPoseGoal} color={"#9966CC"}/>
                        </Box>
                        <Box width={125} mt={1}>
                            <TextField
                                id="garlandPose-update-input"
                                type="number"
                                value={updateGarlandPose}
                                onChange={(e) => setUpdateGarlandPose(parseInt(`${e.currentTarget.value}`))}
                                InputProps={{ inputProps: { min: 0 }, endAdornment: <InputAdornment position="end">min</InputAdornment> }}
                                size='small'
                                disabled={isLoading}
                            />
                        </Box>
                    </>
                );
            case "checkbox":
                return (
                    <>
                            <FormControlLabel
                                value="start"
                                control={<Checkbox checked={updatePrenatalVitamins} onChange={() => setUpdatePrenatalVitamins(!updatePrenatalVitamins)} />}
                                label={<Typography variant="h6"><strong>Prenatal Vitamins</strong></Typography>}
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="start"
                                control={<Checkbox checked={updateProbiotics} onChange={() => setUpdateProbiotics(!updateProbiotics)} />}
                                label={<Typography variant="h6"><strong>Probiotics</strong></Typography>}
                                labelPlacement="start"
                            />
                    </>
                );
            case "childbirthEducation":
                return (
                    <Box width={"100%"}>
                        <TextField
                            label="Childbirth Education"
                            multiline
                            rows={10}
                            value={updateChildbirthEducation}
                            onChange={(e) => setUpdateChildbirthEducation(e.currentTarget.value)}
                            fullWidth
                        />
                    </Box>
                );
            case "selfCare":
                return (
                    <Box width={"100%"}>
                        <TextField
                            label="Self Care"
                            multiline
                            rows={10}
                            value={updateSelfCare}
                            onChange={(e) => setUpdateSelfCare(e.currentTarget.value)}
                            fullWidth
                        />
                    </Box>
                );
            case "postpartumPrep":
                return (
                    <Box width={"100%"}>
                        <TextField
                            label="Postpartum Prep"
                            multiline
                            rows={10}
                            value={updatePostpartumPrep}
                            onChange={(e) => setUpdatePostpartumPrep(e.currentTarget.value)}
                            fullWidth
                        />
                    </Box>
                );
            case "fetalLoveBreak":
                return (
                    <Box width={"100%"}>
                        <TextField
                            label="Fetal Love Break"
                            multiline
                            rows={10}
                            value={updateFetalLoveBreak}
                            onChange={(e) => setUpdateFetalLoveBreak(e.currentTarget.value)}
                            fullWidth
                        />
                    </Box>
                );
            case "mood":
                return (
                    <Box>
                        <Typography variant="h6" mb={2}><strong>How did you feel today overall?</strong></Typography>
                        <Box display="flex" flexDirection="row" width={"100%"} justifyContent="space-around">
                            <SentimentVeryDissatisfiedIcon fontSize="large" color={updateMood === "horrible" ? "error" : "disabled"} onClick={() => setUpdateMood("horrible")} style={{ cursor: "pointer" }}/>
                            <SentimentDissatisfiedIcon fontSize="large" color={updateMood === "bad" ? "error" : "disabled"} onClick={() => setUpdateMood("bad")} style={{ cursor: "pointer" }}/>
                            <SentimentNeutralIcon fontSize="large" color={updateMood === "ok" ? "inherit" : "disabled"} onClick={() => setUpdateMood("ok")} style={{ cursor: "pointer" }}/>
                            <SentimentSatisfiedIcon fontSize="large" color={updateMood === "good" ? "success" : "disabled"} onClick={() => setUpdateMood("good")} style={{ cursor: "pointer" }}/>
                            <SentimentSatisfiedAltIcon fontSize="large" color={updateMood === "great" ? "success" : "disabled"} onClick={() => setUpdateMood("great")} style={{ cursor: "pointer" }}/>
                        </Box>
                    </Box>
                );
            default:
                return (<Typography variant="body1">An error occurred, please try again!</Typography>)
        }
    };

    const closeModal = () => {
        setUpdateWaterIntake(waterIntake);
        setUpdateProteinIntake(proteinIntake);
        setUpdateExercise(exercise);
        setUpdateKegels(kegels);
        setUpdateGarlandPose(garlandPose);
        setUpdatePrenatalVitamins(prenatalVitamins);
        setUpdateProbiotics(probiotics);
        setUpdateChildbirthEducation(childbirthEducation);
        setUpdateSelfCare(selfCare);
        setUpdatePostpartumPrep(postpartumPrep);
        setUpdateFetalLoveBreak(fetalLoveBreak);
        setUpdateMood(mood);
        onClose();
    };

    useEffect(() => {
        setUpdateWaterIntake(waterIntake);
        setUpdateProteinIntake(proteinIntake);
        setUpdateExercise(exercise);
        setUpdateKegels(kegels);
        setUpdateGarlandPose(garlandPose);
        setUpdatePrenatalVitamins(prenatalVitamins);
        setUpdateProbiotics(probiotics);
        setUpdateChildbirthEducation(childbirthEducation);
        setUpdateSelfCare(selfCare);
        setUpdatePostpartumPrep(postpartumPrep);
        setUpdateFetalLoveBreak(fetalLoveBreak);
        setUpdateMood(mood);
    }, [childbirthEducation, exercise, fetalLoveBreak, garlandPose, journalEntry, kegels, mood, postpartumPrep, prenatalVitamins, probiotics, proteinIntake, selfCare, waterIntake])

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            aria-labelledby={`${modalTitle}`}
            aria-describedby={`${modalDescription}`}
            className="update-entry-modal"
        >
            <Box bgcolor="white" width={450} height={450} position={"relative"} p={3} left={"50%"} top={"50%"} style={{ transform: 'translate(-50%, -50%)' }}>
                <Box position={"absolute"} left={"92%"} top={"1%"}>
                    <IconButton onClick={closeModal} edge="start" color="inherit" aria-label="exit">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box 
                    display="flex" 
                    flexDirection="column" 
                    textAlign="center"
                    alignItems="center" 
                    height={"100%"} 
                    justifyContent="space-between"
                >
                   <Typography variant="h4" mb={3}>Update Journal Entry</Typography>
                    {renderCurrentInputType()}
                    <Box display="flex" justifyContent={"center"} mt={3}>
                        <LoadingButton
                            onClick={() => handleUpdateEntry()} 
                            variant='contained' 
                            color='success'
                            loading={isLoading}
                        >
                                Update
                        </LoadingButton>
                    </Box> 
                </Box>
            </Box>
        </Modal>
    )
};

export default UpdateEntryModal;