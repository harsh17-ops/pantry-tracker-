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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Your Pantry Dashboard
          </Typography>
        </motion.div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <AddItemForm />
          </Grid>
          <Grid item xs={12} md={8}>
            <PantryItemList />
          </Grid>
          <Grid item xs={12}>
            <Dashboard />
          </Grid>
          <Grid item xs={12}>
            <RecipeSuggestions />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default DashboardPage;
