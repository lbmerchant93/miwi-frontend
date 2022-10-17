import React, { useState } from 'react';
import { SnackBar, SnackBarDetails } from '../../components/SnackBar/SnackBar';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';

const ShareLink = () => {
    const [snackBarDetails, setSnackBarDetails] = useState<SnackBarDetails>({
        error: false,
        show: false,
        message: 'Link copied to clipboard!'
    });

    const shareLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setSnackBarDetails({ ...snackBarDetails, show: true });
      };

    const dismissSnackBar = () => {
        setSnackBarDetails({ ...snackBarDetails, show: false });
    };

    return (
        <>
            <Button color="primary" onClick={shareLink} size="small">
                Share
            </Button>
            <SnackBar open={snackBarDetails.show} onClose={dismissSnackBar}>
                <Alert onClose={dismissSnackBar} severity={snackBarDetails.error ? "error" : "success"} variant="filled">
                    {snackBarDetails.message}
                </Alert>
            </SnackBar>
        </>
    );
};

export default ShareLink;