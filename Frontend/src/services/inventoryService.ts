import api from './api';
import type { CreateInventoryOperationDTO, InventoryOperationDTO, InventoryStatusDTO } from '../types/inventoryTypes';

export const getInventoryOperations = async (): Promise<InventoryOperationDTO[]> => {
  const response = await api.get<InventoryOperationDTO[]>('/inventory/operations');
  return response.data;
};

export const addInventoryOperation = async (
  operation: CreateInventoryOperationDTO
): Promise<InventoryOperationDTO> => {
  const response = await api.post<InventoryOperationDTO>('/inventory/operations', operation);
  return response.data;
};

export const getInventoryStatus = async (): Promise<InventoryStatusDTO[]> => {
  const response = await api.get<InventoryStatusDTO[]>('/inventory/status');
  return response.data;
};

export const getLowInventory = async (threshold = 50): Promise<InventoryStatusDTO[]> => {
  const response = await api.get<InventoryStatusDTO[]>(`/inventory/low-stock?threshold=${threshold}`);
  return response.data;
};