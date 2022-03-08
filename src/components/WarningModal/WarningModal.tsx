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
    const { 
        isOpen, 
        onClose, 
        modalTitle, 
        modalDescription, 
        modalMessage, 
        verifiedAction 
    } = props;

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby={`${modalTitle}`}
            aria-describedby={`${modalDescription}`}
            className="warning-modal"
        >
            <Box className="warning-modal-container">
                <Typography variant="h4" color="warning.main">Warning!</Typography>
                <Typography variant="h6">{modalMessage}</Typography>
                <Box className="warning-action-container">
                    <Box className="warning-action-button">
                       <Button 
                            onClick={onClose} 
                            variant="contained" 
                            color="inherit"
                        >
                                No, Go back
                        </Button>  
                    </Box>
                    <Box className="warning-action-button">
                       <Button 
                            onClick={verifiedAction} 
                            variant="contained" 
                            color="warning"
                        >
                                Yes, I'm sure
                        </Button> 
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default WarningModal;