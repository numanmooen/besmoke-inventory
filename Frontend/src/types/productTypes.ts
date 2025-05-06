export interface ProductDTO {
    id: number;
    name: string;
    type: string;
    size: string;
    material: string;
    createdAt: Date;
    createdBy: string;
    lastModifiedAt?: Date;
    lastModifiedBy?: string;
  }
  
  export interface ProductCreateDTO {
    name: string;
    type: string;
    size: string;
    material: string;
  }
  
  export interface ProductUpdateDTO {
    name?: string;
    type?: string;
    size?: string;
    material?: string;
  }