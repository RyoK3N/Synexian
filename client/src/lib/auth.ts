import { apiRequest } from "./queryClient";

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  message: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  twoFactor?: string;
}

class AuthService {
  private tokenKey = "admin_token";
  private userKey = "admin_user";

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiRequest("POST", "/api/admin/login", credentials);
    const data = await response.json();
    
    if (data.token && data.user) {
      this.setToken(data.token);
      this.setUser(data.user);
    }
    
    return data;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    
    // Clear any cached query data
    window.location.href = "/admin";
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getUser(): User | null {
    const userData = localStorage.getItem(this.userKey);
    if (!userData) return null;
    
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error("Failed to parse user data:", error);
      this.logout();
      return null;
    }
  }

  setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === "admin";
  }

  async verifyToken(): Promise<{ valid: boolean; user?: User }> {
    try {
      const response = await apiRequest("GET", "/api/admin/verify");
      const data = await response.json();
      
      if (data.valid && data.user) {
        this.setUser(data.user);
        return { valid: true, user: data.user };
      }
      
      return { valid: false };
    } catch (error) {
      console.error("Token verification failed:", error);
      this.logout();
      return { valid: false };
    }
  }

  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    if (!token) return {};
    
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  // Helper method to check if token is expired (basic check)
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      // Decode JWT payload (basic decode without verification)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      
      return payload.exp < currentTime;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return true;
    }
  }

  // Auto-refresh token before expiration (if needed)
  async refreshTokenIfNeeded(): Promise<boolean> {
    if (this.isTokenExpired()) {
      this.logout();
      return false;
    }
    
    // If token expires within 5 minutes, verify it
    try {
      const token = this.getToken();
      if (!token) return false;
      
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const fiveMinutes = 5 * 60;
      
      if (payload.exp - currentTime < fiveMinutes) {
        const verification = await this.verifyToken();
        return verification.valid;
      }
      
      return true;
    } catch (error) {
      console.error("Token refresh check failed:", error);
      return false;
    }
  }
}

export const authService = new AuthService();

// Export convenience functions
export const login = (credentials: LoginRequest) => authService.login(credentials);
export const logout = () => authService.logout();
export const getToken = () => authService.getToken();
export const getUser = () => authService.getUser();
export const isAuthenticated = () => authService.isAuthenticated();
export const isAdmin = () => authService.isAdmin();
export const verifyToken = () => authService.verifyToken();
export const getAuthHeaders = () => authService.getAuthHeaders();

// Hook for React components to use authentication
export const useAuth = () => {
  return {
    user: getUser(),
    token: getToken(),
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
    login,
    logout,
    verifyToken,
  };
};
