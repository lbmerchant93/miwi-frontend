import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { User } from '../../shared/auth-context';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import { useUpdateGoals } from '../../api/goals/goal';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import { UserGoal } from '../../pages/ProfilePage/ProfilePage.styled';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

interface UpdateUserGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
    triggerSnackBar: (err: boolean, message: string) => void;
    goal: string;
}

const UpdateUserGoalModal: React.FC<UpdateUserGoalModalProps> = (props) => {
    const { 
        isOpen,
        onClose,
        user,
        triggerSnackBar,
        goal
    } = props;

    const { 
        exerciseGoal, 
        garlandPoseGoal, 
        kegelsGoal, 
        proteinIntakeGoal, 
        waterIntakeGoal 
    } = user.goals;

    const [isLoading, setIsLoading] = useState(false);
    const [updateWaterIntakeGoal, setUpdateWaterIntakeGoal] = useState<number>(waterIntakeGoal);
    const [updateProteinIntakeGoal, setUpdateProteinIntakeGoal] = useState<number>(proteinIntakeGoal);
    const [updateExerciseGoal, setUpdateExerciseGoal] = useState<number>(exerciseGoal);
    const [updateKegelsGoal, setUpdateKegelsGoal] = useState<number>(kegelsGoal);
    const [updateGarlandPoseGoal, setUpdateGarlandPoseGoal] = useState<number>(garlandPoseGoal);
    const [error, setError] = useState<string>('');
    const updateGoals = useUpdateGoals();

    const closeModal = () => {
        setUpdateWaterIntakeGoal(waterIntakeGoal);
        setUpdateProteinIntakeGoal(proteinIntakeGoal);
        setUpdateExerciseGoal(exerciseGoal);
        setUpdateKegelsGoal(kegelsGoal);
        setUpdateGarlandPoseGoal(garlandPoseGoal);
        onClose();
    };

    const handleUpdateGoals = () => {
        setIsLoading(true);

        const updatedGoals = {
            waterIntakeGoal: updateWaterIntakeGoal,
            proteinIntakeGoal: updateProteinIntakeGoal,
            exerciseGoal: updateExerciseGoal,
            kegelsGoal: updateKegelsGoal,
            garlandPoseGoal: updateGarlandPoseGoal
        };

        const previousGoals = {
            waterIntakeGoal: waterIntakeGoal,
            proteinIntakeGoal: proteinIntakeGoal,
            exerciseGoal: exerciseGoal,
            kegelsGoal: kegelsGoal,
            garlandPoseGoal: garlandPoseGoal
        };

        if (JSON.stringify(updatedGoals) !== JSON.stringify(previousGoals)) {
            const updateGoalsInput = {
                id: user.goals.id,
                waterIntakeGoal: updateWaterIntakeGoal,
                proteinIntakeGoal: updateProteinIntakeGoal,
                exerciseGoal: updateExerciseGoal,
                kegelsGoal: updateKegelsGoal,
                garlandPoseGoal: updateGarlandPoseGoal
            };

            updateGoals.mutate(updateGoalsInput, {
                onError: (err: any) => {
                    setError(err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                    triggerSnackBar(true, err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                },
                onSuccess: async () => {
                    triggerSnackBar(false, 'Goal update successful!');
                    user.setGoals(updateGoalsInput);
                    onClose();
                },
                onSettled: () => {
                    setIsLoading(false);
                }
            });
        } else {
            setError('Please update the goal before submitting.');
            triggerSnackBar(true, 'Please update the goal before submitting.');
            setIsLoading(false);
        };
    };

    const renderCurrentInputType = () => {
        switch (goal) {
            case "waterIntakeGoal":
                return (
                    <>
                        <UserGoal border={"18px solid #1ca3ec"} borderRadius={"50%"}>
                            <LocalDrinkIcon fontSize="large" style={{ color: "#1ca3ec" }}/>
                            <Typography variant="body1"><strong>Water</strong></Typography>
                        </UserGoal>
                        <Box width={125}>
                            <TextField
                                id="water-intake-goal-update-input"
                                type="number"
                                value={updateWaterIntakeGoal}
                                onChange={(e) => setUpdateWaterIntakeGoal(parseInt(`${e.currentTarget.value}`))}
                                InputProps={{ inputProps: { min: 1 }, endAdornment: <InputAdornment position="end">oz</InputAdornment> }}
                                size='small'
                                disabled={isLoading}
                            />
                        </Box>
                    </>
                );
            case "proteinIntakeGoal":
                return (
                    <>
                        <UserGoal border={"18px solid #FF6961"} borderRadius={"50%"} className={"userGoal"}>
                            <RestaurantIcon fontSize="large" color="disabled" />
                            <Typography variant="body1"><strong>Protein</strong></Typography>
                        </UserGoal>
                        <Box width={125}>
                            <TextField
                                id="protein-intake-goal-update-input"
                                type="number"
                                value={updateProteinIntakeGoal}
                                onChange={(e) => setUpdateProteinIntakeGoal(parseInt(`${e.currentTarget.value}`))}
                                InputProps={{ inputProps: { min: 1 }, endAdornment: <InputAdornment position="end">g</InputAdornment> }}
                                size='small'
                                disabled={isLoading}
                            />
                        </Box>
                    </>
                );
            case "exerciseGoal":
                return (
                    <>
                        <UserGoal border={"18px solid #7FFFD4"} borderRadius={"50%"} className={"userGoal"}>
                            <FitnessCenterIcon fontSize="large" style={{ color: "#7FFFD4" }} />
                            <Typography variant="body1"><strong>Exercise</strong></Typography>
                        </UserGoal>
                        <Box width={125}>
                            <TextField
                                id="exercise-goal-update-input"
                                type="number"
                                value={updateExerciseGoal}
                                onChange={(e) => setUpdateExerciseGoal(parseInt(`${e.currentTarget.value}`))}
                                InputProps={{ inputProps: { min: 1 }, endAdornment: <InputAdornment position="end">min</InputAdornment> }}
                                size='small'
                                disabled={isLoading}
                            />
                        </Box>
                    </>
                );
            case "kegelsGoal":
                return (
                    <>
                        <UserGoal border={"18px solid #C27BA0"} borderRadius={"50%"} className={"userGoal"}>
                            <SelfImprovementIcon fontSize="large" />
                            <Typography variant="body1"><strong>Kegels</strong></Typography>
                        </UserGoal>
                        <Box width={125}>
                            <TextField
                                id="kegels-goal-update-input"
                                type="number"
                                value={updateKegelsGoal}
                                onChange={(e) => setUpdateKegelsGoal(parseInt(`${e.currentTarget.value}`))}
                                InputProps={{ inputProps: { min: 1 }, endAdornment: <InputAdornment position="end">reps</InputAdornment> }}
                                size='small'
                                disabled={isLoading}
                            />
                        </Box>
                    </>
                );
            case "garlandPoseGoal":
                return (
                    <>
                        <UserGoal border={"18px solid #9966CC"} borderRadius={"50%"} className={"userGoal"}>
                            <SelfImprovementIcon fontSize="large" />
                            <Typography variant="body1"><strong>Garland Pose</strong></Typography>
                        </UserGoal>
                        <Box width={125}>
                            <TextField
                                id="garlandPose-goal-update-input"
                                type="number"
                                value={updateGarlandPoseGoal}
                                onChange={(e) => setUpdateGarlandPoseGoal(parseInt(`${e.currentTarget.value}`))}
                                InputProps={{ inputProps: { min: 1 }, endAdornment: <InputAdornment position="end">min</InputAdornment> }}
                                size='small'
                                disabled={isLoading}
                            />
                        </Box>
                    </>
                );
            default:
                return (<Typography variant="body1">An error occurred, please try again!</Typography>)
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            aria-labelledby={'Update User Goals Modal'}
            aria-describedby={'Update User Goals Modal'}
            className="update-user-goals-modal"
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
                    <Typography variant="h4" mb={3}>Update User Goal</Typography>
                    {renderCurrentInputType()}
                    <Box display="flex" justifyContent={"center"} mt={3}>
                        <LoadingButton
                            onClick={() => handleUpdateGoals()} 
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
    );
};

export default UpdateUserGoalModal;