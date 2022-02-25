import React, { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import { PossibleRoutes } from '../utils/constants';
import { Link } from 'react-router-dom';
import './MessagePage.css';

interface MessagePageProps {
    title?: ReactNode;
    subtitle?: ReactNode;
  }

const MessagePage: React.FC<MessagePageProps> = (props) => {
    const { title, subtitle} = props;

    return (
        <main className="message-page">
            <Typography variant="h4" >{title}</Typography>
            <Typography variant="subtitle1" >{subtitle}</Typography>
            <Typography>Go back to <Link to={`${PossibleRoutes.ROOT}`}>Home Screen</Link></Typography>
        </main>
    )
}

export default MessagePage