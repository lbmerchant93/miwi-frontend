import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GoogleIcon from '../../shared/Google.icon';
import { Auth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useLoginUser } from '../../api/users/user';
import { useNavigate } from 'react-router-dom';
import './ProviderLoginButton.css'

interface ProviderLoginButtonsProps {
    auth: Auth;
}

const ProviderLoginButton: React.FC<ProviderLoginButtonsProps> = (props) => {
    const { auth } = props;
    const [error, setError] = useState<string>('');
    const loginUser = useLoginUser();
    const navigate = useNavigate();

    const loginWithGoogle = async () => {
        try {
            const user = await signInWithPopup(auth, new GoogleAuthProvider());
            loginUser.mutate({ id: user.user.uid, email: user.user.email, displayName: user.user.displayName }, {
                onError: (err: any) => {
                    console.log(err)
                },
                onSuccess: () => {
                    navigate('/dashboard/home')
                }
            })

        } catch (err: any) {
            setError(err.message);
            console.log('error signing in', err.message);
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