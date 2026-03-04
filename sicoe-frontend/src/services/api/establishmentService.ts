import { apiService } from './axios.config';
import type {
  Establishment,
  FilterEstablishmentParams,
  PaginatedResponse,
  ApiResponse,
} from '@/types';

export const establishmentService = {
  
  async getEstablishments(
    params?: FilterEstablishmentParams
  ): Promise<PaginatedResponse<Establishment>> {
    const response = await apiService.get<ApiResponse<PaginatedResponse<Establishment>>>(
      '/establishments',
      { params }
    );
    return response.data.data;
  },

  
  async getEstablishment(id: number): Promise<Establishment> {
    const response = await apiService.get<ApiResponse<Establishment>>(`/establishments/${id}`);
    return response.data.data;
  },

  
  async createEstablishment(data: Partial<Establishment>): Promise<Establishment> {
    const response = await apiService.post<ApiResponse<Establishment>>('/establishments', data);
    return response.data.data;
  },

  
  async updateEstablishment(id: number, data: Partial<Establishment>): Promise<Establishment> {
    const response = await apiService.patch<ApiResponse<Establishment>>(
      `/establishments/${id}`,
      data
    );
    return response.data.data;
  },

  
  async deleteEstablishment(id: number): Promise<{ message: string }> {
    const response = await apiService.delete<ApiResponse<{ message: string }>>(
      `/establishments/${id}`
    );
    return response.data.data;
  },
};
