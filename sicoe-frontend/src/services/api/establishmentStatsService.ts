import { apiService } from './axios.config';

export interface RegionStats {
  regionId: number;
  regionName: string;
  count: number;
}

export interface DocumentStatus {
  regular: number;
  invalid: number;
  vencido: number;
  aVencer: number;
  emAnalise: number;
}

export interface StatsResponse {
  total: number;
  byRegion: RegionStats[];
  documentStatus: DocumentStatus;
}

export interface Establishment {
  id: number;
  nmEstablishment: string;
  sqEstablishment: string;
  imageUrl?: string;
  region?: {
    id: number;
    nmRegion: string;
  };
}

export interface EstablishmentUnit {
  id: number;
  nmUnit: string;
  cnpj: string;
}

export interface DocumentAttachment {
  id: number;
  nmFile: string;
  dsFilePath: string;
  dtValidity: Date;
}

export interface EstablishmentDocument {
  id: number;
  nmDocument: string;
  status: string;
  attachments: DocumentAttachment[];
}

export interface Responsible {
  name: string;
  email: string;
  role: string;
  uor: string;
}

export interface EstablishmentDetails {
  establishment: {
    id: number;
    nmEstablishment: string;
    sqEstablishment: string;
    imageUrl: string;
    region: {
      id: number;
      nmRegion: string;
    } | null;
  };
  units: EstablishmentUnit[];
  documents: EstablishmentDocument[];
  responsibles: Responsible[];
}

export interface PendingDocument {
  documentId: number;
  documentName: string;
  reason: string;
  daysUntilExpiration: number | null;
}

export const establishmentStatsService = {
  async getStats(): Promise<StatsResponse> {
    const response = await apiService.get<{ data: { data: StatsResponse } }>('/establishments/stats');
    return response.data.data.data;
  },

  async getEstablishmentsByRegion(regionId: number): Promise<Establishment[]> {
    const response = await apiService.get<{ data: { data: Establishment[] } }>('/establishments', {
      params: {
        regionId,
        limit: 100,
        sortBy: 'nmEstablishment',
        sortOrder: 'ASC'
      }
    });
    return response.data.data.data;
  },

  async getEstablishmentDocuments(id: number): Promise<EstablishmentDetails> {
    const response = await apiService.get<{ data: { data: EstablishmentDetails } }>(`/establishments/${id}/documents`);
    return response.data.data.data;
  },

  async getPendingDocuments(id: number): Promise<PendingDocument[]> {
    const response = await apiService.get<{ data: { data: { pending: PendingDocument[] } } }>(`/establishments/${id}/pending-documents`);
    return response.data.data.data.pending;
  },
};
