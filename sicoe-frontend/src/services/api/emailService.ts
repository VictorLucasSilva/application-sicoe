import { apiService } from './axios.config';
import type { Email, FilterEmailParams, PaginatedResponse, ApiResponse } from '@/types';

export const emailService = {
  /**
   * Listar logs de e-mail
   */
  async getEmails(params?: FilterEmailParams): Promise<PaginatedResponse<Email>> {
    const response = await apiService.get<ApiResponse<PaginatedResponse<Email>>>('/email', {
      params,
    });
    return response.data.data;
  },

  /**
   * Listar todos os tipos de email
   */
  async getTypes(): Promise<{ data: string[] }> {
    const response = await apiService.get<ApiResponse<string[]>>('/email/types');
    return { data: response.data.data || [] };
  },

  /**
   * Listar todos os assuntos de email
   */
  async getSubjects(): Promise<{ data: string[] }> {
    const response = await apiService.get<ApiResponse<string[]>>('/email/subjects');
    return { data: response.data.data || [] };
  },

  /**
   * Listar todos os destinos únicos
   */
  async getDestinations(): Promise<{ data: string[] }> {
    const response = await apiService.get<ApiResponse<string[]>>('/email/destinations');
    return { data: response.data.data || [] };
  },
};
