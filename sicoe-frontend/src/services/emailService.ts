/**
 * Serviço de Email
 * Logs de envio de emails
 */

import { api, type ApiResponse } from './api';
import type { Email, FilterEmailParams } from '@/types';

export const emailService = {
  async getEmailLogs(filters?: FilterEmailParams): Promise<ApiResponse<Email[]>> {
    return api.get('/email', { params: filters });
  },

  async getEmailLogById(id: number): Promise<Email> {
    return api.get(`/email/${id}`);
  },
};
