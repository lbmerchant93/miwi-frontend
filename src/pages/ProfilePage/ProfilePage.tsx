import React, { useContext } from 'react';
// import { useParams } from 'react-router-dom';
import { AuthContext } from '../../shared/auth-context';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MessagePage from '../../components/MessagePage/MessagePage';
import moment from 'moment';
import { ProfilePageContainer, UserInfoContainer, UserGoalsContainer } from './ProfilePage.styled';

const ProfilePage = () => {
    // const { user } = useParams();
    const user = useContext(AuthContext);

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
        <ProfilePageContainer mt={2} mx={3}>
            <UserInfoContainer mx={4}>
                <Avatar
                    src={user.photoURL ?? undefined}
                    alt="User Photo"
                    style={{ fontSize: '100px', height: 200, width: 200 }}>
                    {user.displayName?.toUpperCase()[0]}
                </Avatar>
                <Box mx={4} my={4} border={"1px solid gray"}></Box>
                <Box display="flex" flexDirection="column" justifyContent="center" px={2}>
                    <Typography variant="h5"><strong>{user.displayName}</strong></Typography>
                    <Typography variant="h5">Expected Due Date: {moment(user.expectedDueDate).format("MMMM Do YYYY")}</Typography>
                    <Typography variant="h5">Denver, CO</Typography>
                </Box>
            </UserInfoContainer>
            <Box mx={4} my={2} border={"1px solid gray"}></Box>
            <UserGoalsContainer mt={3}>
                <Box display="flex" flexDirection="row" justifyContent="space-around" my={3}>
                    <Box height={200} width={200} border={"18px solid #1ca3ec"} borderRadius={"50%"}></Box>
                    <Box height={200} width={200} border={"18px solid #FF6961"} borderRadius={"50%"}></Box>
                    <Box height={200} width={200} border={"18px solid #7FFFD4"} borderRadius={"50%"}></Box>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="space-evenly" my={3}>
                    <Box height={200} width={200} border={"18px solid #C27BA0"} borderRadius={"50%"}></Box>
                    <Box height={200} width={200} border={"18px solid #9966CC"} borderRadius={"50%"}></Box>
                </Box>
            </UserGoalsContainer>
        </ProfilePageContainer>
    );
}

export default ProfilePage