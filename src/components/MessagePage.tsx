import React, { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import { PossibleRoutes } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import './MessagePage.css';

interface MessagePageProps {
    title?: ReactNode;
    subtitle?: ReactNode;
  }

const MessagePage: React.FC<MessagePageProps> = (props) => {
    const { title, subtitle } = props;
    const navigate = useNavigate();

    return (
        <main className="message-page">
            <Typography variant="h4" >{title}</Typography>
            <Typography variant="subtitle1" >{subtitle}</Typography>
            <Typography>Go back to the <Link className="navigation-link" color="#0000EE" href={`${PossibleRoutes.ROOT}`} >home page</Link> or <Link className="navigation-link" color="#0000EE" onClick={() => navigate(-1)}  >go back a step</Link></Typography>
        </main>
    )
}

export default MessagePage