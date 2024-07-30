import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { usePantryItems } from '../hooks/usePantryItems';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  height: 240,
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Dashboard: React.FC = () => {
  const { items } = usePantryItems();

  const categoryData = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <StyledPaper>
          <Typography variant="h6">Pantry Overview</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
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
        </StyledPaper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <StyledPaper>
          <Typography variant="h6">Quick Stats</Typography>
          <Typography>Total Items: {items.length}</Typography>
          <Typography>Categories: {Object.keys(categoryData).length}</Typography>
        </StyledPaper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
