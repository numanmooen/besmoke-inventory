import React, { useState, useEffect } from 'react';
import { Button, Container, Typography } from '@mui/material';
import ProductList from '../../components/products/ProductList';
import ProductForm from '../../components/products/ProductForm';
import { useAuth } from '../../contexts/AuthContext';
import { getProducts } from '../../services/productService';
import type { ProductDTO } from '../../types/productTypes';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductDTO | null>(null);
  const { hasRole } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleFormSuccess = () => {
    setEditingProduct(null);
    setShowForm(false);
    // Refresh products list
    getProducts().then(data => setProducts(data));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Products Management
      </Typography>
      
      {(hasRole('Admin') || hasRole('Manager')) && (
        <Button 
          variant="contained" 
          onClick={() => setShowForm(true)}
          sx={{ mb: 2 }}
        >
          Add New Product
        </Button>
      )}

      {showForm && (
        <ProductForm 
          product={editingProduct || undefined} 
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setEditingProduct(null);
            setShowForm(false);
          }}
        />
      )}

      <ProductList 
        products={products} 
        onEdit={product => {
          setEditingProduct(product);
          setShowForm(true);
        }}
        canEdit={hasRole('Admin') || hasRole('Manager')}
        canDelete={hasRole('Admin')}
      />
    </Container>
  );
};

export default ProductsPage;