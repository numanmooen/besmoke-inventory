import React, { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import InventoryOperationForm from '../../components/inventory/InventoryOperationForm';
import InventoryList from '../../components/inventory/InventoryList';
import { useAuth } from '../../contexts/AuthContext';
import { getInventoryOperations } from '../../services/inventoryService'; 

const InventoryPage: React.FC = () => { 
  const { hasRole } = useAuth();

  useEffect(() => {
    const fetchOperations = async () => {
      try {
         await getInventoryOperations(); 
      } catch (error) {
        console.error('Error fetching inventory operations:', error);
      }
    };
    fetchOperations();
  }, []);

  const handleOperationSuccess = () => {
    // Refresh operations list
    getInventoryOperations();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>
      
      {(hasRole('Admin') || hasRole('Manager')) && (
        <Box mb={4}>
          <InventoryOperationForm onSuccess={handleOperationSuccess} />
        </Box>
      )}

      <InventoryList />
    </Container>
  );
};

export default InventoryPage;