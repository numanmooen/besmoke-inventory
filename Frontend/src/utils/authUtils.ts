export const getToken = (): string | null => {
    return localStorage.getItem('authToken');
  };
  
  export const setToken = (token: string): void => {
    localStorage.setItem('authToken', token);
  };
  
  export const removeToken = (): void => {
    localStorage.removeItem('authToken');
  };
  
  export const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };