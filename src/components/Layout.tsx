import React from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/system';
import Header from './Header';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: 64,
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <MainContent component={motion.main}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <Container maxWidth="lg">
          {children}
        </Container>
      </MainContent>
    </Box>
  );
};

export default Layout;
