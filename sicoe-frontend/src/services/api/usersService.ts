import { apiService } from './axios.config';
import type {
  User,
  FilterUserParams,
  PaginatedResponse,
  ApiResponse,
} from '@/types';

export const usersService = {
  /**
   * Listar todos os logins únicos
   */
  async getLogins(): Promise<{ data: string[] }> {
    const response = await apiService.get<ApiResponse<string[]>>('/users/logins');
    return { data: response.data.data };
  },

  /**
   * Listar usuários
   */
  async getUsers(params?: FilterUserParams): Promise<PaginatedResponse<User>> {
    const response = await apiService.get<ApiResponse<PaginatedResponse<User>>>('/users', {
      params,
    });
    return response.data.data;
  },

  /**
   * Buscar usuário por ID
   */
  async getUser(id: number): Promise<User> {
    const response = await apiService.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data;
  },

  /**
   * Criar usuário
   */
  async createUser(data: Partial<User>): Promise<User> {
    const response = await apiService.post<ApiResponse<User>>('/users', data);
    return response.data.data;
  },

  /**
   * Atualizar usuário
   */
  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const response = await apiService.patch<ApiResponse<User>>(`/users/${id}`, data);
    return response.data.data;
  },

  /**
   * Desativar usuário
   */
  async deleteUser(id: number): Promise<{ message: string }> {
    const response = await apiService.delete<ApiResponse<{ message: string }>>(`/users/${id}`);
    return response.data.data;
  },

  /**
   * Adicionar grupo ao usuário
   */
  async addGroup(userId: number, groupId: number): Promise<{ message: string }> {
    const response = await apiService.post<ApiResponse<{ message: string }>>(
      `/users/${userId}/groups`,
      { groupId }
    );
    return response.data.data;
  },

  /**
   * Remover grupo do usuário
   */
  async removeGroup(userId: number, groupId: number): Promise<{ message: string }> {
    const response = await apiService.delete<ApiResponse<{ message: string }>>(
      `/users/${userId}/groups/${groupId}`
    );
    return response.data.data;
  },

  /**
   * Adicionar estabelecimento ao usuário
   */
  async addEstablishment(userId: number, establishmentId: number): Promise<{ message: string }> {
    const response = await apiService.post<ApiResponse<{ message: string }>>(
      `/users/${userId}/establishments`,
      { establishmentId }
    );
    return response.data.data;
  },

  /**
   * Remover estabelecimento do usuário
   */
  async removeEstablishment(userId: number, establishmentId: number): Promise<{ message: string }> {
    const response = await apiService.delete<ApiResponse<{ message: string }>>(
      `/users/${userId}/establishments/${establishmentId}`
    );
    return response.data.data;
  },
};
