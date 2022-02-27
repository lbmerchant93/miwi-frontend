import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import './LoginModal.css';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

const LoginModal: React.FC<LoginModalProps> = (props) => {
    const { isOpen, onClose } = props;

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="login-modal"
        >
            <Box className="login-modal-container">
                <Typography variant="h6" component="h2">
                    Text in a modal
                </Typography>
            </Box>
        </Modal>
    )
};

export default LoginModal;