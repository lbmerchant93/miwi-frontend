import styled from 'styled-components/macro';
import Box from '@mui/material/Box';

export const ProfilePageContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const UserInfoContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

export const UserGoalsContainer = styled(Box)`
    display: flex;
    flex-direction: column;
`;

export const UserGoalSection = styled(Box)`
    height: 200px;
    width: 200px; 
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const DeleteAccountContainer = styled(Box)`
    align-self: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: min(80ch, 100%);
`;