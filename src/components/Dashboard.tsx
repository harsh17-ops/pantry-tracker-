import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { motion, AnimatePresence } from 'framer-motion';
@@ -36,83 +36,79 @@ const Dashboard: React.FC = () => {
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
    <div>
      <Box display="flex" justifyContent="center" marginBottom={3}>
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
      </Box>
      <Box padding={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
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
          </Grid>
          <Grid item xs={12} md={6}>
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
            <Typography variant="body2">Here’s what’s expiring soon...</Typography>
          </Grid>
        </Grid>
        <Box marginTop={3}>
          <Typography variant="h6" gutterBottom>Today's Meal Suggestion</Typography>
          <RecipeSuggestions />
        </Box>
      </Box>
      <AnimatePresence>
        {showAddForm && (
          <MotionGrid item xs={12}
          <Box
            component={motion.div}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            padding={2}
          >
            <AddItemForm />
          </MotionGrid>
          </Box>
        )}
      </AnimatePresence>
    </Grid>
    </div>
  );
};

export default Dashboard;
