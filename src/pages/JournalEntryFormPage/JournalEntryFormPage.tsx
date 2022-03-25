import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../shared/auth-context';
import { SnackBar, SnackBarDetails } from '../../components/SnackBar/SnackBar';
import { Alert } from '@mui/material';
import JournalEntryForm from './JournalEntryForm/JournalEntryForm';
import UpdateJournalEntryForm from './UpdateJournalEntryForm/UpdateJournalEntryForm';

import './JournalEntryFormPage.css';

const JournalEntryFormPage: React.FC = () => {
    const user = useContext(AuthContext);
    const { entryId } = useParams();
    const [error, setError] = useState<boolean>(false);
    const [snackBarDetails, setSnackBarDetails] = useState<SnackBarDetails>({} as SnackBarDetails);

    const dismissSnackBar = () => {
        setSnackBarDetails({ ...snackBarDetails, show: false });
    };

    const handleSubmitResults = (results: string) => {
        results === "success" ? setError(false) : setError(true)
        setSnackBarDetails({ error, show: true, message: `Journal entry ${entryId ? 'updated' : 'created'}!` })
    }

    return (
        <>
            <SnackBar open={snackBarDetails.show} onClose={dismissSnackBar}>
                <Alert onClose={dismissSnackBar} severity={snackBarDetails.error ? "error" : "success"} variant="filled">
                    {snackBarDetails.message}
                </Alert>
            </SnackBar>
            {(!entryId && user.id) && <JournalEntryForm handleSubmitResults={handleSubmitResults} userId={user.id}/>}
            {(entryId && user.id) && <UpdateJournalEntryForm handleSubmitResults={handleSubmitResults} entryId={entryId} userId={user.id}/>}
        </>
    )
}

export default JournalEntryFormPage;