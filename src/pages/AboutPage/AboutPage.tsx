import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import './AboutPage.css';

const AboutPage = () => {
  return (
    <Box className='about-page-container'>
        <Typography variant='h2'><strong>Why MiWi?</strong></Typography>
        <Typography variant="body1">Preparing for your empowered, healthy birth and postpartum period takes focus. This journal guides you through the daily activities that will have you ready to rock your birth!</Typography>
    </Box>
  )
}

export default AboutPage