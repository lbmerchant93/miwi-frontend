import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import ProviderLoginButton from '../../../components/ProviderLoginButton/ProviderLoginButton';
import GuestLoginButton from '../../../components/GuestLoginButton/GuestLoginButton';
import { Auth, signInWithEmailAndPassword } from 'firebase/auth';
import { SnackBar, SnackBarDetails } from '../../../components/SnackBar/SnackBar';

import './LoginForm.css';
import { Alert } from '@mui/material';

interface LoginFormProps {
    auth: Auth;
    onRegisterClick: () => void;
};

const LoginForm: React.FC<LoginFormProps> = (props) => {
    const { auth, onRegisterClick } = props;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [snackBarDetails, setSnackBarDetails] = useState<SnackBarDetails>({} as SnackBarDetails);

    const loginWithEmailAndPassword = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error: any) {
            setSnackBarDetails({error: true, show: true, message: `Sign in error: ${error.message}`});
        }
    };

    const dismissSnackBar = () => {
        setSnackBarDetails({ ...snackBarDetails, show: false });
    };

    return (
        <>
            <SnackBar open={snackBarDetails.show} onClose={dismissSnackBar}>
                <Alert onClose={dismissSnackBar} severity="error" variant="filled">
                    {snackBarDetails.message}
                </Alert>
            </SnackBar>
            <Box className="login-form-options">
                <Box>
                    <form className="login-form">
                        <Box className="login-form-input">
                            <TextField 
                                label="Email" 
                                id="Email" 
                                variant="outlined" 
                                value={email} 
                                onChange={(e) => setEmail(e.currentTarget.value)} 
                                fullWidth={true}
                            />
                        </Box>
                        <Box className="login-form-input">
                            <TextField 
                                label="Password" 
                                id="Password" 
                                variant="outlined" 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.currentTarget.value)} 
                                fullWidth={true}
                            />
                        </Box>
                        <Box>
                            <Button variant="outlined" color="inherit" onClick={() => loginWithEmailAndPassword(email, password)}>Submit</Button>  
                        </Box>
                    </form>
                    <Typography variant="caption">
                        Need an account? <Link component="button" variant="caption" color="#0000EE" onClick={onRegisterClick}>Register</Link>
                    </Typography>
                </Box>
                <Divider orientation="vertical" />
                <Box className="login-form-buttons">
                    <ProviderLoginButton auth={auth} />
                    <Typography variant="caption" my={3}>
                        OR
                    </Typography>
                    <GuestLoginButton loginWithEmailAndPassword={loginWithEmailAndPassword}/>
                </Box>
            </Box>
        </>
    )
}

export default LoginForm;