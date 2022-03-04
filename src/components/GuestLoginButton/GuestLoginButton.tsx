import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './GuestLoginButton.css';

interface GuestLoginButtonsProps {
    loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
}

const GuestLoginButton: React.FC<GuestLoginButtonsProps> = (props) => {
    const { loginWithEmailAndPassword } = props;
    
    return (
        <Box className="guest-login-button-wrapper">
            <Button variant="outlined" onClick={() => loginWithEmailAndPassword('guest@guest.com', 'guestguest')} color="inherit" className="guest-login-button">
                <Box className="guest-login-text-wrapper">
                    <Typography variant="body1">Sign in as guest</Typography>
                </Box>
            </Button>
        </Box>
    )
};

export default GuestLoginButton;