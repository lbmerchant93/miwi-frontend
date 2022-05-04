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
import { getAuth, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

import './DashboardProfilePage.css';

interface DashboardProfilePageProps {
    user: User;
    triggerSnackBar: (err: boolean, message: string) => void;
}

const DashboardProfilePage: React.FC<DashboardProfilePageProps> = (props) => {
    const { user, triggerSnackBar } = props;
    const auth = getAuth();
    const [date, setDate] = useState<string | null>(user.expectedDueDate);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDeletingAccount, setIsDeletingAccount] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const updateUser = useUpdateUser();
    const deleteUserAccount = useDeleteUser();

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

    const onDelete = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        if (auth.currentUser?.email) {
           try {
                const credential = EmailAuthProvider.credential(
                    auth.currentUser.email, 
                    password
                )

                const result = await reauthenticateWithCredential(
                    auth.currentUser,
                    credential
                )

                await deleteUser(result.user)
                
                deleteUserAccount.mutate(user.id, {
                    onError: (err: any) => {
                        triggerSnackBar(true, err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.');
                        setIsLoading(false)
                    },
                })
            } catch (err: any) {
                triggerSnackBar(true, err.message || 'Something went wrong, please try again or contact us for help.');
                setIsLoading(false)
            } 
        } else {
            triggerSnackBar(true, 'Something went wrong, please try again or contact us for help.');
            setIsLoading(false)
        }
        
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
                {(!isEditing && !isDeletingAccount) && 
                    (<>
                        <Box className="profile-info-container">
                            <Typography variant="h6">Expected due date:</Typography>
                            <Typography variant="h6" ml={3}>
                                {user.expectedDueDate ? 
                                    <b>moment(user.expectedDueDate).format("MMMM Do YYYY")</b> 
                                    : 
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
                                }
                            </Typography>
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
                                    onClick={() => setIsDeletingAccount(true)}
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
                {isDeletingAccount && 
                    <Box className="profile-delete-account-confirmation">
                        <Typography variant="h4" color="warning.main">Warning!</Typography>
                        <Typography variant="h6">Are you sure you want to delete your account? This action is irreversible. If so, please enter your password below and select Delete Account.</Typography>
                        <form className="profile-delete-form" onSubmit={onDelete}>
                            <Box className="profile-delete-form-input">
                                <TextField 
                                    label="Password" 
                                    id="Password" 
                                    variant="outlined" 
                                    type="password" 
                                    value={password} 
                                    error={!!error}
                                    helperText={error}
                                    onChange={(e) => setPassword(e.currentTarget.value)} 
                                    fullWidth={true}
                                />
                            </Box>
                            <Box className="warning-action-container">
                                {!isLoading && <Box className="warning-action-button">
                                    <LoadingButton
                                        loading={isLoading}
                                        onClick={() => setIsDeletingAccount(false)} 
                                        variant="contained" 
                                        color="inherit"
                                    >
                                            No, Go back
                                    </LoadingButton>  
                                </Box>}
                                <Box className="warning-action-button">
                                    <LoadingButton 
                                        loading={isLoading}
                                        type="submit" 
                                        variant="contained" 
                                        color="warning"
                                    >
                                            Delete Account
                                    </LoadingButton> 
                                </Box>
                            </Box>
                        </form>
                    </Box>
                }
            </Box>
        </>
    )
}

export default DashboardProfilePage