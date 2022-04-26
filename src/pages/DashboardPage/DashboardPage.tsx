import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../shared/auth-context';
import MessagePage from '../../components/MessagePage/MessagePage';
import Box from '@mui/material/Box';
import { useJournalEntries, useJournalEntriesCount } from '../../api/journalEntries/journalEntries';
import { SnackBar, SnackBarDetails } from '../../components/SnackBar/SnackBar';
import { Alert } from '@mui/material';
import UserAside from "../../features/UserAside/UserAside";
import DashboardPanel from '../../features/DashboardPanel/DashboardPanel';
import moment from 'moment';
// import { useNavigate } from 'react-router-dom';

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
    // const navigate = useNavigate();
    const [skipCount, setSkipCount] = useState<number>(0);
    const [snackBarDetails, setSnackBarDetails] = useState<SnackBarDetails>({} as SnackBarDetails);
    const [sortedData, setSortedData] = useState<any>([]);
    const [entries, setEntries] = useState<any>([]);

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

    const { data: count, refetch: refetchCount } = useJournalEntriesCount(user.id);

    const { data, isFetching, refetch } = useJournalEntries(user.id, 15, skipCount, count);

    // const navigateHomeRefetch = () => {
    //     navigate('/dashboard/home')
    //     setSkipCount(0)
    // }

    useEffect(() => {
        if (data && data.length) {
            setEntries((prev: any) => [...data])
        } else {
            setEntries([])
        }
    }, [data])

    useEffect(() => {
        if (entries && entries.length) {
            const dataToSort = [...entries]
            dataToSort.sort((a: any, b: any) => {
                if (moment(a.date).isBefore(b.date)) {
                    return 1
                }
                if (moment(b.date).isBefore(a.date)) {
                    return -1
                }
                return 0 
            })
            setSortedData((prev: any) => [...dataToSort])
        } else {
            setSortedData([])
        }
    }, [entries])

    useEffect(() => {
        refetchCount()
        refetch()
    }, []) // eslint-disable-line 

    return user.isLoggedIn ? (
        <>
            <SnackBar open={snackBarDetails.show} onClose={dismissSnackBar}>
                <Alert onClose={dismissSnackBar} severity={snackBarDetails.error ? "error" : "success"} variant="filled">
                    {snackBarDetails.message}
                </Alert>
            </SnackBar>
            <UserAside />
            <Box className='dashboard'>
                <DashboardPanel 
                    data={sortedData} 
                    triggerSnackBar={triggerSnackBar} 
                    isFetching={isFetching} 
                    setEntries={setEntries}
                    count={count}
                    skipCount={skipCount}
                    setSkipCount={setSkipCount}
                    refetch={refetch}
                />
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