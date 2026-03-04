

import { api, type ApiResponse } from './api';

export interface Establishment {
  id: number;
  cd_establishment: string;
  nm_establishment: string;
  tp_establishment: string;
  tx_address: string;
  tx_city: string;
  tx_state: string;
  tx_zip_code: string;
  flg_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateEstablishmentDto {
  cd_establishment: string;
  nm_establishment: string;
  tp_establishment: string;
  tx_address?: string;
  tx_city?: string;
  tx_state?: string;
  tx_zip_code?: string;
  flg_active?: boolean;
}

export interface UpdateEstablishmentDto {
  cd_establishment?: string;
  nm_establishment?: string;
  tp_establishment?: string;
  tx_address?: string;
  tx_city?: string;
  tx_state?: string;
  tx_zip_code?: string;
  flg_active?: boolean;
}

export interface EstablishmentFilters {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  flg_active?: boolean;
  tp_establishment?: string;
}

export const establishmentService = {
  async getEstablishments(
    filters?: EstablishmentFilters
  ): Promise<ApiResponse<Establishment[]>> {
    return api.get('/establishments', { params: filters });
  },

  async getEstablishmentById(id: number): Promise<Establishment> {
    return api.get(`/establishments/${id}`);
  },

  async createEstablishment(
    data: CreateEstablishmentDto
  ): Promise<Establishment> {
    return api.post('/establishments', data);
  },

  async updateEstablishment(
    id: number,
    data: UpdateEstablishmentDto
  ): Promise<Establishment> {
    return api.patch(`/establishments/${id}`, data);
  },

  async deleteEstablishment(id: number): Promise<void> {
    return api.delete(`/establishments/${id}`);
  },
};
