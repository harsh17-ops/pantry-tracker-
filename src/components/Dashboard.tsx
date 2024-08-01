import React, { useState, useEffect } from 'react';
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

  // Prepare data for Pie Chart
  const categoryData = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

  // Prepare data for Bar Chart
  const expirationData = items
    .sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime())
    .slice(0, 5)
    .map(item => ({
      name: item.name,
      daysLeft: Math.ceil((new Date(item.expirationDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)),
    }));

  // Get today's meal suggestion based on the earliest expiring item
  const earliestExpiringItem = items
    .sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime())[0];

  // Function to fetch recipe suggestions based on pantry items
  const [recipes, setRecipes] = useState<Recipe[]>([]);
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
    <Grid container spacing={3} style={{ position: 'relative' }}>
      {/* Quick Add Item Form (conditionally rendered and positioned above other content) */}
      <AnimatePresence>
        {showAddForm && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            zIndex={1200}
            p={3}
            style={{ backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
          >
            <AddItemForm />
          </Box>
        )}
      </AnimatePresence>

      {/* Quick Add Item Button */}
      <Grid item xs={12} style={{ textAlign: 'center', marginBottom: 20 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Hide Add Form' : 'Quick Add Item'}
        </Button>
      </Grid>

      {/* Main Content: Pie Chart, Bar Chart, and Today's Meal Suggestion */}
      <Grid item xs={12}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box mb={4} width="100%">
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
          </Box>

          <Box mb={4} width="100%">
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
            {earliestExpiringItem && (
              <Typography variant="h6" gutterBottom>
                Today's Meal Suggestion: {earliestExpiringItem.name}
              </Typography>
            )}
          </Box>
        </Box>
      </Grid>

      {/* Recipe Suggestions */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Recipe Suggestions</Typography>
        <RecipeSuggestions recipes={recipes} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
