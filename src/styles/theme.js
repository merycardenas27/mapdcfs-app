// CUSTOM THEME
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#000000',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.only('xs')]: {
            fontSize: '2rem',
          },
        }),
      },
    },
  }
});

export default theme;
