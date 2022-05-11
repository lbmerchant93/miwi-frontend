import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { User } from '../../shared/auth-context';
import LoginForm from './LoginForm/LoginForm';
import CreateAccountForm from './CreateAccountForm/CreateAccountForm';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Auth } from 'firebase/auth';
import './LoginModal.css';

enum FormState {
    Login = 'Login',
    Creation = 'Creation',
}

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    auth: Auth;
};

const modalState = {
    [FormState.Creation]: {
      title: 'Create an account',
      description: `Please fill out this form so we can create a dashboard for you.`,
    },
    [FormState.Login]: {
      title: 'Welcome back!',
      description: `Please log in to access your dashboard! You can log in through your Google account or enter your email/password to access your dashboard.`,
    }
  };

const LoginModal: React.FC<LoginModalProps> = (props) => {
    const { isOpen, onClose, auth } = props;
    const [formState, setFormState] = useState<FormState>(FormState.Login);

    useEffect(() => {
        if (isOpen) {
            setFormState(FormState.Login);
        }
    }, [isOpen])

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="Login Modal"
            aria-describedby="Login modal where you can log in or create an account."
            className="login-modal"
        >
            <Box className="login-modal-container">
                <Box className="login-modal-close-button" >
                    <IconButton onClick={onClose} edge="start" color="inherit" aria-label="exit">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box className="login-modal-title">
                    <Typography variant="h5">
                        {modalState[formState].title}
                    </Typography>
                    <Typography variant="body1">
                        {modalState[formState].description}
                    </Typography>
                </Box>
                {formState === FormState.Login && (
                    <LoginForm 
                        auth={auth}
                        onRegisterClick={() => setFormState(FormState.Creation)}
                        onClose={onClose}
                    />
                )}
                {formState === FormState.Creation && (
                    <CreateAccountForm 
                        auth={auth}
                        goBack={() => setFormState(FormState.Login)}
                        onClose={onClose}
                    />
                )}
            </Box>
        </Modal>
    )
};

export default LoginModal;