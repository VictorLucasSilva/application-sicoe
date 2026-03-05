import { apiService } from './axios.config';
import type { Audit, FilterAuditParams, PaginatedResponse, ApiResponse } from '@/types';

export interface AuditAction {
  id: number;
  nmAction: string;
  tsCreation: string;
  tsUpdated: string;
}

export interface AuditObject {
  id: number;
  nmObject: string;
  tsCreation: string;
  tsUpdated: string;
}

export const auditService = {

  async getAudits(params?: FilterAuditParams): Promise<PaginatedResponse<Audit>> {
    const response = await apiService.get<ApiResponse<PaginatedResponse<Audit>>>('/audit', {
      params,
    });
    return response.data.data;
  },


  async getActions(): Promise<{ data: AuditAction[] }> {
    const response = await apiService.get<ApiResponse<AuditAction[]>>('/audit/actions');
    return { data: response.data.data || [] };
  },


  async getObjects(): Promise<{ data: AuditObject[] }> {
    const response = await apiService.get<ApiResponse<AuditObject[]>>('/audit/objects');
    return { data: response.data.data || [] };
  },


  async getLogins(): Promise<{ data: string[] }> {
    const response = await apiService.get<ApiResponse<string[]>>('/audit/logins');
    return { data: response.data.data || [] };
  },
};
