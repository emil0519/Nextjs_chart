'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

declare module '@mui/material/styles' {
  interface Theme {
    background: {
      white: string;
    };
  }
  interface ThemeOptions {
    background?: {
      white?: string;
    };
  }
}

const theme = createTheme({
  background:{
    white: 'white'
  }
});

export default theme;
