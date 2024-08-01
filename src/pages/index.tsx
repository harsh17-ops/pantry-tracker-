import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import Link from 'next/link';
import { KitchenOutlined, LocalDiningOutlined, NotificationsActiveOutlined } from '@mui/icons-material';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: 'white',
  padding: theme.spacing(12, 0, 8),
  textAlign: 'center',
  borderRadius: '0 0 50% 50% / 10%',
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  fontSize: '4rem',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const FeaturePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  borderRadius: 16,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  },
}));

const AnimatedButton = styled(motion.div)({
  display: 'inline-block',
});

const Footer = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
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
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to Pantry Tracker
            </Typography>
            <Typography variant="h5" component="p" paragraph>
              Your ultimate solution for managing pantry items efficiently! Minimize food waste, save money, and discover new recipes.
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
          </motion.div>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <FeaturePaper elevation={3}>
                <FeatureIcon>
                  <KitchenOutlined fontSize="inherit" />
                </FeatureIcon>
                <Typography variant="h5" component="h3" gutterBottom>
                  Inventory Management
                </Typography>
                <Typography>
                  Keep track of all your pantry items in one organized place. Add, edit, or remove items with ease.
                </Typography>
              </FeaturePaper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
              <FeaturePaper elevation={3}>
                <FeatureIcon>
                  <NotificationsActiveOutlined fontSize="inherit" />
                </FeatureIcon>
                <Typography variant="h5" component="h3" gutterBottom>
                  Expiration Alerts
                </Typography>
                <Typography>
                  Set up notifications to alert you before your food items expire. Never let your groceries go to waste again!
                </Typography>
              </FeaturePaper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
              <FeaturePaper elevation={3}>
                <FeatureIcon>
                  <LocalDiningOutlined fontSize="inherit" />
                </FeatureIcon>
                <Typography variant="h5" component="h3" gutterBottom>
                  Recipe Suggestions
                </Typography>
                <Typography>
                  Discover delicious recipes based on the ingredients you already have in your pantry. Get inspired and cook!
                </Typography>
              </FeaturePaper>
            </motion.div>
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
