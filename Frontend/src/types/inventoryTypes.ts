import type { ProductDTO } from './productTypes';

export interface InventoryOperationDTO {
  id: number;
  operationDate: Date;
  quantity: number;
  operationType: string;
  notes: string;
  performedBy: string;
  productId: number;
  product: ProductDTO;
}

export interface CreateInventoryOperationDTO {
  productId: number;
  quantity: number;
  operationType: string;
  notes: string;
  performedBy: string;
}

export interface InventoryStatusDTO {
  product: ProductDTO;
  availableQuantity: number;
}

export interface InventoryReportRequestDTO {
  productType?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface InventoryReportDTO {
  generatedAt: Date;
  reportData: InventoryStatusDTO[];
  filterCriteria: InventoryReportRequestDTO;
}