import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { User } from '../../shared/auth-context';
import LoginForm from './LoginForm/LoginForm';
import CreateAccountForm from './CreateAccountForm/CreateAccountForm';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import './LoginModal.css';

enum FormState {
    Login = 'Login',
    Creation = 'Creation',
}

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
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
    const { isOpen, onClose, user } = props;
    const [formState, setFormState] = useState<FormState>(FormState.Login);

    useEffect(() => {
        if (isOpen) {
            setFormState(FormState.Login);
        }
        if (user.isLoggedIn) {
            onClose()
        }
    }, [user, onClose, isOpen])

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
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
                        user={user} 
                        onClose={onClose} 
                        onRegisterClick={() => setFormState(FormState.Creation)} 
                    />
                )}
                {formState === FormState.Creation && (
                    <CreateAccountForm 
                        user={user} 
                        goBack={() => setFormState(FormState.Login)}
                    />
                )}
            </Box>
        </Modal>
    )
};

export default LoginModal;