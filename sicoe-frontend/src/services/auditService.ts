

import { api, type ApiResponse } from './api';
import type { Audit, FilterAuditParams } from '@/types';

export const auditService = {
  async getAuditLogs(filters?: FilterAuditParams): Promise<ApiResponse<Audit[]>> {
    return api.get('/audit', { params: filters });
  },

  async getAuditLogById(id: number): Promise<Audit> {
    return api.get(`/audit/${id}`);
  },
};
