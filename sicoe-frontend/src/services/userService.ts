

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

  async getUsers(filters?: UserFilters): Promise<ApiResponse<User[]>> {
    return api.get('/users', { params: filters });
  },


  async getUserById(id: number): Promise<User> {
    return api.get(`/users/${id}`);
  },


  async createUser(data: CreateUserDto): Promise<User> {
    return api.post('/users', data);
  },


  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    return api.patch(`/users/${id}`, data);
  },


  async deleteUser(id: number): Promise<void> {
    return api.delete(`/users/${id}`);
  },


  async addEstablishments(
    userId: number,
    establishmentIds: number[]
  ): Promise<void> {
    return api.post(`/users/${userId}/establishments`, {
      establishment_ids: establishmentIds,
    });
  },


  async removeEstablishments(
    userId: number,
    establishmentIds: number[]
  ): Promise<void> {
    return api.delete(`/users/${userId}/establishments`, {
      body: JSON.stringify({ establishment_ids: establishmentIds }),
    });
  },


  async toggleUserStatus(id: number, active: boolean): Promise<User> {
    return api.patch(`/users/${id}`, { flg_active: active });
  },
};
