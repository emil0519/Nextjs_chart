import React from 'react';
import Box from '@mui/material/Box';

export default function Hamburger({ isOpen }: { isOpen: boolean }): React.ReactElement {
  return (
    <Box sx={{
      display: {xs:'flex', lg:'none'},
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 24, 
      width: 24,  
      zIndex: 30,
    }}>
      {/* strokes of the hamburger */}
      <Box sx={{
        height: 4,  
        width: '100%',
        backgroundColor: 'black',
        transition: 'all 200ms',
        transform: isOpen ? 'translateY(12px) rotate(45deg)' : 'none', // Tailwind translate-y-3 and rotate-45
      }} />
      <Box sx={{
        height: 4, 
        width: '66.67%', 
        backgroundColor: 'black',
        transition: 'all 200ms',
        opacity: isOpen ? 0 : 1,
      }} />
      <Box sx={{
        height: 4, 
        width: '100%',
        backgroundColor: 'black',
        transition: 'all 200ms',
        transform: isOpen ? 'translateY(-8px) rotate(-45deg)' : 'none', 
      }} />
    </Box>
  );
}
