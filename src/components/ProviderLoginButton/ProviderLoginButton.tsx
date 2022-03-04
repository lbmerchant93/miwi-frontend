import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GoogleIcon from '../../shared/Google.icon';
import { Auth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './ProviderLoginButton.css'

interface ProviderLoginButtonsProps {
    auth: Auth;
}

const ProviderLoginButton: React.FC<ProviderLoginButtonsProps> = (props) => {
    const { auth } = props;
    const [error, setError] = useState<string>('');

    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider())
        } catch (error: any) {
            setError(error.message);
            console.log('error signing in', error.message);
        }
    };
    
    return (
        <Box className="provider-login-button">
            <Button variant="outlined" onClick={() => loginWithGoogle()} color="inherit" >
                <GoogleIcon />
                <Box className="provider-login-text-wrapper">
                    <Typography variant="body1">Sign in with Google</Typography>
                </Box>
            </Button>
        </Box>
    )
}

export default ProviderLoginButton;