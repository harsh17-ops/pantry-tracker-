import React from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';
import Layout from '../components/Layout';
import AddItemForm from '../components/AddItemForm';
import PantryItemList from '../components/PantryItemList';
import Dashboard from '../components/Dashboard';
import RecipeSuggestions from '../components/RecipeSuggestions';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  },
}));

const DashboardPage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in to access the dashboard.</div>;

  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          Welcome to your Pantry Dashboard
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <StyledPaper>
                <Dashboard />
              </StyledPaper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <StyledPaper>
                <AddItemForm />
              </StyledPaper>
            </motion.div>
          </Grid>
          <Grid item xs={12}>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <StyledPaper>
                <PantryItemList />
              </StyledPaper>
            </motion.div>
          </Grid>
          <Grid item xs={12}>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
              <StyledPaper>
                <RecipeSuggestions />
              </StyledPaper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default DashboardPage;
