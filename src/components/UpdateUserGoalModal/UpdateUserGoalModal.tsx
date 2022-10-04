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

    const [isLoading, setIsLoading] = useState(false);
    const [waterIntakeGoal, setWaterIntakeGoal] = useState<number>(20);
    const [proteinIntakeGoal, setProteinIntakeGoal] = useState<number>(20);
    const [exerciseGoal, setExerciseGoal] = useState<number>(20);
    const [kegelsGoal, setKegelsGoal] = useState<number>(20);
    const [garlandPoseGoal, setGarlandPoseGoal] = useState<number>(20);
    const [error, setError] = useState<string>('');
    const updateGoals = useUpdateGoals();

    const handleUpdateGoals = () => {
        setIsLoading(true);

        const updatedGoals = {
            waterIntakeGoal,
            proteinIntakeGoal,
            exerciseGoal,
            kegelsGoal,
            garlandPoseGoal
        };

        const previousGoals = {
            waterIntakeGoal: user.goals.waterIntakeGoal,
            proteinIntakeGoal: user.goals.proteinIntakeGoal,
            exerciseGoal: user.goals.exerciseGoal,
            kegelsGoal: user.goals.kegelsGoal,
            garlandPoseGoal: user.goals.garlandPoseGoal
        };

        if (JSON.stringify(updatedGoals) !== JSON.stringify(previousGoals)) {
            const updateGoalsInput = {
                id: user.goals.id,
                waterIntakeGoal,
                proteinIntakeGoal,
                exerciseGoal,
                kegelsGoal,
                garlandPoseGoal
            };

            updateGoals.mutate(updateGoalsInput, {
                onError: (err: any) => {
                    setError(err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                    triggerSnackBar(true, err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                },
                onSuccess: async () => {
                    triggerSnackBar(false, 'Goal update successful!')
                    user.setGoals(updateGoalsInput)
                },
                onSettled: () => {
                    setIsLoading(false)
                }
            });
        } else {
            setError('Please update the goal before submitting.')
            triggerSnackBar(true, 'Please update the goal before submitting.')
            setIsLoading(false)
        };
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby={'Update User Goals Modal'}
            aria-describedby={'Update User Goals Modal'}
            className="update-user-goals-modal"
        >
            <Box bgcolor="white" width={450} height={450} position={"relative"} p={3} left={"50%"} top={"50%"} style={{ transform: 'translate(-50%, -50%)' }}>
                <Box position={"absolute"} left={"92%"} top={"1%"}>
                    <IconButton onClick={onClose} edge="start" color="inherit" aria-label="exit">
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