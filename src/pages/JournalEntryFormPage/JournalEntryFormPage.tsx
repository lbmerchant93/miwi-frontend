import React, { useState, FormEvent, useContext } from 'react';
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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(moment(date).toISOString())
        setSnackBarDetails({ error, show: true, message: `Journal entry ${entryId ? 'updated' : 'created'}!` })
        // When connected to the backend, can use try catch and if its successful then navigate the user to their dashboard
        // console.log(waterIntake)
        // console.log(proteinIntake)
        // console.log(exercise)
        // console.log(kegels)
        // console.log(garlandPose)
        // console.log(prenatalVitamins)
        // console.log(probiotics)
    }

    return (
        <>
            <SnackBar open={snackBarDetails.show} onClose={dismissSnackBar}>
                <Alert onClose={dismissSnackBar} severity={snackBarDetails.error ? "error" : "success"} variant="filled">
                    {snackBarDetails.message}
                </Alert>
            </SnackBar>
            {!entryId && <JournalEntryForm handleSubmit={handleSubmit} />}
            {(entryId && user.id) && <UpdateJournalEntryForm handleSubmit={handleSubmit} entryId={entryId} userId={user.id}/>}
        </>
    )
}

export default JournalEntryFormPage;