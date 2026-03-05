import { apiService } from './axios.config';
import type { Email, FilterEmailParams, PaginatedResponse, ApiResponse } from '@/types';

export const emailService = {

  async getEmails(params?: FilterEmailParams): Promise<PaginatedResponse<Email>> {
    const response = await apiService.get<ApiResponse<PaginatedResponse<Email>>>('/email', {
      params,
    });
    return response.data.data;
  },


  async getTypes(): Promise<{ data: string[] }> {
    const response = await apiService.get<ApiResponse<string[]>>('/email/types');
    return { data: response.data.data || [] };
  },


  async getSubjects(): Promise<{ data: string[] }> {
    const response = await apiService.get<ApiResponse<string[]>>('/email/subjects');
    return { data: response.data.data || [] };
  },


  async getDestinations(): Promise<{ data: string[] }> {
    const response = await apiService.get<ApiResponse<string[]>>('/email/destinations');
    return { data: response.data.data || [] };
  },
};
