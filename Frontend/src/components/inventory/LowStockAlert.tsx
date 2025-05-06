import React, { useState, useEffect } from 'react';
import type { InventoryStatusDTO } from '../../types/inventoryTypes';
import { Alert, AlertTitle, List, ListItem, ListItemText, Typography } from '@mui/material';
import { getLowInventory } from '../../services/inventoryService';

const LowStockAlert: React.FC = () => {
  const [lowStockItems, setLowStockItems] = useState<InventoryStatusDTO[]>([]);

  useEffect(() => {
    const fetchLowStockItems = async () => {
      try {
        const data = await getLowInventory();
        setLowStockItems(data);
      } catch (error) {
        console.error('Error fetching low stock items:', error);
      }
    };
    fetchLowStockItems();
  }, []);

  if (lowStockItems.length === 0) {
    return null;
  }

  return (
    <Alert severity="warning" sx={{ mb: 2 }}>
      <AlertTitle>Low Stock Alert</AlertTitle>
      <Typography variant="body1" gutterBottom>
        The following products have inventory below 50 units:
      </Typography>
      <List dense>
        {lowStockItems.map((item) => (
          <ListItem key={item.product.id}>
            <ListItemText
              primary={`${item.product.name} (${item.product.size}, ${item.product.material})`}
              secondary={`Available: ${item.availableQuantity} units`}
            />
          </ListItem>
        ))}
      </List>
    </Alert>
  );
};

export default LowStockAlert;