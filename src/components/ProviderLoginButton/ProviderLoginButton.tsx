import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GoogleIcon from '../../shared/Google.icon';
import { User } from '../../shared/auth-context';
import './ProviderLoginButton.css'

interface ProviderLoginButtonsProps {
    user: User;
}

const ProviderLoginButton: React.FC<ProviderLoginButtonsProps> = (props) => {
    const { user } = props;
    
    return (
        <Box className="provider-login-button">
            <Button variant="outlined" onClick={user.loginWithGoogle} color="inherit" >
                <GoogleIcon />
                <Box className="provider-login-text-wrapper">
                    <Typography variant="body1">Sign in with Google</Typography>
                </Box>
            </Button>
        </Box>
    )
}

export default ProviderLoginButton;