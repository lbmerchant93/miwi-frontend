import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import ProviderLoginButton from '../../../components/ProviderLoginButton/ProviderLoginButton';
import GuestLoginButton from '../../../components/GuestLoginButton/GuestLoginButton';
import { Auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useLoginUser } from '../../../api/users/user';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import FormLabel from '@mui/material/FormLabel';
import { User } from '../../../shared/auth-context';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    FormLogin,
    LoginFormButtonContainer,
    LoginFormOptions
} from './LoginForm.styled';

interface LoginFormProps {
    auth: Auth;
    onRegisterClick: () => void;
    onClose: () => void;
    user: User;
};

const LoginForm: React.FC<LoginFormProps> = (props) => {
    const { auth, onRegisterClick, onClose, user } = props;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const loginUser = useLoginUser();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:610px)');

    const loginWithEmailAndPassword = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            const userLogin = await signInWithEmailAndPassword(auth, email, password)
            loginUser.mutate({ id: userLogin.user.uid, email: userLogin.user.email, displayName: userLogin.user.displayName }, {
                onError: (err: any) => {
                    setError(err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                    setIsLoading(false)
                    console.log(err)
                },
                onSuccess: (data) => {
                    user.setUserId(userLogin.user.uid)
                    user.setGoals(data.goals)
                    setIsLoading(false)
                    onClose()
                    navigate(`/home/${userLogin.user.email?.split('@')[0]}`)
                }
            })
        } catch (err: any) {
            setError(err.message)
            setIsLoading(false)
            console.log(err.message)
        }
    };

    const loginAsGuest = async () => {
        setIsLoading(true)
        try {
            const userLogin = await signInWithEmailAndPassword(auth, "guestviewer@guest.com", "guestviewer")
            loginUser.mutate({ id: userLogin.user.uid, email: userLogin.user.email, displayName: userLogin.user.displayName }, {
                onError: (err: any) => {
                    setError(err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                    setIsLoading(false)
                    console.log(err)
                },
                onSuccess: (data) => {
                    user.setUserId(userLogin.user.uid)
                    user.setGoals(data.goals)
                    setIsLoading(false)
                    onClose()
                    navigate(`/home/${userLogin.user.email?.split('@')[0]}`)
                }
            })
        } catch (err: any) {
            setError(err.message)
            setIsLoading(false)
            console.log(err.message)
        }
    };

    const loginWithGoogle = async () => {
        setIsLoading(true)
        try {
            const userLogin = await signInWithPopup(auth, new GoogleAuthProvider());
            loginUser.mutate({ id: userLogin.user.uid, email: userLogin.user.email, displayName: userLogin.user.displayName }, {
                onError: (err: any) => {
                    setError(err.response.errors[0].message || 'Something went wrong, please try again or contact us for help.')
                    setIsLoading(false)
                    console.log(err)
                },
                onSuccess: (data) => {
                    user.setUserId(userLogin.user.uid)
                    user.setGoals(data.goals)
                    user.setIsLoadingUser(false)
                    setIsLoading(false)
                    onClose()
                    navigate(`/home/${userLogin.user.email?.split('@')[0]}`)
                }
            })
        } catch (err: any) {
            setIsLoading(false)
            setError(err.message);
            console.log('error signing in', err.message);
        }
    };

    return (
        <LoginFormOptions className="login-form-options" flexDirection={isMobile ? "column" : "row"}>
            <Box className="login-form-container" display="flex" flexDirection="column" alignItems="center" mb={isMobile ? 2 : 0}>
                <FormLogin className="login-form" onSubmit={loginWithEmailAndPassword}>
                    <FormLabel component="legend">Login Form</FormLabel>
                    <Box className="login-form-input" mt={1} mb={"10px"}>
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
                    <Box className="login-form-input" mb={"10px"}>
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
                    <Box className="login-form-button">
                        <LoadingButton type="submit" variant="outlined" color="inherit" loading={isLoading}>Submit</LoadingButton>  
                    </Box>
                </FormLogin>
                <Typography variant="caption">
                    Need an account? <Link component="button" variant="caption" color="#0000EE" onClick={onRegisterClick}>Register</Link>
                </Typography>
            </Box>
            <Divider orientation={isMobile ? "horizontal" : "vertical"} />
            <LoginFormButtonContainer className="login-form-buttons" mt={isMobile ? 2 : 0}>
                <ProviderLoginButton 
                    message={"Sign in with Google"} 
                    isLoading={isLoading}
                    loginWithGoogle={loginWithGoogle}
                />
                <Typography variant="caption" my={3}>
                    OR
                </Typography>
                <GuestLoginButton 
                    loginAsGuest={loginAsGuest}
                    isLoading={isLoading}
                />
            </LoginFormButtonContainer>
        </LoginFormOptions>
    )
}

export default LoginForm;