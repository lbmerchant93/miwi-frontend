import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import './LandingPage.css';

const MainPage:React.FC = () => {

  return (
    <Box className="landing-page-container">
      <Typography variant="h2">
        <strong>
          Welcome to MiWi
        </strong>
      </Typography>
      <Typography variant="subtitle1">Your personal Midwifery App</Typography>
      <Box className="landing-page-description-container">
        <Typography variant="h5"><strong>Reminder to give yourself some grace!</strong></Typography>
        <Typography variant="body1">You're going to have bad days. You're going to skip some activities. Checking off everything every single day is not sustainable. Don't trash yourself. This journal isn't intended for a perfection destination. It is a tool to visually guide you through the journey.</Typography>
      </Box>
      <Box className="landing-page-description-container">
        <Typography variant="h5"><strong>Whenever you're ready</strong></Typography>
        <Typography variant="body1">Click the log in button at the top right corner of this page to sign in, where you will then be directed to your personal dashboard.</Typography>
      </Box>
    </Box>
  )
}

export default MainPage;