import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
          light: '#000',
          main: '#000',
          dark: '#000',
          contrastText: '#ffffff',
        },
        secondary: {
          light: '#ffffff',
          main: '#ffffff',
          dark: '#ffffff',
          contrastText: '#000000',
        },
      },
});

export default theme;