import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import lucasProfile from '../../images/lucasProfile.jpg';
import Link from '@mui/material/Link';
import { useLocation } from 'react-router-dom';

import './AboutPage.css';

const AboutPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <>
      <Box className='about-page-container'>
          <Typography variant='h2' mb={2}><strong>Meet Our Team</strong></Typography>
          <Box className='team-container' mb={4}>
            <Typography variant="h4">Lucas Merchant</Typography>
            <Typography variant="body1" mb={1}>Software Developer</Typography>
            <Avatar
              src={lucasProfile}
              alt="Lucas Profile Picture"
              style={{ fontSize: '100px', height: 200, width: 200, marginBottom: '8px' }}>
            </Avatar>
            <Link href="https://github.com/lbmerchant93" underline="always" variant="body1">Github: lbmerchant93</Link>
            <Link href="https://www.linkedin.com/in/lucas-merchant93/" underline="always" variant="body1">LinkedIn: lbmerchant93</Link>
          </Box>
      </Box>
    </>
  )
}

export default AboutPage