import React, { useContext, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { AuthContext } from '../../shared/auth-context';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MessagePage from '../../components/MessagePage/MessagePage';
import moment from 'moment';
import Button from '@mui/material/Button';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import { SnackBar, SnackBarDetails } from '../../components/SnackBar/SnackBar';
import { Alert } from '@mui/material';
import DeleteAccountModal from '../../components/DeleteAccountModal/DeleteAccountModal';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import UpdateUserGoalModal from '../../components/UpdateUserGoalModal/UpdateUserGoalModal';
import { 
    ProfilePageContainer, 
    UserInfoContainer,
    UserInfo,
    UserGoalsContainer, 
    UserGoalSection,
    UserGoal, 
    DeleteAccountContainer,
    EditButtonContainer
} from './ProfilePage.styled';

const ProfilePage = () => {
    // const { user } = useParams();
    const user = useContext(AuthContext);
    const [snackBarDetails, setSnackBarDetails] = useState<SnackBarDetails>({} as SnackBarDetails);
    const [isDeletingAccount, setIsDeletingAccount] = useState<boolean>(false);
    const [isUpdatingGoal, setIsUpdatingGoal] = useState<boolean>(false);
    const [goalEditing, setGoalEditing] = useState<string>("");

    const triggerSnackBar = (err: boolean, message: string) => {
        setSnackBarDetails({ 
            error: err, 
            show: true, 
            message: message
        })
    };

    const dismissSnackBar = () => {
        setSnackBarDetails({ ...snackBarDetails, show: false });
    };

    const onDeleteGuestProfile = () => {
        triggerSnackBar(true, 'You can not delete the guest account!');
    };

    const editGoal = (goal: string) => {
        setGoalEditing(goal);
        setIsUpdatingGoal(true);
    };

    const closeUpdateUserGoalModal = () => {
        setIsUpdatingGoal(false);
        setGoalEditing("");
    };

    if (!user.isLoggedIn) {
        return (
            <MessagePage 
                title="Uh oh, looks like you're not logged in."
                subtitle="You must be logged-in to view this page."
            />
        );
    };
    
    return user.isLoadingUser ? (
        <Box>
            ProfilePage loading user
        </Box>
    ) : (
        <>
            <SnackBar open={snackBarDetails.show} onClose={dismissSnackBar}>
                <Alert onClose={dismissSnackBar} severity={snackBarDetails.error ? "error" : "success"} variant="filled">
                    {snackBarDetails.message}
                </Alert>
            </SnackBar>
            <ProfilePageContainer mt={2} mx={3}>
                <UserInfoContainer mx={4}>
                    <Avatar
                        src={undefined}
                        alt="User Photo"
                        style={{ fontSize: '100px', height: 200, width: 200 }}>
                        {user.displayName?.toUpperCase()[0]}
                    </Avatar>
                    <Box mx={4} my={4} border={"1px solid gray"}></Box>
                    <EditButtonContainer className="editButton">
                        <IconButton color="inherit">
                            <EditIcon />
                        </IconButton>
                    </EditButtonContainer>
                    <UserInfo px={2} className={"userInfo"}>
                        <Typography variant="h5"><strong>{user.displayName}</strong></Typography>
                        <Typography variant="h5">Expected Due Date: {moment(user.expectedDueDate).format("MMMM Do YYYY")}</Typography>
                        <Typography variant="h5">Denver, CO</Typography>
                    </UserInfo>
                </UserInfoContainer>
                <Box mx={4} my={2} border={"1px solid gray"}></Box>
                <UserGoalsContainer my={3}>
                    <Box display="flex" flexDirection="row" justifyContent="space-around" my={3}>
                        <UserGoalSection onClick={() => editGoal("waterIntakeGoal")}>
                            <EditButtonContainer className="editButton">
                                <IconButton color="inherit">
                                    <EditIcon />
                                </IconButton>
                            </EditButtonContainer>
                            <UserGoal border={"18px solid #1ca3ec"} borderRadius={"50%"} className={"userGoal"}>
                                <LocalDrinkIcon fontSize="large" style={{ color: "#1ca3ec" }}/>
                                <Typography variant="body1"><strong>Water</strong></Typography>
                                <Typography variant="body1"><strong>{user.goals.waterIntakeGoal} oz</strong></Typography>
                            </UserGoal>
                        </UserGoalSection>
                        <UserGoalSection onClick={() => editGoal("proteinIntakeGoal")}>
                            <EditButtonContainer className="editButton">
                                <IconButton color="inherit">
                                    <EditIcon />
                                </IconButton>
                            </EditButtonContainer>
                            <UserGoal border={"18px solid #FF6961"} borderRadius={"50%"} className={"userGoal"}>
                                <RestaurantIcon fontSize="large" color="disabled" />
                                <Typography variant="body1"><strong>Protein</strong></Typography>
                                <Typography variant="body1"><strong>{user.goals.proteinIntakeGoal} g</strong></Typography>
                            </UserGoal>
                        </UserGoalSection>
                        <UserGoalSection onClick={() => editGoal("exerciseGoal")}>
                            <EditButtonContainer className="editButton">
                                <IconButton color="inherit">
                                    <EditIcon />
                                </IconButton>
                            </EditButtonContainer>
                            <UserGoal border={"18px solid #7FFFD4"} borderRadius={"50%"} className={"userGoal"}>
                                <FitnessCenterIcon fontSize="large" style={{ color: "#7FFFD4" }} />
                                <Typography variant="body1"><strong>Exercise</strong></Typography>
                                <Typography variant="body1"><strong>{user.goals.exerciseGoal} min</strong></Typography>
                            </UserGoal>
                        </UserGoalSection>
                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent="space-evenly" my={3}>
                        <UserGoalSection onClick={() => editGoal("kegelsGoal")}>
                            <EditButtonContainer className="editButton">
                                <IconButton color="inherit">
                                    <EditIcon />
                                </IconButton>
                            </EditButtonContainer>
                            <UserGoal border={"18px solid #C27BA0"} borderRadius={"50%"} className={"userGoal"}>
                                <SelfImprovementIcon fontSize="large" />
                                <Typography variant="body1"><strong>Kegels</strong></Typography>
                                <Typography variant="body1"><strong>{user.goals.kegelsGoal}</strong></Typography>
                            </UserGoal>
                        </UserGoalSection>
                        <UserGoalSection onClick={() => editGoal("garlandPoseGoal")}>
                            <EditButtonContainer className="editButton">
                                <IconButton color="inherit">
                                    <EditIcon />
                                </IconButton>
                            </EditButtonContainer>
                            <UserGoal border={"18px solid #9966CC"} borderRadius={"50%"} className={"userGoal"}>
                                <SelfImprovementIcon fontSize="large" />
                                <Typography variant="body1"><strong>Garland Pose</strong></Typography>
                                <Typography variant="body1"><strong>{user.goals.garlandPoseGoal} min</strong></Typography>
                            </UserGoal>
                        </UserGoalSection>
                    </Box>
                </UserGoalsContainer>
                <Box mx={4} my={2} border={"1px solid gray"}></Box>
                <DeleteAccountContainer my={4}>
                    <Typography variant="h5">No longer want to use MiWi? Click the button below and follow the instructions to delete your account.</Typography>
                    <Box mt={3} onClick={user.email === 'guest@guest.com' ? () => onDeleteGuestProfile() : () => setIsDeletingAccount(true)}>
                        <Button variant="contained" color="warning">Delete Account</Button>  
                    </Box>
                </DeleteAccountContainer>
            </ProfilePageContainer>
            <DeleteAccountModal 
                isOpen={isDeletingAccount} 
                onClose={() => setIsDeletingAccount(false)} 
                triggerSnackBar={triggerSnackBar}
                user={user}
            />
            <UpdateUserGoalModal
                isOpen={isUpdatingGoal}
                onClose={() => closeUpdateUserGoalModal()}
                triggerSnackBar={triggerSnackBar}
                user={user}
                goal={goalEditing}
            />
        </>
        
    );
}

export default ProfilePage