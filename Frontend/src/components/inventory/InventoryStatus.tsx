import React, { useState, useEffect } from 'react';
import type { InventoryStatusDTO } from '../../types/inventoryTypes';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Chip } from '@mui/material';
import { getInventoryStatus } from '../../services/inventoryService';

const InventoryStatus: React.FC = () => {
  const [inventoryStatus, setInventoryStatus] = useState<InventoryStatusDTO[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchInventoryStatus = async () => {
      try {
        const data = await getInventoryStatus();
        setInventoryStatus(data);
      } catch (error) {
        console.error('Error fetching inventory status:', error);
      }
    };
    fetchInventoryStatus();
  }, []);

  const filteredStatus = inventoryStatus.filter(item =>
    item.product.name.toLowerCase().includes(filter.toLowerCase()) ||
    item.product.type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Inventory Status
      </Typography>
      <TextField
        label="Filter by product name or type"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Material</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStatus.map((item) => (
              <TableRow key={item.product.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>
                  {item.product.type.replace(/([A-Z])/g, ' $1').trim()}
                </TableCell>
                <TableCell>{item.product.size}</TableCell>
                <TableCell>{item.product.material}</TableCell>
                <TableCell align="right">{item.availableQuantity}</TableCell>
                <TableCell>
                  {item.availableQuantity < 50 ? (
                    <Chip label="Low Stock" color="error" size="small" />
                  ) : (
                    <Chip label="In Stock" color="success" size="small" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InventoryStatus;