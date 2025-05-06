import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MainLayout: React.FC = () => {
  const { user, logout, hasRole } = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Besmoke Inventory
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            {(hasRole('Admin') || hasRole('Manager') || hasRole('User')) && (
              <Button color="inherit" component={Link} to="/products">
                Products
              </Button>
            )}
            {(hasRole('Admin') || hasRole('Manager')) && (
              <Button color="inherit" component={Link} to="/inventory">
                Inventory
              </Button>
            )}
            {user ? (
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet /> {}
      </Box>
    </Box>
  );
};

export default MainLayout;