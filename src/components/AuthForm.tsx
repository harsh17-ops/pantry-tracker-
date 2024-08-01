import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Checkbox, FormControlLabel, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Styled components
const CenteredContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(2),
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 400,
  padding: theme.spacing(4),
  borderRadius: 12,
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  background: theme.palette.background.paper,
  textAlign: 'center',
}));

const AuthFormWrapper = styled(motion.div)({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  width: '100%',
});

const AnimatedButton = styled(motion.div)({
  display: 'inline-block',
  width: '100%',
  marginTop: 16,
  borderRadius: 12,
});

const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '75%',
    color: theme.palette.text.primary,
  },
  '& .MuiCheckbox-root': {
    color: theme.palette.text.primary,
  },
}));

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (error) {
      setError('Authentication failed. Please check your credentials.');
      console.error('Auth error:', error);
    }
  };

  return (
    <CenteredContainer>
      <FormContainer>
        <Typography variant="h4" color="primary" gutterBottom>
          {isSignUp ? 'Sign Up' : 'Login'}
        </Typography>
        <AuthFormWrapper
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                style: { color: 'black' }, // Ensure text color is black
              }}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                style: { color: 'black' }, // Ensure text color is black
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box display="flex" justifyContent="space-between" alignItems="center" marginY={2}>
              <CustomFormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="Remember Me"
              />
              <Button color="primary" onClick={() => alert('Forgot Password Clicked')}>
                Forgot Password?
              </Button>
            </Box>
            {error && (
              <Typography color="error" variant="body2" style={{ marginBottom: 16 }}>
                {error}
              </Typography>
            )}
            <AnimatedButton
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {isSignUp ? 'Sign Up' : 'Login'}
              </Button>
            </AnimatedButton>
          </form>
          <Typography variant="body2" style={{ marginTop: 16 }}>
            {isSignUp ? 'Already have an account?' : 'New on our platform?'}
          </Typography>
          <Button
            color="secondary"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Login' : 'Create an account'}
          </Button>
        </AuthFormWrapper>
      </FormContainer>
    </CenteredContainer>
  );
};

export default AuthForm;
