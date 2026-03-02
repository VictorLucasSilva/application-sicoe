/**
 * Serviço de Usuários
 * CRUD completo de usuários
 */

import { api, type ApiResponse } from './api';
import type { User } from '@/types';

export interface CreateUserDto {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  num_employee?: string;
  flg_active?: boolean;
  flg_email_notification?: boolean;
  dt_entry?: string;
  dt_expiration?: string;
  group_ids?: number[];
}

export interface UpdateUserDto {
  email?: string;
  first_name?: string;
  last_name?: string;
  num_employee?: string;
  flg_active?: boolean;
  flg_email_notification?: boolean;
  dt_entry?: string;
  dt_expiration?: string;
  group_ids?: number[];
}

export interface UserFilters {
  name?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  flg_active?: boolean;
  group_id?: number;
}

export const userService = {
  // Listar usuários com filtros e paginação
  async getUsers(filters?: UserFilters): Promise<ApiResponse<User[]>> {
    return api.get('/users', { params: filters });
  },

  // Buscar usuário por ID
  async getUserById(id: number): Promise<User> {
    return api.get(`/users/${id}`);
  },

  // Criar novo usuário
  async createUser(data: CreateUserDto): Promise<User> {
    return api.post('/users', data);
  },

  // Atualizar usuário
  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    return api.patch(`/users/${id}`, data);
  },

  // Deletar usuário
  async deleteUser(id: number): Promise<void> {
    return api.delete(`/users/${id}`);
  },

  // Adicionar estabelecimentos ao usuário
  async addEstablishments(
    userId: number,
    establishmentIds: number[]
  ): Promise<void> {
    return api.post(`/users/${userId}/establishments`, {
      establishment_ids: establishmentIds,
    });
  },

  // Remover estabelecimentos do usuário
  async removeEstablishments(
    userId: number,
    establishmentIds: number[]
  ): Promise<void> {
    return api.delete(`/users/${userId}/establishments`, {
      body: JSON.stringify({ establishment_ids: establishmentIds }),
    });
  },

  // Ativar/desativar usuário
  async toggleUserStatus(id: number, active: boolean): Promise<User> {
    return api.patch(`/users/${id}`, { flg_active: active });
  },
};
