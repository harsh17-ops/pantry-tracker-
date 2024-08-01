import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase'; // Make sure this is correctly imported
import { signInWithEmailAndPassword } from 'firebase/auth';
import { styled } from '@mui/system';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const CenteredContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: '#f5f5f5',
});

const FormBox = styled(Box)({
  background: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
});

const ErrorText = styled(Typography)({
  color: '#d32f2f',
  marginBottom: '1rem',
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to login. Please check your email and password.');
    }
  };

  return (
    <CenteredContainer>
      <FormBox>
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        {error && <ErrorText variant="body2">{error}</ErrorText>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '1rem' }}
          >
            Login
          </Button>
        </form>
      </FormBox>
    </CenteredContainer>
  );
};

export default Login;

