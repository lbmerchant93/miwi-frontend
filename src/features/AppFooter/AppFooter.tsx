import React from 'react';
import { Link } from 'react-router-dom';
import { PossibleRoutes } from '../../utils/constants';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import './AppFooter.css';

const AppFooter: React.FC = () => {

  return (
    <footer>
      <Box maxWidth="1232px" width={"100%"} display="flex">
        <Box display="flex" flexDirection="column" alignItems="flex-start" py={3} px={2}>
          <Typography variant="body1" mb={1} color="primary.light">Support</Typography>
          <Link to={`${PossibleRoutes.ABOUT}`} className="footer-link">
              <Typography variant="body1">About Us</Typography>
          </Link>
          <Link to={`${PossibleRoutes.HOW_MIWI_WORKS}`} className="footer-link">
              <Typography variant="body1">How MiWi Works</Typography>
          </Link>
          {/* <Link to={`${PossibleRoutes.ROOT}`} className="footer-link">
              <Typography variant="body1">Contact Us</Typography>
          </Link> */}
        </Box>
      </Box>
    </footer>
  );
};

export default AppFooter;