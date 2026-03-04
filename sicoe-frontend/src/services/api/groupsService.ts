import api from './axios.config';

export interface Group {
  id: number;
  nmGroup: string;
  tsCreation: string;
  tsUpdated: string;
}


export const groupsService = {
  
  async getAll(): Promise<{ data: Group[] }> {
    const response = await api.get<{ success: boolean; data: Group[] }>('/groups');
    return { data: response.data.data || [] };
  },
};
