import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import './GuestLoginButton.css';

interface GuestLoginButtonsProps {
    loginAsGuest: () => Promise<void>;
    isLoading: boolean;
}

const GuestLoginButton: React.FC<GuestLoginButtonsProps> = (props) => {
    const { loginAsGuest, isLoading } = props;
    
    return (
        <Box className="guest-login-button-wrapper" ml={"10px"}>
            <LoadingButton variant="outlined" onClick={() => loginAsGuest()} color="inherit" className="guest-login-button" loading={isLoading}>
                <Box className="guest-login-text-wrapper" display="flex" alignItems="center" height={"30px"} ml={"5px"}>
                    <Typography variant="body1">Sign in as guest</Typography>
                </Box>
            </LoadingButton>
        </Box>
    )
};

export default GuestLoginButton;