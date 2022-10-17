import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import Button from '@mui/material/Button';
import { 
    ProfilePageContainer, 
    UserInfoContainer,
    UserInfo,
    UserGoalsContainer, 
    UserGoalSection,
    UserGoal, 
    DeleteAccountContainer
} from './ProfilePage.styled';

const ProfilePageSkeleton = () => {
    return (
        <ProfilePageContainer mt={2} mx={3}>
                <UserInfoContainer mx={4}>
                    <Skeleton variant="circular"  height={200} width={200} />
                    <Box mx={4} my={4} border={"1px solid gray"}></Box>
                    <UserInfo px={2} width={"60%"}>
                        <Typography variant="h5"><Skeleton /></Typography>
                        <Typography variant="h5"><Skeleton /></Typography>
                        <Typography variant="h5"><Skeleton /></Typography>
                    </UserInfo>
                </UserInfoContainer>
                <Box mx={4} my={2} border={"1px solid gray"}></Box>
                <UserGoalsContainer my={3}>
                    <Box display="flex" flexDirection="row" justifyContent="space-around" my={3}>
                        <UserGoalSection>
                            <UserGoal border={"18px solid #1ca3ec"} borderRadius={"50%"} className={"userGoal"}>
                                <LocalDrinkIcon fontSize="large" style={{ color: "#1ca3ec" }}/>
                                <Typography variant="body1"><Skeleton width={100}/></Typography>
                                <Typography variant="body1"><Skeleton width={50}/></Typography>
                            </UserGoal>
                        </UserGoalSection>
                        <UserGoalSection>
                            <UserGoal border={"18px solid #FF6961"} borderRadius={"50%"} className={"userGoal"}>
                                <RestaurantIcon fontSize="large" color="disabled" />
                                <Typography variant="body1"><Skeleton width={100}/></Typography>
                                <Typography variant="body1"><Skeleton width={50}/></Typography>
                            </UserGoal>
                        </UserGoalSection>
                        <UserGoalSection>
                            <UserGoal border={"18px solid #7FFFD4"} borderRadius={"50%"} className={"userGoal"}>
                                <FitnessCenterIcon fontSize="large" style={{ color: "#7FFFD4" }} />
                                <Typography variant="body1"><Skeleton width={100}/></Typography>
                                <Typography variant="body1"><Skeleton width={50}/></Typography>
                            </UserGoal>
                        </UserGoalSection>
                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent="space-evenly" my={3}>
                        <UserGoalSection>
                            <UserGoal border={"18px solid #C27BA0"} borderRadius={"50%"} className={"userGoal"}>
                                <SelfImprovementIcon fontSize="large" />
                                <Typography variant="body1"><Skeleton width={100}/></Typography>
                                <Typography variant="body1"><Skeleton width={50}/></Typography>
                            </UserGoal>
                        </UserGoalSection>
                        <UserGoalSection>
                            <UserGoal border={"18px solid #9966CC"} borderRadius={"50%"} className={"userGoal"}>
                                <SelfImprovementIcon fontSize="large" />
                                <Typography variant="body1"><Skeleton width={100}/></Typography>
                                <Typography variant="body1"><Skeleton width={50}/></Typography>
                            </UserGoal>
                        </UserGoalSection>
                    </Box>
                </UserGoalsContainer>
                <Box mx={4} my={2} border={"1px solid gray"}></Box>
                <DeleteAccountContainer my={4}>
                    <Typography variant="h5">No longer want to use MiWi? Click the button below and follow the instructions to delete your account.</Typography>
                    <Box mt={3}>
                        <Button variant="contained" color="warning" disabled>Delete Account</Button> 
                    </Box>
                </DeleteAccountContainer>
            </ProfilePageContainer>
    );
};

export default ProfilePageSkeleton;