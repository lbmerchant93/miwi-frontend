import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import './GuestLoginButton.css';

interface GuestLoginButtonsProps {
    loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
    isLoading: boolean;
}

const GuestLoginButton: React.FC<GuestLoginButtonsProps> = (props) => {
    const { loginWithEmailAndPassword, isLoading } = props;
    
    return (
        <Box className="guest-login-button-wrapper">
            <LoadingButton variant="outlined" onClick={() => loginWithEmailAndPassword('guest@guest.com', 'guestviewer')} color="inherit" className="guest-login-button" loading={isLoading}>
                <Box className="guest-login-text-wrapper">
                    <Typography variant="body1">Sign in as guest</Typography>
                </Box>
            </LoadingButton>
        </Box>
    )
};

export default GuestLoginButton;