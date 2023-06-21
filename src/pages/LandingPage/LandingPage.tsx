import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import PregnancyOutline from '../../images/PregnancyOutline';
import {
  LandingPageContainer,
  LandingPageDescriptionContainer
} from './LandingPage.styled';

const MainPage:React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box mb={2}>
      <Box display="flex" flexDirection="column" alignItems="center" color="#6d0f93">
        <Typography variant="h2">
          <strong>
            Welcome to MiWi!
          </strong>
        </Typography>
        <Typography variant="subtitle1">*Your personal Midwifery App*</Typography>
      </Box>
      <Box display="flex">
        <LandingPageContainer mt={5} color="#6d0f93">
          <LandingPageDescriptionContainer px={2} py={2} bgcolor="#6d0f93" color="white" mb={5} borderRadius={10}>
            <Typography variant='h5'><strong>Why MiWi?</strong></Typography>
            <Typography variant="body1" mt={1}>Preparing for your empowered, healthy birth and postpartum period takes focus. This journal guides you through the daily activities that will have you ready to rock your birth!</Typography>
          </LandingPageDescriptionContainer>
          <LandingPageDescriptionContainer px={2} py={2} mb={5}>
            <Typography variant="h5"><strong>Remember to allow yourself grace!</strong></Typography>
            <Typography variant="body1" mt={1}>You're going to have bad days. You're going to skip some activities. Checking off everything every single day is not sustainable. Don't trash yourself. This journal isn't intended for a perfection destination. It is a tool to visually guide you through the journey. While journaling try to think: <i>"What is something that made me laugh or made me grateful today?"</i></Typography>
          </LandingPageDescriptionContainer>
          <LandingPageDescriptionContainer px={2} py={2} bgcolor="#6d0f93" color="white" borderRadius={10}>
            <Typography variant="h5"><strong>Whenever you're ready</strong></Typography>
            <Typography variant="body1" mt={1}>Click the log in button at the top right corner of this page to sign in, where you will then be directed to your personal dashboard.</Typography>
          </LandingPageDescriptionContainer>    
        </LandingPageContainer>
        <Box>
          <PregnancyOutline />
        </Box>
      </Box>
    </Box>
  )
}

export default MainPage;