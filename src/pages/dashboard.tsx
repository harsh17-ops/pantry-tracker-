import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Layout from '../components/Layout';
import AddItemForm from '../components/AddItemForm';
import PantryItemList from '../components/PantryItemList';
import Dashboard from '../components/Dashboard';
import RecipeSuggestions from '../components/RecipeSuggestions';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

const DashboardPage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in to access the dashboard.</div>;

  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to your Pantry Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <AddItemForm />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <PantryItemList />
            </motion.div>
          </Grid>
          <Grid item xs={12}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <RecipeSuggestions />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default DashboardPage;
