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
import { useUpdateUser } from '../../../api/users/user';

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
    const updateUser = useUpdateUser();

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

    useEffect(() => {
        if (user.expectedDueDate) {
            setDate(user.expectedDueDate)
        } else {
            setDate(null)
        }
    }, [user])

    return (
        <Box className="profile-container">
            <Typography variant="h6">Expected due date:</Typography>
            {!isEditing && 
                (<>
                    <Typography variant="h6"><b>{moment(user.expectedDueDate).format("MMMM Do YYYY")}</b></Typography>
                    <Box className="profile-edit-button-container">
                        <Box className="profile-edit-button">
                            <Button 
                                variant="contained" 
                                onClick={() => setIsEditing(true)}
                                startIcon={<EditIcon />}
                                color="inherit"
                            >
                                Edit
                            </Button>
                        </Box>
                    </Box>
                </>)
            }
            {isEditing && 
                (<Box className="profile-edit-container">
                    <form onSubmit={handleUpdateSubmit}>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DatePicker
                                value={date}
                                onChange={(newDate) => setDate(moment(newDate).startOf('day').toISOString(true))}
                                renderInput={(params) => <TextField required size='small' sx={{width: "200px"}} {...params} />}
                            />
                        </LocalizationProvider>
                        <Box className="profile-edit-button-container">
                            {!isLoading && 
                                <Box className="profile-edit-button">
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
                            <Box className="profile-edit-button">
                                <LoadingButton 
                                    type="submit"
                                    variant="contained" 
                                    color="success"
                                    loading={isLoading}
                                >
                                    Submit Changes
                                </LoadingButton>
                            </Box>
                        </Box>
                    </form>
                </Box>)
            }
        </Box>
    )
}

export default DashboardProfilePage