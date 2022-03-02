import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import ProviderLoginButton from '../../../components/ProviderLoginButton/ProviderLoginButton';
import GuestLoginButton from '../../../components/GuestLoginButton/GuestLoginButton';
import { User } from '../../../shared/auth-context';

import './LoginForm.css';

interface LoginFormProps {
    user: User;
    onRegisterClick: () => void;
};

const LoginForm: React.FC<LoginFormProps> = (props) => {
    const { user,  onRegisterClick } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.id === "Email") {
            setEmail(e.currentTarget.value)
        } else if (e.currentTarget.id === "Password") {
            setPassword(e.currentTarget.value)
        }
    };

    const signIn = () => {
        user.loginWithEmail(email, password)
    }

    return (
        <Box className="login-form-options">
            <Box>
                <form className="login-form">
                    <Box className="login-form-input">
                        <TextField label="Email" id="Email" variant="outlined" value={email} onChange={handleChange} fullWidth={true}/>
                    </Box>
                    <Box className="login-form-input">
                        <TextField label="Password" id="Password" variant="outlined" type="password" value={password} onChange={handleChange} fullWidth={true}/>
                    </Box>
                    <Box>
                        <Button variant="outlined" color="inherit" onClick={signIn}>Submit</Button>  
                    </Box>
                </form>
                <Typography variant="caption">
                    Need an account? <Link component="button" variant="caption" color="#0000EE" onClick={onRegisterClick}>Register</Link>
                </Typography>
            </Box>
            <Divider orientation="vertical" />
            <Box className="login-form-buttons">
                <ProviderLoginButton user={user} />
                <Typography variant="caption" my={3}>
                    OR
                </Typography>
                <GuestLoginButton user={user}/>
            </Box>
        </Box>
    )
}

export default LoginForm;