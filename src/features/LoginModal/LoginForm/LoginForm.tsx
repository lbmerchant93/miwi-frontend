import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import ProviderLoginButton from '../../../components/ProviderLoginButton/ProviderLoginButton';
import GuestLoginButton from '../../../components/GuestLoginButton/GuestLoginButton';
import { Auth, signInWithEmailAndPassword } from 'firebase/auth';
import { useLoginUser } from '../../../api/users/user';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import FormLabel from '@mui/material/FormLabel';
import './LoginForm.css';

interface LoginFormProps {
    auth: Auth;
    onRegisterClick: () => void;
    onClose: () => void;
};

const LoginForm: React.FC<LoginFormProps> = (props) => {
    const { auth, onRegisterClick, onClose } = props;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const loginUser = useLoginUser();
    const navigate = useNavigate();

    const loginWithEmailAndPassword = async (email: string, password: string) => {
        setIsLoading(true)
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            loginUser.mutate({ id: user.user.uid, email: user.user.email, displayName: user.user.displayName }, {
                onError: (err: any) => {
                    setIsLoading(false)
                    console.log(err)
                },
                onSuccess: () => {
                    onClose()
                    navigate('/dashboard/home')
                }
            })
        } catch (err: any) {
            setIsLoading(false)
            console.log(err.message)
        }
    };

    return (
        <>
            <Box className="login-form-options">
                <Box>
                    <form className="login-form">
                        <FormLabel component="legend">Login Form</FormLabel>
                        <Box className="login-form-input" mt={1}>
                            <TextField 
                                label="Email" 
                                id="Email" 
                                variant="outlined" 
                                value={email} 
                                error={!!error}
                                onChange={(e) => setEmail(e.currentTarget.value)} 
                                fullWidth={true}
                                disabled={isLoading}
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
                                disabled={isLoading}
                            />
                        </Box>
                        <Box>
                            <LoadingButton variant="outlined" color="inherit" onClick={() => loginWithEmailAndPassword(email, password)} loading={isLoading}>Submit</LoadingButton>  
                        </Box>
                    </form>
                    <Typography variant="caption">
                        Need an account? <Link component="button" variant="caption" color="#0000EE" onClick={onRegisterClick}>Register</Link>
                    </Typography>
                </Box>
                <Divider orientation="vertical" />
                <Box className="login-form-buttons">
                    <ProviderLoginButton auth={auth} onClose={onClose} message={"Sign in with Google"} isLoading={isLoading}/>
                    <Typography variant="caption" my={3}>
                        OR
                    </Typography>
                    <GuestLoginButton loginWithEmailAndPassword={loginWithEmailAndPassword} isLoading={isLoading}/>
                </Box>
            </Box>
        </>
    )
}

export default LoginForm;