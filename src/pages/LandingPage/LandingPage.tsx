import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import PregnancyOutline from '../../images/PregnancyOutline';
import Stroller from '../../images/Stroller';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  LandingPageContainer,
  LandingPageDescriptionContainer,
  LandingPageDescriptionMiddleContainer
} from './LandingPage.styled';


const MainPage:React.FC = () => {
  const { pathname } = useLocation();
  const isTablet = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box mb={2}>
      <Box display="flex" flexDirection="column" alignItems="center" color="#6d0f93" mb={2} textAlign="center">
        <Typography variant="h2">
          <strong>
            Welcome to MiWi!
          </strong>
        </Typography>
        <Typography variant="subtitle1"><i>*Your personal Midwifery App*</i></Typography>
      </Box>
      <LandingPageContainer mt={5} color="#6d0f93">
        <Box display="flex" justifyContent="center">
          <LandingPageDescriptionContainer display="flex" flexDirection="column" justifyContent="center" px={2} py={2} bgcolor="#6d0f93" color="white" borderRadius={10} minHeight={200} maxWidth={750} alignSelf="center">
            <Typography variant='h4'><strong>Why MiWi?</strong></Typography>
            <Typography variant="h6" mt={1}>Preparing for your empowered, healthy birth and postpartum period takes focus. This journal guides you through the daily activities that will have you ready to rock your birth!</Typography>
          </LandingPageDescriptionContainer>
          {!isTablet && <Box ml={4}><Stroller /></Box>}
        </Box>
        <Box display="flex" justifyContent="center" mt={5}>
          {!isTablet && <Box display="flex" alignItems="center"><img width="250" height="250" src="https://img.icons8.com/color/250/flying-stork-with-bundle.png" alt="flying-stork-with-bundle"/></Box>}
          <LandingPageDescriptionMiddleContainer display="flex" flexDirection="column" justifyContent="center" px={2} py={2} color="#6d0f93" borderRadius={10} minHeight={200} maxWidth={750} alignSelf="center" mt={2}>
            <Typography variant="h4"><strong>Remember to allow yourself grace!</strong></Typography>
            <Typography variant="h6" mt={1}>You're going to have bad days. You're going to skip some activities. Checking off everything every single day is not sustainable. Don't trash yourself. This journal isn't intended for a perfection destination. It is a tool to visually guide you through the journey. While journaling try to think: <i>"What is something that made me laugh or made me grateful today?"</i></Typography>
          </LandingPageDescriptionMiddleContainer>
        </Box>
        <Box display="flex" justifyContent="center" mt={3}>
          <LandingPageDescriptionContainer display="flex" flexDirection="column" justifyContent="center" px={2} py={2} bgcolor="#6d0f93" color="white" borderRadius={10} minHeight={200} maxWidth={750} alignSelf="center" mt={2}>
            <Typography variant="h4"><strong>Whenever you're ready</strong></Typography>
            <Typography variant="h6" mt={1}>Click the log in button at the top right corner of this page to sign in, where you will then be directed to your personal dashboard.</Typography>
          </LandingPageDescriptionContainer> 
          {!isTablet && <Box><PregnancyOutline /></Box>}
        </Box>
          
      </LandingPageContainer>
    </Box>
  )
}

export default MainPage;