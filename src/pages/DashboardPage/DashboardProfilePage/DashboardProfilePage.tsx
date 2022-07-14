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
import { 
    getAuth, 
    deleteUser, 
    EmailAuthProvider, 
    reauthenticateWithCredential, 
    reauthenticateWithPopup, 
    GoogleAuthProvider
} from "firebase/auth";
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import { useUpdateGoals } from '../../../api/goals/goal';
import { Goals } from '../../../shared/auth-context';

import './DashboardProfilePage.css';

const DashboardProfilePageSkeleton = () => {
    return (
        <Box className="profile-container">
            <Skeleton variant="circular" width={200} height={200} />
            <Box width={'100%'}>
                <Typography variant="h4" mb={1}><Skeleton /></Typography>
                <Typography variant="h6" mt={1} mb={1}><Skeleton /></Typography>
                <Typography variant="h6" mt={1} mb={1}><Skeleton /></Typography>
                <Typography variant="h6" mt={1} mb={1}><Skeleton /></Typography>
            </Box>
        </Box>
    )
}
interface DashboardProfilePageProps {
    user: User;
    triggerSnackBar: (err: boolean, message: string) => void;
    isFetching: boolean;
}

const DashboardProfilePage: React.FC<DashboardProfilePageProps> = (props) => {
    const { user, triggerSnackBar, isFetching } = props;
    const auth = getAuth();
    const [date, setDate] = useState<string | null>(user.expectedDueDate);
    const [displayName, setDisplayName] = useState<string | null>(user.displayName);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDeletingAccount, setIsDeletingAccount] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const updateUser = useUpdateUser();
    const deleteUserAccount = useDeleteUser();
    const provider = auth.currentUser?.providerData[0].providerId;
    const [goals, setGoals] = useState<[Goals]>(user.goals)
    const updateGoals = useUpdateGoals();

    const handleUpdateSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)

        const updatedProfile = {
            displayName: displayName,
            expectedDueDate: date
        }

        const previousProfile = {
            displayName: user.displayName,
            expectedDueDate: user.expectedDueDate
        }

        if (JSON.stringify(updatedProfile) !== JSON.stringify(previousProfile) && date !== null) {
            const updateUserInput = {
                id: user.id,
                displayName: displayName,
                expectedDueDate: date
            }
            updateUser.mutate(updateUserInput, {
                onError: (err: any) => {
                    setError(err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                    triggerSnackBar(true, err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                },
                onSuccess: async () => {
                    triggerSnackBar(false, 'Profile update successful!');
                    user.setDisplayName(displayName)
                    user.setExpectedDueDate(date)
                    setIsEditing(false)
                },
                onSettled: () => {
                    setIsLoading(false)
                }
            })
        } else {
            setError('Please update the profile before clicking submit.')
            triggerSnackBar(true, 'Please update the profile before clicking submit.')
            setIsLoading(false)
        }
    }

    const onDeleteWithEmailAndPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        if (auth.currentUser?.email) {
            try {
                deleteUserAccount.mutate(user.id, {
                    onError: (err: any) => {
                        triggerSnackBar(true, err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.');
                        setIsLoading(false)
                    },
                })

                const credential = EmailAuthProvider.credential(
                    auth.currentUser.email, 
                    password
                )

                const result = await reauthenticateWithCredential(
                    auth.currentUser,
                    credential
                )

                await deleteUser(result.user)
                
            } catch (err: any) {
                triggerSnackBar(true, err.message || 'Something went wrong, please try again or contact us for help.');
                setIsLoading(false)
            } 
        } else {
            triggerSnackBar(true, 'Something went wrong, please try again or contact us for help.');
            setIsLoading(false)
        }
    }

    const onDeleteWithGoogle = async () => {
        setIsLoading(true)
        if (auth.currentUser) {
            try {
                const provider = new GoogleAuthProvider();
                const result = await reauthenticateWithPopup(auth.currentUser, provider);

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

    const onDeleteGuestProfile = () => {
        triggerSnackBar(true, 'You can not delete the guest account!');
    }

    useEffect(() => {
        if (user.expectedDueDate) {
            setDate(user.expectedDueDate)
        } else {
            setDate(null)
        }

        if (user.goals.length) {
            setGoals(user.goals)
        } else {
            setGoals([{
                waterIntakeGoal: null,
                proteinIntakeGoal: null,
                exerciseGoal: null,
                kegelsGoal: null,
                garlandPoseGoal: null
            }])
        }
    }, [user])

    if (isFetching) {
        return <DashboardProfilePageSkeleton />
    }

    return (
        <>
            <Box className="profile-container">
                {(!isEditing && !isDeletingAccount) && 
                    (<>
                        <Avatar
                            src={user.photoURL ?? undefined}
                            alt="User Photo"
                            style={{ fontSize: '100px', height: 200, width: 200 }}>
                            {user.displayName?.toUpperCase()[0]}
                        </Avatar>
                        <Typography variant="h4" id="display-name">{user.displayName}</Typography>
                        <Box className="profile-info-container">
                            <Typography variant="h6">Expected due date:</Typography>
                            <Typography variant="h6" ml={3}>
                                {user.expectedDueDate ? 
                                    <b>{moment(user.expectedDueDate).format("MMMM Do YYYY")}</b> 
                                    : 
                                    <Box className="profile-edit-button">
                                        <Button 
                                            variant="contained" 
                                            onClick={() => setIsEditing(true)}
                                            startIcon={<EditIcon />}
                                            color="inherit"
                                            size="small"
                                        >
                                            Add
                                        </Button>
                                    </Box>
                                }
                            </Typography>
                        </Box>
                        <Box className="profile-info-container">
                            <Typography variant="h6">Water intake goal:</Typography>
                            <Typography variant="h6" ml={3}>
                                {goals[0].waterIntakeGoal ? goals[0].waterIntakeGoal : 0}oz
                            </Typography>
                        </Box>
                        <Box className="profile-info-container">
                            <Typography variant="h6">Protein intake goal:</Typography>
                            <Typography variant="h6" ml={3}>
                                {goals[0].proteinIntakeGoal ? goals[0].proteinIntakeGoal : 0}g
                            </Typography>
                        </Box>
                        <Box className="profile-info-container">
                            <Typography variant="h6">Exercise goal:</Typography>
                            <Typography variant="h6" ml={3}>
                                {goals[0].exerciseGoal ? goals[0].exerciseGoal : 0}min
                            </Typography>
                        </Box>
                        <Box className="profile-info-container">
                            <Typography variant="h6">Kegels goal:</Typography>
                            <Typography variant="h6" ml={3}>
                                {goals[0].kegelsGoal ? goals[0].kegelsGoal : 0}
                            </Typography>
                        </Box>
                        <Box className="profile-info-container">
                            <Typography variant="h6">Garland pose goal:</Typography>
                            <Typography variant="h6" ml={3}>
                                {goals[0].garlandPoseGoal ? goals[0].garlandPoseGoal : 0}min
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
                                    onClick={user.email === 'guest@guest.com' ? () => onDeleteGuestProfile() : () => setIsDeletingAccount(true)}
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
                            <FormLabel id="displayName-input-label">Display name: </FormLabel>
                            <TextField
                                id="displayName-input"
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.currentTarget.value)}
                                size='small'
                                disabled={isLoading}
                            />
                            <FormLabel id="date-input-label">Expected due date: </FormLabel>
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <DatePicker
                                    value={date}
                                    onChange={(newDate) => setDate(moment(newDate).startOf('day').toISOString(true))}
                                    renderInput={(params) => <TextField required size='small' sx={{width: "200px"}} {...params} />}
                                    disabled={isLoading}
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
                        {(provider === "password") && <>
                            <Typography variant="h6">Are you sure you want to delete your account? If so, please enter your password below and select Delete Account. This action is irreversible.</Typography>
                            <form className="profile-delete-form" onSubmit={onDeleteWithEmailAndPassword}>
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
                        </>}
                        {(provider === "google.com") && <>
                            <Typography variant="h6">Are you sure you want to delete your account? If so, select Delete Account and authenticate this action using your google account. This action is irreversible.</Typography>
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
                                        onClick={onDeleteWithGoogle}
                                        variant="contained" 
                                        color="warning"
                                    >
                                            Delete Account
                                    </LoadingButton> 
                                </Box>
                            </Box>
                        </>}
                    </Box>
                }
            </Box>
        </>
    )
}

export default DashboardProfilePage