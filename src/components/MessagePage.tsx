import React from 'react';
import Typography from '@mui/material/Typography';
import { PossibleRoutes } from '../utils/constants';
import { Link } from 'react-router-dom';
import './MessagePage.css';

const MessagePage = () => {

    return (
        <main className="message-page">
            <Typography variant="h4" >Uh oh, looks like you're not logged in.</Typography>
            <Typography variant="subtitle1" >You must be logged-in to view this page.</Typography>
            <Typography>Go back to <Link to={`${PossibleRoutes.ROOT}`}>Home Screen</Link></Typography>
        </main>
    )
}

export default MessagePage