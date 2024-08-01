// src/pages/dashboard.tsx

import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Button, TextField } from '@mui/material';
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

interface Recipe {
  id: number;
  title: string;
  image: string;
  missedIngredientCount: number;
}

const Dashboard: React.FC = () => {
  const { items } = usePantryItems();
  const [showAddForm, setShowAddForm] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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

  // Determine the earliest expiring item for today's meal suggestion
  const earliestExpiringItem = items
    .sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime())[0];

  useEffect(() => {
    const fetchRecipes = async () => {
      const ingredients = items.map(item => item.name).join(',');
      const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=4&apiKey=${apiKey}`
      );
      const data = await response.json();
      setRecipes(data);
    };

    if (items.length > 0) {
      fetchRecipes();
    }
  }, [items]);

  return (
    <Grid container spacing={3} direction="column">
      {/* Header and Quick Add Item Button */}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowAddForm(!showAddForm)}
          style={{ marginBottom: '20px', display: 'block', margin: '0 auto' }}
        >
          {showAddForm ? 'Hide Add Form' : 'Quick Add Item'}
        </Button>
      </Grid>

      {/* Add Item Form */}
      <AnimatePresence>
        {showAddForm && (
          <Grid item xs={12}>
            <MotionGrid
              container
              spacing={3}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Grid item xs={12}>
                <AddItemForm />
              </Grid>
            </MotionGrid>
          </Grid>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {/* Pie Chart */}
          <Grid item xs={12} md={4}>
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
          </Grid>

          {/* Bar Chart */}
          <Grid item xs={12} md={4}>
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
          </Grid>

          {/* Today's Meal Suggestion */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Today's Meal Suggestion</Typography>
            <Box padding={2} border={1} borderRadius={2} borderColor="grey.300">
              {earliestExpiringItem ? (
                <Typography>
                  Suggested Meal: {earliestExpiringItem.name} - Expiring in {Math.ceil((new Date(earliestExpiringItem.expirationDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} days
                </Typography>
              ) : (
                <Typography>No items expiring soon.</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>

      {/* Search Bar */}
      <Grid item xs={12}>
        <TextField
          label="Search Pantry Items"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '20px' }}
        />
      </Grid>

      {/* Pantry Item List */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Pantry Item List</Typography>
        <Box padding={2} border={1} borderRadius={2} borderColor="grey.300">
          {/* Map through pantry items */}
          {items.map(item => (
            <Typography key={item.id}>{item.name}</Typography>
          ))}
        </Box>
      </Grid>

      {/* Recipe Suggestions */}
      <Grid item xs={12}>
        <RecipeSuggestions />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
