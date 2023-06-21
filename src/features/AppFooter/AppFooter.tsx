import React from 'react';
import { PossibleRoutes } from '../../utils/constants';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Footer, FooterLink } from './AppFooter.styled';

const AppFooter: React.FC = () => {

  return (
    <Footer>
      <Box maxWidth="1232px" width={"100%"} display="flex">
        <Box display="flex" flexDirection="column" alignItems="flex-start" py={3} px={2}>
          <Typography variant="body1" mb={1} color="primary.light">Support</Typography>
          <FooterLink to={`${PossibleRoutes.ABOUT}`}>
              <Typography variant="body1">About Us</Typography>
          </FooterLink>
          <FooterLink to={`${PossibleRoutes.HOW_MIWI_WORKS}`}>
              <Typography variant="body1">How MiWi Works</Typography>
          </FooterLink>
          {/* <FooterLink to={`${PossibleRoutes.ROOT}`}>
              <Typography variant="body1">Contact Us</Typography>
          </FooterLink> */}
        </Box>
      </Box>
    </Footer>
  );
};

export default AppFooter;