import React from 'react';
import type { ProductDTO, ProductCreateDTO, ProductUpdateDTO } from '../../types/productTypes';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createProduct, updateProduct } from '../../services/productService';

interface ProductFormProps {
  product?: ProductDTO;
  onSuccess: () => void;
  onCancel: () => void;
}

const productTypes = [
  { value: 'ErlenmeyerFlask', label: 'Erlenmeyer Flask' },
  { value: 'DewarFlask', label: 'Dewar Flask' },
  { value: 'Beaker', label: 'Beaker' },
  { value: 'Vial', label: 'Vial' }
];

const materials = ['Glass', 'Plastic'];
const sizes = ['1 mL', '10 mL', '50 mL', '250 mL', '500 mL', '1 L'];

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  type: Yup.string().required('Type is required'),
  size: Yup.string().required('Size is required'),
  material: Yup.string().required('Material is required')
});

const ProductForm: React.FC<ProductFormProps> = ({ product, onSuccess, onCancel }) => {
    const formik = useFormik<ProductCreateDTO | ProductUpdateDTO>({
      initialValues: {
        name: product?.name || '',
        type: product?.type || '',
        size: product?.size || '',
        material: product?.material || ''
      },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (product) {
          // Update existing product
          await updateProduct(product.id, values as ProductUpdateDTO);
        } else {
          // Create new product
          await createProduct(values as ProductCreateDTO);
        }
        onSuccess();
      } catch (error) {
        console.error('Error saving product:', error);
      }
    }
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        {product ? 'Edit Product' : 'Add New Product'}
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        id="name"
        name="name"
        label="Product Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      <TextField
        select
        fullWidth
        margin="normal"
        id="type"
        name="type"
        label="Product Type"
        value={formik.values.type}
        onChange={formik.handleChange}
        error={formik.touched.type && Boolean(formik.errors.type)}
        helperText={formik.touched.type && formik.errors.type}
      >
        {productTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        fullWidth
        margin="normal"
        id="size"
        name="size"
        label="Size"
        value={formik.values.size}
        onChange={formik.handleChange}
        error={formik.touched.size && Boolean(formik.errors.size)}
        helperText={formik.touched.size && formik.errors.size}
      >
        {sizes.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        fullWidth
        margin="normal"
        id="material"
        name="material"
        label="Material"
        value={formik.values.material}
        onChange={formik.handleChange}
        error={formik.touched.material && Boolean(formik.errors.material)}
        helperText={formik.touched.material && formik.errors.material}
      >
        {materials.map((material) => (
          <MenuItem key={material} value={material}>
            {material}
          </MenuItem>
        ))}
      </TextField>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;

