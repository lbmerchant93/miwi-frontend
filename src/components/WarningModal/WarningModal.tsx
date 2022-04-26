import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LoadingButton from '@mui/lab/LoadingButton';

import './WarningModal.css';

interface WarningModalProps {
    isOpen: boolean;
    onClose: () => void;
    modalTitle: string;
    modalDescription: string;
    modalMessage: string;
    onDeleteClick: () => void;
    isLoading: boolean;
};

const WarningModal: React.FC<WarningModalProps> = (props) => {
    const { 
        isOpen, 
        onClose, 
        modalTitle, 
        modalDescription, 
        modalMessage, 
        onDeleteClick,
        isLoading 
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
                    {!isLoading && <Box className="warning-action-button">
                       <LoadingButton
                            loading={isLoading}
                            onClick={onClose} 
                            variant="contained" 
                            color="inherit"
                        >
                                No, Go back
                        </LoadingButton>  
                    </Box>}
                    <Box className="warning-action-button">
                       <LoadingButton 
                            loading={isLoading}
                            onClick={onDeleteClick} 
                            variant="contained" 
                            color="warning"
                        >
                                Yes, I'm sure
                        </LoadingButton> 
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default WarningModal;