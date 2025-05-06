import React from 'react';
import { Box, Container, Grid, Typography, type GridProps  } from '@mui/material';
import InventoryStatus from '../../components/inventory/InventoryStatus';
import LowStockAlert from '../../components/inventory/LowStockAlert';
import { useAuth } from '../../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const gridItemProps: GridProps = {  
  };
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Welcome back, {user?.fullName}!
      </Typography>
      
      <Grid container spacing={3}>
        <Grid {...gridItemProps}>
          <LowStockAlert />
        </Grid>
        <Grid {...gridItemProps}>
          <Box mt={4}>
            <InventoryStatus />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;