import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { User } from '../../shared/auth-context';
import { useUpdateUser } from '../../api/users/user';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface UpdateUserInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
    triggerSnackBar: (err: boolean, message: string) => void;
}

const UpdateUserInfoModal: React.FC<UpdateUserInfoModalProps> = (props) => {
    const { 
        isOpen,
        onClose,
        user,
        triggerSnackBar
    } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [updateDisplayName, setUpdateDisplayName] = useState<string | null | undefined>(user.displayName);
    const [updateExpectedDueDate, setUpdateExpectedDueDate] = useState<string | null>(user.expectedDueDate);
    const [error, setError] = useState<string>('');
    const updateUser = useUpdateUser();

    const closeModal = () => {
        onClose();
    };

    const handleUpdateUserInfo = () => {
        setIsLoading(true);

        const updatedProfile = {
            displayName: updateDisplayName,
            expectedDueDate: updateExpectedDueDate
        };

        const previousProfile = {
            displayName: user.displayName,
            expectedDueDate: user.expectedDueDate
        };

        if (JSON.stringify(updatedProfile) !== JSON.stringify(previousProfile) && updateExpectedDueDate !== null) {
            const updateUserInput = {
                id: user.id,
                displayName: updateDisplayName,
                expectedDueDate: updateExpectedDueDate
            };
            updateUser.mutate(updateUserInput, {
                onError: (err: any) => {
                    setError(err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                    console.log(error)
                    triggerSnackBar(true, err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                },
                onSuccess: async () => {
                    triggerSnackBar(false, 'Profile update successful!');
                    user.setDisplayName(updateDisplayName);
                    user.setExpectedDueDate(updateExpectedDueDate);
                    onClose();
                },
                onSettled: () => {
                    setIsLoading(false);
                }
            });
        } else {
            setError('Please update the info before submitting.');
            triggerSnackBar(true, 'Please update the info before submitting.');
            setIsLoading(false);
        };
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
                    <Box>
                        <Typography variant="h4">Update User Info</Typography>
                        <Typography variant="body1">Use the inputs below to update your information.</Typography>  
                    </Box>
                    <Box width={300}>
                        <Box mb={2} >
                           <TextField 
                                variant="outlined"
                                label="Name"
                                value={updateDisplayName}
                                onChange={(e) => setUpdateDisplayName(e.target.value)}
                                fullWidth={true}
                            /> 
                        </Box>
                        
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Expected Due Date"
                                value={dayjs(updateExpectedDueDate)}
                                onChange={(newDate: string | number | dayjs.Dayjs | Date | null | undefined) => setUpdateExpectedDueDate(dayjs(newDate).startOf('day').toISOString())}
                                disabled={isLoading}
                            />
                        </LocalizationProvider>
                    </Box>
                    
                    <Box display="flex" justifyContent={"center"} mt={3}>
                        <LoadingButton
                            onClick={() => handleUpdateUserInfo()} 
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

export default UpdateUserInfoModal;