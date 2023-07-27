import React, { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import { PossibleRoutes } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import {
    MessagePageContainer,
    MessagePageLink
} from './MessagePage.styled';

interface MessagePageProps {
    title?: ReactNode;
    subtitle?: ReactNode;
  }

const MessagePage: React.FC<MessagePageProps> = (props) => {
    const { title, subtitle } = props;
    const navigate = useNavigate();

    return (
        <MessagePageContainer>
            <Typography variant="h4" >{title}</Typography>
            <Typography variant="subtitle1" >{subtitle}</Typography>
            <Typography>Go back to the <MessagePageLink color="#0000EE" href={`${PossibleRoutes.ROOT}`} >home page</MessagePageLink> or <MessagePageLink color="#0000EE" onClick={() => navigate(-1)}  >go back a step</MessagePageLink></Typography>
        </MessagePageContainer>
    )
}

export default MessagePage