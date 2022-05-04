import React, { useState, useEffect, FormEvent } from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { User } from '../../../shared/auth-context';
import LoadingButton from '@mui/lab/LoadingButton';
import { useUpdateUser, useDeleteUser } from '../../../api/users/user';
import DeleteIcon from '@mui/icons-material/Delete';
import FormLabel from '@mui/material/FormLabel';
import WarningModal from '../../../components/WarningModal/WarningModal';
import { getAuth, deleteUser } from "firebase/auth";

import './DashboardProfilePage.css';

interface DashboardProfilePageProps {
    user: User;
    triggerSnackBar: (err: boolean, message: string) => void;
}

const DashboardProfilePage: React.FC<DashboardProfilePageProps> = (props) => {
    const { user, triggerSnackBar } = props;
    const [date, setDate] = useState<string | null>(user.expectedDueDate);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const updateUser = useUpdateUser();
    const deleteUser = useDeleteUser();

    const handleUpdateSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)

        if (JSON.stringify(user.expectedDueDate) !== JSON.stringify(date)) {
            const updateUserInput = {
                id: user.id,
                expectedDueDate: date
            }
            updateUser.mutate(updateUserInput, {
                onError: (err: any) => {
                    triggerSnackBar(true, err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                },
                onSuccess: async () => {
                    triggerSnackBar(false, 'Profile update successful!');
                    await user.setExpectedDueDate(date)
                    setIsEditing(false)
                },
                onSettled: () => {
                    setIsLoading(false)
                }
            })
        } else {
            triggerSnackBar(true, 'Please update the profile before clicking submit.')
            setIsLoading(false)
        }
    }

    const onDeleteClick = () => {
        setIsLoading(true)
        // deleteJournalEntry.mutate(entry.id, {
        //     onError: (err: any) => {
        //       triggerSnackBar(true, err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.');
        //       setIsLoading(false)
        //       setIsWarningModalOpen(true)
        //     },
        //     onSuccess: () => {
        //       triggerSnackBar(false, 'Account deletion successful!');
        //       setIsLoading(false)
        //       setIsWarningModalOpen(false)
        //     }
        //   });
    }

    useEffect(() => {
        if (user.expectedDueDate) {
            setDate(user.expectedDueDate)
        } else {
            setDate(null)
        }
    }, [user])

    return (
        <>
            <Box className="profile-container">
                {!isEditing && 
                    (<>
                        <Box className="profile-info-container">
                            <Typography variant="h6">Expected due date:</Typography>
                            <Typography variant="h6" ml={3}><b>{user.expectedDueDate ? moment(user.expectedDueDate).format("MMMM Do YYYY") : " "}</b></Typography>
                        </Box>
                        <Box className="profile-edit-button-container">
                            <Typography variant="h6">Edit your account:</Typography>
                            <Box className="profile-edit-button">
                                <Button 
                                    variant="contained" 
                                    onClick={() => setIsEditing(true)}
                                    startIcon={<EditIcon />}
                                    color="inherit"
                                    size="small"
                                >
                                    Edit
                                </Button>
                            </Box>
                        </Box>
                        <Box className="profile-delete-button-container">
                            <Typography variant="h6">Delete your account:</Typography>
                            <Box className="profile-delete-button">
                                <Button 
                                    variant="contained" 
                                    onClick={() => setIsWarningModalOpen(true)}
                                    startIcon={<DeleteIcon />}
                                    color="warning"
                                    size="small"
                                >
                                    Delete Account
                                </Button>
                            </Box>
                        </Box>
                    </>)
                }
                {isEditing && 
                    (<Box className="profile-edit-container">
                        <Typography variant='h5' className="page-title" mb={1}>
                            Edit Profile
                        </Typography>
                        <Typography variant="body1" my={1}>
                            Fill out the form below and select submit to update your profile.
                        </Typography>
                        <form className="form" onSubmit={handleUpdateSubmit}>
                        <FormLabel id="date-input-label">Expected due date: </FormLabel>
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <DatePicker
                                    value={date}
                                    onChange={(newDate) => setDate(moment(newDate).startOf('day').toISOString(true))}
                                    renderInput={(params) => <TextField required size='small' sx={{width: "200px"}} {...params} />}
                                />
                            </LocalizationProvider>
                            <Box className="profile-edit-action-container">
                                {!isLoading && 
                                    <Box className="profile-edit-action-button">
                                        <Button 
                                            variant="contained" 
                                            onClick={() => setIsEditing(false)}
                                            startIcon={<CancelIcon />}
                                            color="inherit"
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                }
                                <Box className="profile-edit-action-button">
                                    <LoadingButton 
                                        type="submit"
                                        variant="contained" 
                                        color="success"
                                        loading={isLoading}
                                    >
                                        Submit
                                    </LoadingButton>
                                </Box>
                            </Box>
                        </form>
                    </Box>)
                }
            </Box>
            <WarningModal 
                isOpen={isWarningModalOpen} 
                onClose={() => setIsWarningModalOpen(false)} 
                modalTitle="Delete user account modal" 
                modalDescription="Confirm user account delete or go back to the dashboard."
                modalMessage="Are you sure you want to delete your account? This action is irreversible."
                onDeleteClick={onDeleteClick}
                isLoading={isLoading}
            />
        </>
    )
}

export default DashboardProfilePage