import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import PregnancyOutline from '../../images/PregnancyOutline';

import './LandingPage.css';

const MainPage:React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="center" color="#6d0f93">
        <Typography variant="h2">
          <strong>
            Welcome to MiWi!
          </strong>
        </Typography>
        <Typography variant="subtitle1">*Your personal Midwifery App*</Typography>
      </Box>
      <Box display="flex">
        <Box className="landing-page-description-container" mt={4} color="#6d0f93">
          <Box>
             <Typography variant='h5'><strong>Why MiWi?</strong></Typography>
            <Typography variant="body1" mt={1} mb={4}>Preparing for your empowered, healthy birth and postpartum period takes focus. This journal guides you through the daily activities that will have you ready to rock your birth!</Typography>
          </Box>
          <Box>
            <Typography variant="h5"><strong>Remember to allow yourself grace!</strong></Typography>
            <Typography variant="body1" mt={1} mb={4}>You're going to have bad days. You're going to skip some activities. Checking off everything every single day is not sustainable. Don't trash yourself. This journal isn't intended for a perfection destination. It is a tool to visually guide you through the journey. While journaling try to think: <i>"What is something that made me laugh or made me grateful today?"</i></Typography>
          </Box>
          <Box>
            <Typography variant="h5"><strong>Whenever you're ready</strong></Typography>
            <Typography variant="body1" mt={1}>Click the log in button at the top right corner of this page to sign in, where you will then be directed to your personal dashboard.</Typography>
          </Box>    
        </Box>
        <Box>
          <PregnancyOutline />
        </Box>
      </Box>
      
    </Box>
  )
}

export default MainPage;