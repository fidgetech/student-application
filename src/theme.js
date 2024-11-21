import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();
const theme = createTheme({
  breakpoints: {
    values: { ...defaultTheme.breakpoints.values, sm: 635 }
  }
});

export default theme;
