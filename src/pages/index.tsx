import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import Link from 'next/link';
import { KitchenOutlined, LocalDiningOutlined, NotificationsActiveOutlined } from '@mui/icons-material';

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: 'white',
  padding: theme.spacing(8, 0, 6),
  textAlign: 'center',
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  fontSize: '3rem',
  marginBottom: theme.spacing(2),
}));

const FeaturePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
}));

const AnimatedButton = styled(motion.div)({
  display: 'inline-block',
});

const Footer = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  textAlign: 'center',
}));

const Home: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <HeroSection>
        <Container maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Pantry Tracker
          </Typography>
          <Typography variant="h5" component="p" paragraph>
            Your ultimate solution for managing pantry items efficiently! With Pantry Tracker, you can minimize food waste, save money, and unleash your culinary creativity by discovering new recipes tailored to the ingredients you have at home.
          </Typography>
          <Typography variant="body1" component="p" paragraph>
            Join our community of food lovers and home cooks who are taking control of their kitchens. Start tracking your inventory today and never let good food go to waste again!
          </Typography>
          {user ? (
            <Link href="/dashboard" passHref>
              <AnimatedButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="contained" color="secondary" size="large">
                  Go to Dashboard
                </Button>
              </AnimatedButton>
            </Link>
          ) : (
            <AuthForm />
          )}
        </Container>
      </HeroSection>

      <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Key Features
        </Typography>
        <Typography variant="body1" component="p" paragraph align="center">
          Our platform is designed with user-friendliness in mind, providing a comprehensive suite of features to enhance your cooking and food management experience. Explore what Pantry Tracker has to offer:
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <FeaturePaper elevation={3}>
              <FeatureIcon>
                <KitchenOutlined fontSize="inherit" color="primary" />
              </FeatureIcon>
              <Typography variant="h5" component="h3" gutterBottom>
                Inventory Management
              </Typography>
              <Typography>
                Keep track of all your pantry items in one organized place. Add, edit, or remove items with ease, ensuring you always know what you have on hand.
              </Typography>
            </FeaturePaper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeaturePaper elevation={3}>
              <FeatureIcon>
                <NotificationsActiveOutlined fontSize="inherit" color="primary" />
              </FeatureIcon>
              <Typography variant="h5" component="h3" gutterBottom>
                Expiration Alerts
              </Typography>
              <Typography>
                Set up notifications to alert you before your food items expire. Never let your groceries go to waste again with timely reminders!
              </Typography>
            </FeaturePaper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeaturePaper elevation={3}>
              <FeatureIcon>
                <LocalDiningOutlined fontSize="inherit" color="primary" />
              </FeatureIcon>
              <Typography variant="h5" component="h3" gutterBottom>
                Recipe Suggestions
              </Typography>
              <Typography>
                Discover delicious recipes based on the ingredients you already have in your pantry. Get inspired and make the most of your groceries!
              </Typography>
            </FeaturePaper>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Why Choose Pantry Tracker?
        </Typography>
        <Typography variant="body1" component="p" paragraph align="center">
          At Pantry Tracker, we believe in sustainability and creativity in the kitchen. Here are a few reasons why our users love us:
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={3}>
            <FeaturePaper elevation={3}>
              <Typography variant="h5" component="h3" gutterBottom>
                Save Money
              </Typography>
              <Typography>
                Reduce unnecessary purchases by knowing exactly what you have and what you need. Save on grocery bills while minimizing food waste.
              </Typography>
            </FeaturePaper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FeaturePaper elevation={3}>
              <Typography variant="h5" component="h3" gutterBottom>
                Culinary Creativity
              </Typography>
              <Typography>
                Experiment with new recipes and enhance your cooking skills by using ingredients you may not have thought to combine.
              </Typography>
            </FeaturePaper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FeaturePaper elevation={3}>
              <Typography variant="h5" component="h3" gutterBottom>
                Eco-Friendly
              </Typography>
              <Typography>
                Join us in the fight against food waste! Pantry Tracker helps you use up your ingredients before they expire, promoting sustainable eating habits.
              </Typography>
            </FeaturePaper>
          </Grid>
        </Grid>
      </Container>

      <Footer>
        <Typography variant="body2" color="text.secondary">
          Made with ❤️ by Jeet Dekivadia. Join us in our mission to reduce food waste and inspire home cooking!
        </Typography>
      </Footer>
    </Layout>
  );
};

export default Home;
