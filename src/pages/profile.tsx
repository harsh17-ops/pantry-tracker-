import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/system';

const CenteredContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '2rem',
});

const ProfileCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  width: '100%',
  maxWidth: '400px',
}));

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <CenteredContainer>
      <ProfileCard>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        {user ? (
          <>
            <Typography variant="h6">Email: {user.email}</Typography>
            <Typography variant="body1">UID: {user.uid}</Typography>
            {/* Add any additional user details here */}
            <Button variant="contained" color="primary" onClick={() => auth.signOut()}>
              Log Out
            </Button>
          </>
        ) : (
          <Typography variant="body1">Please log in to view your profile.</Typography>
        )}
      </ProfileCard>
    </CenteredContainer>
  );
};

export default Profile;
