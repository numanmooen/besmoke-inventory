import api from './api';
import type { AuthResponseDTO, LoginDTO, RegisterDTO } from '../types/authTypes';

export const login = async (credentials: LoginDTO): Promise<AuthResponseDTO> => {
  const response = await api.post<AuthResponseDTO>('/auth/login', credentials);
  return response.data;
};

export const register = async (userData: RegisterDTO): Promise<AuthResponseDTO> => {
  const response = await api.post<AuthResponseDTO>('/auth/register', userData);
  return response.data;
};

export const logout = async (): Promise<void> => {
  // Add any logout logic if needed
};