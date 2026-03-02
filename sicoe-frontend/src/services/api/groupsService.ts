import api from './axios.config';

export interface Group {
  id: number;
  nmGroup: string;
  tsCreation: string;
  tsUpdated: string;
}

/**
 * Service para gerenciar grupos/perfis
 */
export const groupsService = {
  /**
   * Listar todos os grupos/perfis
   */
  async getAll(): Promise<{ data: Group[] }> {
    const response = await api.get<{ success: boolean; data: Group[] }>('/groups');
    return { data: response.data.data || [] };
  },
};
