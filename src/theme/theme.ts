import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
          light: '#76ffff',
          main: '#18ffff',
          dark: '#00cbcc',
          contrastText: '#000000',
        },
        secondary: {
          light: '#e7ff8c',
          main: '#b2ff59',
          dark: '#7ecb20',
          contrastText: '#000000',
        },
      },
});

export default theme;