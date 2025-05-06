import api from './api';
import type { ProductDTO, ProductCreateDTO, ProductUpdateDTO } from '../types/productTypes';

export const getProducts = async (): Promise<ProductDTO[]> => {
  const response = await api.get<ProductDTO[]>('/products');
  return response.data;
};

export const getProductById = async (id: number): Promise<ProductDTO> => {
  const response = await api.get<ProductDTO>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: ProductCreateDTO): Promise<ProductDTO> => {
  const response = await api.post<ProductDTO>('/products', product);
  return response.data;
};

export const updateProduct = async (id: number, product: ProductUpdateDTO): Promise<void> => {
  await api.put(`/products/${id}`, product);
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};