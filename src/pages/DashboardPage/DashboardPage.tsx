import { useContext, useState } from 'react';
import { AuthContext } from '../../shared/auth-context';
import MessagePage from '../../components/MessagePage/MessagePage';
import Box from '@mui/material/Box';
import { useJournalEntries } from '../../api/journalEntries/journalEntries';
import { SnackBar, SnackBarDetails } from '../../components/SnackBar/SnackBar';
import { Alert } from '@mui/material';
import UserAside from "../../features/UserAside/UserAside";
import DashboardPanel from '../../features/DashboardPanel/DashboardPanel';

import './DashboardPage.css';

export interface JournalEntry {
    id: number;
    authorId: string;
    date: string;
    waterIntake: number;
    proteinIntake: number;
    exercise: number;
    kegels: number;
    garlandPose: number;
    prenatalVitamins: boolean;
    probiotics: boolean;
}

const DashboardPage = () => {
    const user = useContext(AuthContext);
    const { data, isFetching, refetch } = useJournalEntries(user.id);
    const [snackBarDetails, setSnackBarDetails] = useState<SnackBarDetails>({} as SnackBarDetails);

    const triggerSnackBar = (err: boolean, message: string) => {
        setSnackBarDetails({ 
            error: err, 
            show: true, 
            message: message
        })
    }

    const dismissSnackBar = () => {
        setSnackBarDetails({ ...snackBarDetails, show: false });
    };

    return user.isLoggedIn ? (
        <>
            <SnackBar open={snackBarDetails.show} onClose={dismissSnackBar}>
                <Alert onClose={dismissSnackBar} severity={snackBarDetails.error ? "error" : "success"} variant="filled">
                    {snackBarDetails.message}
                </Alert>
            </SnackBar>
            <UserAside />
            <Box className='dashboard'>
                <DashboardPanel data={data} triggerSnackBar={triggerSnackBar} refetch={refetch} isFetching={isFetching}/>
            </Box>
        </>
    ) : (
        <MessagePage 
            title="Uh oh, looks like you're not logged in."
            subtitle="You must be logged-in to view this page."
        />
    )
}

export default DashboardPage;