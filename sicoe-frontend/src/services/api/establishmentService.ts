import { apiService } from './axios.config';
import type {
  Establishment,
  FilterEstablishmentParams,
  PaginatedResponse,
  ApiResponse,
} from '@/types';

export const establishmentService = {
  /**
   * Listar estabelecimentos
   */
  async getEstablishments(
    params?: FilterEstablishmentParams
  ): Promise<PaginatedResponse<Establishment>> {
    const response = await apiService.get<ApiResponse<PaginatedResponse<Establishment>>>(
      '/establishments',
      { params }
    );
    return response.data.data;
  },

  /**
   * Buscar estabelecimento por ID
   */
  async getEstablishment(id: number): Promise<Establishment> {
    const response = await apiService.get<ApiResponse<Establishment>>(`/establishments/${id}`);
    return response.data.data;
  },

  /**
   * Criar estabelecimento
   */
  async createEstablishment(data: Partial<Establishment>): Promise<Establishment> {
    const response = await apiService.post<ApiResponse<Establishment>>('/establishments', data);
    return response.data.data;
  },

  /**
   * Atualizar estabelecimento
   */
  async updateEstablishment(id: number, data: Partial<Establishment>): Promise<Establishment> {
    const response = await apiService.patch<ApiResponse<Establishment>>(
      `/establishments/${id}`,
      data
    );
    return response.data.data;
  },

  /**
   * Remover estabelecimento
   */
  async deleteEstablishment(id: number): Promise<{ message: string }> {
    const response = await apiService.delete<ApiResponse<{ message: string }>>(
      `/establishments/${id}`
    );
    return response.data.data;
  },
};
