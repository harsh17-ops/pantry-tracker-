import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Button, TextField, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { usePantryItems } from '../hooks/usePantryItems';
import AddItemForm from '../components/AddItemForm';
import RecipeSuggestions from '../components/RecipeSuggestions';
import PantryItemList from '../components/PantryItemList';

const ChartContainer = styled(Box)({
  height: 300,
  width: '100%',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#2AB7CA'];

const MotionBox = motion(Box);

const Dashboard: React.FC = () => {
  const { items } = usePantryItems();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const earliestExpiringItem = expirationData[0];

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'HIDE FORM' : 'ADD ITEMS'}
        </Button>
      </Box>

      <AnimatePresence>
        {showAddForm && (
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            mb={3}
          >
            <StyledPaper>
              <AddItemForm onSuccess={() => setShowAddForm(false)} />
            </StyledPaper>
          </MotionBox>
        )}
      </AnimatePresence>

      <StyledPaper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Pantry Overview</Typography>
            <ChartContainer>
              <ResponsiveContainer>
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
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Expiring Soon</Typography>
            <ChartContainer>
              <ResponsiveContainer>
                <BarChart data={expirationData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="daysLeft" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Grid>
        </Grid>
      </StyledPaper>

      <StyledPaper>
        <Typography variant="h6" gutterBottom>Today's Meal Suggestion</Typography>
        {earliestExpiringItem ? (
          <Typography>
            We suggest using {earliestExpiringItem.name} in your meal today, as it's expiring in {earliestExpiringItem.daysLeft} days.
          </Typography>
        ) : (
          <Typography>No items are expiring soon.</Typography>
        )}
      </StyledPaper>

      <StyledPaper>
        <Typography variant="h6" gutterBottom>Pantry Items</Typography>
        <TextField
          label="Search Pantry Items"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <PantryItemList searchQuery={searchQuery} />
      </StyledPaper>

      <StyledPaper>
        <Typography variant="h6" gutterBottom>Recipe Suggestions</Typography>
        <RecipeSuggestions />
      </StyledPaper>
    </Box>
  );
};

export default Dashboard;
