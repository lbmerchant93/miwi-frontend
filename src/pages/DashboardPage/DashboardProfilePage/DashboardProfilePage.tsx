import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { User } from '../../../shared/auth-context';
import LoadingButton from '@mui/lab/LoadingButton';

import './DashboardProfilePage.css';

interface DashboardProfilePageProps {
    user: User;
}

const DashboardProfilePage: React.FC<DashboardProfilePageProps> = (props) => {
    const { user } = props;
    const [date, setDate] = useState<string | null>(user.expectedDueDate);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (user.expectedDueDate) {
            setDate(user.expectedDueDate)
        } else {
            setDate(null)
        }
    }, [user])

    return (
        <Box className="profile-container">
            <Typography variant="h5">Expected due date:</Typography>
            {!isEditing && <Typography variant="h5"><b>{moment(user.expectedDueDate).format("MMMM Do YYYY")}</b></Typography>}
            {isEditing && 
                (<Box className="profile-edit-container">
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DatePicker
                            value={date}
                            onChange={(newDate) => setDate(moment(newDate).startOf('day').toISOString(true))}
                            renderInput={(params) => <TextField required size='small' sx={{width: "200px"}} {...params} />}
                        />
                    </LocalizationProvider>
                </Box>)
            }
            <Box className="profile-edit-button-container">
                {!isLoading && 
                    <Box className="profile-edit-button">
                        <Button 
                            variant="contained" 
                            onClick={() => setIsEditing(prev => !isEditing)}
                            startIcon={isEditing ? <CancelIcon /> : <EditIcon />}
                            color="inherit"
                        >
                            {isEditing ? "Cancel" : "Edit"}
                        </Button>
                    </Box>
                }
                
                {isEditing && 
                    <Box className="profile-edit-button">
                        <LoadingButton 
                            variant="contained" 
                            onClick={() => console.log(date)}
                            color="success"
                            loading={isLoading}
                        >
                            Submit Changes
                        </LoadingButton>
                    </Box>
                }
            </Box>
            
        </Box>
        
    )
}

export default DashboardProfilePage