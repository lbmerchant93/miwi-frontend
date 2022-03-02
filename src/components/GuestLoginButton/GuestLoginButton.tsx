import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { User } from '../../shared/auth-context';
import './GuestLoginButton.css';

interface GuestLoginButtonsProps {
    user: User;
}

const GuestLoginButton: React.FC<GuestLoginButtonsProps> = (props) => {
    const { user } = props;
    
    return (
        <Box className="guest-login-button">
            <Button variant="outlined" onClick={() => user.loginWithEmail('test@test.com', 'testing')} color="inherit" >
                <Box className="guest-login-text-wrapper">
                    <Typography variant="body1">Sign in as guest</Typography>
                </Box>
            </Button>
        </Box>
    )
};

export default GuestLoginButton;