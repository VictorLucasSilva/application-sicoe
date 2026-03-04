import { EstabDocument } from '../entities/estab-document.entity';
import { EstabAttachment } from '../entities/estab-attachment.entity';

export class AttachmentDto {
  id: number;
  nmFile: string;
  dsFilePath: string;
  dtValidity: Date;
}

export class DocumentWithAttachmentsDto {
  id: number;
  nmDocument: string;
  status: string;
  attachments: AttachmentDto[];
}

export class ResponsibleDto {
  name: string;
  email: string;
  role: string;
  uor: string;
}

export class EstablishmentDetailsDto {
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
  units: Array<{
    id: number;
    nmUnit: string;
    cnpj: string;
  }>;
  documents: DocumentWithAttachmentsDto[];
  responsibles: ResponsibleDto[];
}

export class PendingDocumentDto {
  documentId: number;
  documentName: string;
  reason: string;
  daysUntilExpiration: number | null;
}
