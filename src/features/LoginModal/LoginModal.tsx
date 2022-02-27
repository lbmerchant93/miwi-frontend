import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import ProviderLoginButton from '../../components/ProviderLoginButton/ProviderLoginButton';
import { User } from '../../shared/auth-context';
import Button from '@mui/material/Button';

import './LoginModal.css';
interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
  }

const LoginModal: React.FC<LoginModalProps> = (props) => {
    const { isOpen, onClose, user } = props;
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
        console.log(email, "email", password, "password")
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="login-modal"
        >
            <Box className="login-modal-container">
                <Box className="login-modal-title">
                    <Typography variant="h5">
                        Please log in to access your dashboard!
                    </Typography>
                    <Typography variant="body1">
                        Enter your email/password or you can log in through Google to access your dashboard.
                    </Typography>
                </Box>
                <Box className="login-modal-options">
                    <form className="login-modal-form">
                        <Box className="login-modal-form-input">
                            <TextField label="Email" id="Email" variant="outlined" value={email} onChange={handleChange} fullWidth={true}/>
                        </Box>
                        <Box className="login-modal-form-input">
                            <TextField label="Password" id="Password" variant="outlined" type="password" value={password} onChange={handleChange} fullWidth={true}/>
                        </Box>
                        <Box>
                            <Button variant="outlined" color="inherit" onClick={signIn}>Submit</Button>  
                        </Box>
                    </form>
                    <Divider orientation="vertical" />
                    <ProviderLoginButton user={user} onClose={onClose}/>
                </Box>
            </Box>
        </Modal>
    )
};

export default LoginModal;