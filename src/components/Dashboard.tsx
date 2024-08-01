import React, { useState } from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { usePantryItems } from '../hooks/usePantryItems';
import AddItemForm from './AddItemForm';
import RecipeSuggestions from './RecipeSuggestions';

const ChartContainer = styled(Box)({
  height: 300,
  marginBottom: 20,
});

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#2AB7CA'];

const MotionGrid = motion(Grid);

const Dashboard: React.FC = () => {
  const { items } = usePantryItems();
  const [showAddForm, setShowAddForm] = useState(false);

  const categoryData = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

  const expirationData = items
    .sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime())
    .slice(0, 5)
    .map(item => ({
      name: item.name,
      daysLeft: Math.ceil((new Date(item.expirationDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)),
    }));

  return (
    <Grid container spacing={3}>
      <MotionGrid item xs={12} md={6} lg={4}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h6" gutterBottom>Pantry Overview</Typography>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <Typography>Total Items: {items.length}</Typography>
        <Typography>Categories: {Object.keys(categoryData).length}</Typography>
      </MotionGrid>
      <MotionGrid item xs={12} md={6} lg={4}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography variant="h6" gutterBottom>Expiring Soon</Typography>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expirationData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="daysLeft" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Hide Add Form' : 'Quick Add Item'}
        </Button>
      </MotionGrid>
      <MotionGrid item xs={12} lg={4}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Typography variant="h6" gutterBottom>Today's Meal Suggestion</Typography>
        <RecipeSuggestions />
      </MotionGrid>
      <AnimatePresence>
        {showAddForm && (
          <MotionGrid item xs={12}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AddItemForm />
          </MotionGrid>
        )}
      </AnimatePresence>
    </Grid>
  );
};

export default Dashboard;

