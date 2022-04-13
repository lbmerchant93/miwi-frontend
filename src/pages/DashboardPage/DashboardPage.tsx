import { useContext, useState } from 'react';
import { AuthContext } from '../../shared/auth-context';
import MessagePage from '../../components/MessagePage/MessagePage';
// import JournalEntryCard from '../../components/JournalEntryCard/JournalEntryCard';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import { PossibleRoutes } from '../../utils/constants';
import { useJournalEntries } from '../../api/journalEntries/journalEntries';
import { SnackBar, SnackBarDetails } from '../../components/SnackBar/SnackBar';
import { Alert } from '@mui/material';
import UserAside from "../../features/UserAside/UserAside";
import DashboardHomePage from './DashboardHomePage/DashboardHomePage';
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
    const { data, isFetching } = useJournalEntries(user.id);
    const [snackBarDetails, setSnackBarDetails] = useState<SnackBarDetails>({} as SnackBarDetails);

    const triggerDeleteSnackBar = (deleteResults: boolean) => {
        setSnackBarDetails({ 
            error: deleteResults, 
            show: true, 
            message: deleteResults ? 'Journal entry deletion successful!' : 'Something went wrong, please try again or contact us for help.'
        })
    }

    const dismissSnackBar = () => {
        setSnackBarDetails({ ...snackBarDetails, show: false });
    };

    if (isFetching) {
        return (
            <p>Fetching data...</p>
        )
    }

    return user.isLoggedIn ? (
        <>
            <SnackBar open={snackBarDetails.show} onClose={dismissSnackBar}>
                <Alert onClose={dismissSnackBar} severity={snackBarDetails.error ? "success" : "error"} variant="filled">
                    {snackBarDetails.message}
                </Alert>
            </SnackBar>
            <UserAside />
            <Box>
                <DashboardPanel />
                {data.length && <DashboardHomePage data={data} triggerDeleteSnackBar={triggerDeleteSnackBar} /> }
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