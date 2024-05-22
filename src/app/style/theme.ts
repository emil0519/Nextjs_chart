'use client';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    color: {
      white: string;
      yellow: string;
      darkYellow: string;
      red: string;
      darkBlue: string;
    };
  }
  interface ThemeOptions {
    color: {
      white: string;
      yellow: string;
      darkYellow: string;
      red: string;
      darkBlue: string;
    };
  }
}

const theme = createTheme({
  color:{
    white: 'white',
    yellow: '#FCDF9B',
    darkYellow: "#F1AB02",
    red: "#CB4B4B",
    darkBlue: "#0286F4"
  }
});

export default theme;
