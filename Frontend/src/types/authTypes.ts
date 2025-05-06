  export interface LoginDTO {
    email: string;
    password: string;
  }
  
  export interface RegisterDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
  
  export interface AuthResponseDTO {
    token: string;
    expiration: Date;
    userId: string;
    email: string;
    fullName: string;
    roles: string[];
  }
  
  export interface AssignRoleDTO {
    email: string;
    roleName: string;
  }

