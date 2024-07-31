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
            Pantry Tracker Elite
          </Typography>
          <Typography variant="h5" component="p" paragraph>
            Manage your pantry efficiently, reduce food waste, and discover new recipes!
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
                Keep track of all your pantry items in one place.
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
                Get notified before your food items expire.
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
                Discover recipes based on your available ingredients.
              </Typography>
            </FeaturePaper>
          </Grid>
        </Grid>
      </Container>
      <Footer>
        <Typography variant="body2" color="text.secondary">
          Made with ❤️ by Jeet Dekivadia
        </Typography>
      </Footer>
    </Layout>
  );
};

export default Home;
