import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoginForm from './LoginForm/LoginForm';
import CreateAccountForm from './CreateAccountForm/CreateAccountForm';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Auth } from 'firebase/auth';
import { User } from '../../shared/auth-context';
import {
    ModalLogin,
    LoginModalContainer,
    LoginModalTitle
} from './LoginModal.styled';

enum FormState {
    Login = 'Login',
    Creation = 'Creation',
}

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    auth: Auth;
    user: User;
};

const modalState = {
    [FormState.Creation]: {
      title: 'Create an account',
      description: `Please fill out this form so we can create a dashboard for you or register an account through your google account. If loading persists, please allow up to 5 minutes for the server to start.`,
    },
    [FormState.Login]: {
      title: 'Welcome back!',
      description: `Please log in to access your dashboard! You can log in through your Google account or enter your email/password to access your dashboard. If loading persists, please allow up to 5 minutes for the server to start.`,
    }
  };

const LoginModal: React.FC<LoginModalProps> = (props) => {
    const { isOpen, onClose, auth, user } = props;
    const [formState, setFormState] = useState<FormState>(FormState.Login);

    useEffect(() => {
        if (isOpen) {
            setFormState(FormState.Login);
        }
    }, [isOpen])

    return (
        <ModalLogin
            open={isOpen}
            onClose={onClose}
            aria-labelledby="Login Modal"
            aria-describedby="Login modal where you can log in or create an account."
        >
            <LoginModalContainer>
                <Box alignSelf={'flex-end'} position={"relative"} top={4} right={-17}>
                    <IconButton onClick={onClose} edge="start" color="inherit" aria-label="exit">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <LoginModalTitle>
                    <Typography variant="h5">
                        {modalState[formState].title}
                    </Typography>
                    <Typography variant="body1">
                        {modalState[formState].description}
                    </Typography>
                </LoginModalTitle>
                {formState === FormState.Login && (
                    <LoginForm 
                        auth={auth}
                        onRegisterClick={() => setFormState(FormState.Creation)}
                        onClose={onClose}
                        user={user}
                    />
                )}
                {formState === FormState.Creation && (
                    <CreateAccountForm 
                        auth={auth}
                        goBack={() => setFormState(FormState.Login)}
                        onClose={onClose}
                    />
                )}
            </LoginModalContainer>
        </ModalLogin>
    )
};

export default LoginModal;