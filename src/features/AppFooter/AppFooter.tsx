import React from 'react';
import { Link } from 'react-router-dom';
import { PossibleRoutes } from '../../utils/constants';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import './AppFooter.css';

const AppFooter: React.FC = () => {

  return (
    <footer>
      <Box className="footer-links-container">
        <Link to={`${PossibleRoutes.ROOT}`} className="footer-link">
            <Typography variant="body1">About</Typography>
        </Link>
        <Link to={`${PossibleRoutes.ROOT}`} className="footer-link">
            <Typography variant="body1">FAQ</Typography>
        </Link>
        <Link to={`${PossibleRoutes.ROOT}`} className="footer-link">
            <Typography variant="body1">Contact Us</Typography>
        </Link>
      </Box>
    </footer>
  );
};

export default AppFooter;