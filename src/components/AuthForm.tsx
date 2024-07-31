import React, { useState } from 'react';
import { TextField, Button, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Styled components
const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 350,
  padding: theme.spacing(4),
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  background: '#ffffff',
  transition: 'transform 0.3s ease-in-out',
  position: 'relative',
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
  overflow: 'hidden',
});

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    <FormContainer>
      <Typography variant="h5" gutterBottom>
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
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
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
          {error && (
            <Typography color="error" variant="body2" style={{ marginBottom: '16px' }}>
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
        <Button
          color="secondary"
          onClick={() => setIsSignUp(!isSignUp)}
          style={{ marginTop: '16px' }}
        >
          {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </Button>
      </AuthFormWrapper>
    </FormContainer>
  );
};

export default AuthForm;
