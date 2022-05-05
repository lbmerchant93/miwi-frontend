import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import './LandingPage.css';

const MainPage:React.FC = () => {

  return (
    <Box className="landing-page-container">
      <Typography variant="h2">
        Welcome to MiWi
      </Typography>
      <Typography variant="h6">Your personal Midwifery App</Typography>
      <Box className="landing-page-description-container">
        <Typography variant="h5"></Typography>
      </Box>
    </Box>
  )
}

export default MainPage;