import React from 'react';
import type { ProductDTO } from '../../types/productTypes';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

interface ProductListProps {
  products: ProductDTO[];
  onEdit: (product: ProductDTO) => void;
  canEdit: boolean;
  canDelete: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, canEdit, canDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Material</TableCell>
            {(canEdit || canDelete) && <TableCell align="right">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body2" color="textSecondary">
                  No products found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.type.replace(/([A-Z])/g, ' $1').trim()}</TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell>{product.material}</TableCell>
                {(canEdit || canDelete) && (
                  <TableCell align="right">
                    {canEdit && (
                      <IconButton onClick={() => onEdit(product)}>
                        <Edit />
                      </IconButton>
                    )}
                    {canDelete && (
                      <IconButton onClick={() => console.log('Delete', product.id)}>
                        <Delete />
                      </IconButton>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductList;