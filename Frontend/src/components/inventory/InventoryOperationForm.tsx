import React, { useState, useEffect } from 'react';
import { Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import type { ProductDTO } from '../../types/productTypes';
import { getProducts } from '../../services/productService';
import { addInventoryOperation } from '../../services/inventoryService';
import type { CreateInventoryOperationDTO } from '../../types/inventoryTypes';
import { useAuth } from '../../contexts/AuthContext';

interface InventoryOperationFormProps {
  onSuccess: () => void;
}

const InventoryOperationForm: React.FC<InventoryOperationFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [operation, setOperation] = useState<CreateInventoryOperationDTO>({
    productId: 0,
    quantity: 0,
    operationType: 'IN',
    notes: '',
    performedBy: user?.email || 'System'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        // Set default product if available
        if (data.length > 0) {
          setOperation(prev => ({ ...prev, productId: data[0].id }));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addInventoryOperation({
          ...operation,
          quantity: operation.operationType === 'IN' ?
              Math.abs(operation.quantity) :
              -Math.abs(operation.quantity),
          performedBy: user?.email || 'System' 
      });
      onSuccess();
      // Reset form but keep the last selected product
      setOperation(prev => ({
        ...prev,
        quantity: 0,
        notes: ''
      }));
    } catch (error) {
      console.error('Error adding inventory operation:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add Inventory Operation
      </Typography>

      <FormControl fullWidth margin="normal" required>
        <InputLabel id="product-label">Product</InputLabel>
        <Select
          labelId="product-label"
          id="productId"
          value={operation.productId}
          label="Product"
          onChange={(e) => setOperation({...operation, productId: Number(e.target.value)})}
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name} ({product.size}, {product.material})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Rest of the form remains the same */}
    </Box>
  );
};

export default InventoryOperationForm;