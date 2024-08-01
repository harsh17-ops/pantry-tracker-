// src/styles/theme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff00ff', // Neon pink
      light: '#ff66ff',
      dark: '#cc00cc',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00ffff', // Cyan
      light: '#66ffff',
      dark: '#00cccc',
      contrastText: '#000000',
    },
    background: {
      default: '#120458', // Dark blue
      paper: '#1B0C5F', // Slightly lighter dark blue
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
    error: {
      main: '#ff3131', // Neon red
    },
    warning: {
      main: '#ffaa00', // Neon orange
    },
    info: {
      main: '#3a86ff', // Bright blue
    },
    success: {
      main: '#50ff50', // Neon green
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '0.1em',
      textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '0.1em',
      textShadow: '0 0 8px #00ffff, 0 0 15px #00ffff',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '0.05em',
      textShadow: '0 0 6px #ff00ff',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '0.05em',
      textShadow: '0 0 4px #00ffff',
    },
    h5: {
      fontWeight: 500,
      letterSpacing: '0.05em',
    },
    h6: {
      fontWeight: 500,
      letterSpacing: '0.05em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.1em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'uppercase',
          padding: '10px 20px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 0 15px #ff00ff',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
          '&:hover': {
            background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
          },
        },
        outlined: {
          borderColor: '#ff00ff',
          '&:hover': {
            borderColor: '#00ffff',
            boxShadow: '0 0 15px #00ffff',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ff00ff',
              transition: 'all 0.3s ease-in-out',
            },
            '&:hover fieldset': {
              borderColor: '#00ffff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00ffff',
              boxShadow: '0 0 10px #00ffff',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(to bottom right, rgba(255,0,255,0.1), rgba(0,255,255,0.1))',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 0 20px rgba(255,0,255,0.3), 0 0 40px rgba(0,255,255,0.3)',
          },
        },
      },
    },
  },
});

export default theme;
