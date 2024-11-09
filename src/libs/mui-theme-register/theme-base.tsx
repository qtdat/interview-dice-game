import { createTheme } from '@mui/material/styles';

const themeBase = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    mode: 'light',
    text: {
      primary: 'rgb(17, 24, 39)',
      secondary: 'rgb(107, 114, 128)',
      disabled: 'rgb(149, 156, 169)',
    },
    common: {
      black: 'rgb(17, 24, 39)',
      white: 'rgb(255, 255, 255)',
    },
    primary: {
      main: '#e0e0e0',
    },
    secondary: {
      main: '#7c4dff',
    },
    background: {
      paper: '#FFFFFF',
      default: '#f6f7f9',
    },
    error: {
      light: '#ffcdd2',
      main: '#f44336',
      dark: '#b71c1c',
    },
  },
});

export default themeBase;
