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
import './LoginForm.css';

interface LoginFormProps {
    auth: Auth;
    onRegisterClick: () => void;
};

const LoginForm: React.FC<LoginFormProps> = (props) => {
    const { auth, onRegisterClick } = props;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const loginWithEmailAndPassword = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error: any) {
            setError(error.message)
        }
    };

    return (
        <>
            <Box className="login-form-options">
                <Box>
                    <form className="login-form">
                        <Box className="login-form-input">
                            <TextField 
                                label="Email" 
                                id="Email" 
                                variant="outlined" 
                                value={email} 
                                error={!!error}
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
                                error={!!error}
                                helperText={error}
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