import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';

interface UpdateEntryModalProps {
    isOpen: boolean;
    onClose: () => void;
    modalTitle: string;
    modalDescription: string;
    modalMessage: string;
    inputType: string;
    section?: string;
};

const UpdateEntryModal: React.FC<UpdateEntryModalProps> = (props) => {
    const { 
        isOpen, 
        onClose, 
        modalTitle, 
        modalDescription, 
        modalMessage, 
        inputType,
        section
    } = props;

    const [isLoading, setIsLoading] = useState(false);

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby={`${modalTitle}`}
            aria-describedby={`${modalDescription}`}
            className="update-entry-modal"
        >
            <Box bgcolor="white" width={450} height={450} position="relative" p={3} display="flex" flexDirection="column" textAlign={"center"}>
                <Box position={"absolute"} left={"92%"} top={"1%"}>
                    <IconButton onClick={onClose} edge="start" color="inherit" aria-label="exit">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant="h4">Update Journal Entry</Typography>
                <Box display="flex" justifyContent={"center"}>
                    <LoadingButton
                        onClick={() => console.log("update")} 
                        variant='contained' 
                        color='success'
                        loading={isLoading}
                    >
                            Update
                    </LoadingButton>
                </Box>
            </Box>
        </Modal>
    )
};

export default UpdateEntryModal;