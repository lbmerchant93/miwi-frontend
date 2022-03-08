import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import './WarningModal.css';

interface WarningModalProps {
    isOpen: boolean;
    onClose: () => void;
    modalTitle: string;
    modalDescription: string;
    modalMessage: string;
    verifiedAction: () => void;
};

const WarningModal: React.FC<WarningModalProps> = (props) => {
    const { isOpen, onClose, modalTitle, modalDescription, modalMessage, verifiedAction } = props;

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby={`${modalTitle}`}
            aria-describedby={`${modalDescription}`}
            className="login-modal"
        >
            <Box>
                <Typography variant="h5">{modalTitle}</Typography>
                <Typography variant="body1">{modalMessage}</Typography>
                <Button onClick={verifiedAction}>Yes I'm sure</Button>
                <Button onClick={onClose}>No go back</Button>
            </Box>
        </Modal>
    );
};

export default WarningModal;