import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Footer = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  textAlign: 'center',
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer>
        <Typography variant="body2" color="text.secondary">
          Made with ❤️ by Jeet Dekivadia
        </Typography>
      </Footer>
    </Box>
  );
};

export default Layout;
