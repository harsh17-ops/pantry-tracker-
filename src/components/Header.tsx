import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar, Box } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';
import { KitchenOutlined, AccountCircle } from '@mui/icons-material';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontFamily: 'Pacifico, cursive',
  background: `-webkit-linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.secondary.light} 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const AnimatedButton = styled(motion.div)({
  display: 'inline-block',
});

const Header: React.FC = () => {
  const { user, loading } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <KitchenOutlined />
        </IconButton>
        <LogoText variant="h6" component={motion.div} whileHover={{ scale: 1.1 }}>
          Pantry Tracker
        </LogoText>
        {!loading && (
          <Box>
            {user ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {user.photoURL ? (
                    <Avatar src={user.photoURL} alt={user.displayName || ''} />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => { handleClose(); router.push('/profile'); }}>Profile</MenuItem>
                  <MenuItem onClick={() => { handleClose(); router.push('/dashboard'); }}>Dashboard</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <AnimatedButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href="/login" passHref>
                  <Button color="inherit">Login</Button>
                </Link>
              </AnimatedButton>
            )}
          </Box>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
