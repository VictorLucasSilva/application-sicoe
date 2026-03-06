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

export interface UploadAttachmentResponse {
  id: number;
  nmFile: string;
  dsFilePath: string;
  dtValidity: string;
  tsAttached: string;
  document: {
    id: number;
    nmDocument: string;
  };
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

  async uploadAttachment(
    establishmentId: number,
    documentId: number,
    dtValidity: string,
    file: File,
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<UploadAttachmentResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentId', documentId.toString());
    formData.append('dtValidity', dtValidity);

    const response = await apiService.post<{ data: UploadAttachmentResponse }>(
      `/establishments/${establishmentId}/attachments`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      }
    );

    return response.data.data;
  },

  async getAttachments(establishmentId: number): Promise<DocumentAttachment[]> {
    const response = await apiService.get<{ data: DocumentAttachment[] }>(`/establishments/${establishmentId}/attachments`);
    return response.data.data;
  },

  getAttachmentDownloadUrl(establishmentId: number, attachmentId: number): string {
    return `${apiService.getBaseUrl()}/establishments/${establishmentId}/attachments/${attachmentId}/download`;
  },
};
