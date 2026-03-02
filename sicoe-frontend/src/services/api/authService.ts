import { apiService } from './axios.config';
import type { LoginCredentials, RegisterData, AuthResponse, ApiResponse, User } from '@/types';

export const authService = {
  /**
   * Login
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    return response.data.data;
  },

  /**
   * Register
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data.data;
  },

  /**
   * Get Profile
   */
  async getProfile(): Promise<User> {
    const response = await apiService.get<ApiResponse<User>>('/auth/profile');
    return response.data.data;
  },

  /**
   * Logout (remove token)
   */
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },
};
