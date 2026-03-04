import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Establishment } from './entities/establishment.entity';
import { EstabDocument } from './entities/estab-document.entity';
import { EstabAttachment } from './entities/estab-attachment.entity';
import { EstabRegion } from './entities/estab-region.entity';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { FilterEstablishmentDto } from './dto/filter-establishment.dto';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import {
  StatsResponseDto,
  RegionStatsDto,
  DocumentStatusDto
} from './dto/stats-response.dto';
import {
  EstablishmentDetailsDto,
  PendingDocumentDto,
  ResponsibleDto,
  DocumentWithAttachmentsDto,
  AttachmentDto,
} from './dto/document-status.dto';

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentRepository: Repository<Establishment>,
    @InjectRepository(EstabDocument)
    private readonly documentRepository: Repository<EstabDocument>,
    @InjectRepository(EstabAttachment)
    private readonly attachmentRepository: Repository<EstabAttachment>,
    @InjectRepository(EstabRegion)
    private readonly regionRepository: Repository<EstabRegion>,
  ) {}

  
  async findAll(filterDto: FilterEstablishmentDto): Promise<{
    data: Establishment[];
    total: number;
    page: number;
    limit: number;
  }> {
    const {
      name,
      code,
      regionId,
      stateId,
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'DESC',
    } = filterDto;

    const query = this.establishmentRepository
      .createQueryBuilder('establishment')
      .leftJoinAndSelect('establishment.region', 'region')
      .leftJoinAndSelect('establishment.state', 'state')
      .leftJoinAndSelect('establishment.users', 'user')
      .leftJoinAndSelect('establishment.units', 'unit')
      .leftJoinAndSelect('establishment.documents', 'document');

    
    if (name) {
      query.andWhere('establishment.nmEstablishment ILIKE :name', {
        name: `%${name}%`,
      });
    }

    if (code) {
      query.andWhere('establishment.sqEstablishment ILIKE :code', {
        code: `%${code}%`,
      });
    }

    if (regionId) {
      query.andWhere('establishment.fkRegion = :regionId', { regionId });
    }

    if (stateId) {
      query.andWhere('establishment.fkState = :stateId', { stateId });
    }

    
    query.orderBy(`establishment.${sortBy}`, sortOrder);

    
    const skip = (page - 1) * limit;
    query.skip(skip).take(limit);

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  
  async findOne(id: number): Promise<Establishment> {
    const establishment = await this.establishmentRepository.findOne({
      where: { id },
      relations: ['region', 'state', 'users', 'units', 'documents'],
    });

    if (!establishment) {
      throw new NotFoundException(
        `Estabelecimento com ID ${id} não encontrado`,
      );
    }

    return establishment;
  }

  
  async create(
    createEstablishmentDto: CreateEstablishmentDto,
  ): Promise<Establishment> {
    const { sqEstablishment } = createEstablishmentDto;

    
    const existingEstablishment = await this.establishmentRepository.findOne({
      where: { sqEstablishment },
    });

    if (existingEstablishment) {
      throw new ConflictException('Código de estabelecimento já está em uso');
    }

    const newEstablishment = this.establishmentRepository.create(
      createEstablishmentDto,
    );

    const savedEstablishment =
      await this.establishmentRepository.save(newEstablishment);

    return this.findOne(savedEstablishment.id);
  }

  
  async update(
    id: number,
    updateEstablishmentDto: UpdateEstablishmentDto,
  ): Promise<Establishment> {
    const establishment = await this.establishmentRepository.findOne({
      where: { id },
    });

    if (!establishment) {
      throw new NotFoundException(
        `Estabelecimento com ID ${id} não encontrado`,
      );
    }

    
    if (
      updateEstablishmentDto.sqEstablishment &&
      updateEstablishmentDto.sqEstablishment !== establishment.sqEstablishment
    ) {
      const existingEstablishment = await this.establishmentRepository.findOne({
        where: { sqEstablishment: updateEstablishmentDto.sqEstablishment },
      });

      if (existingEstablishment) {
        throw new ConflictException('Código de estabelecimento já está em uso');
      }
    }

    Object.assign(establishment, updateEstablishmentDto);
    await this.establishmentRepository.save(establishment);

    return this.findOne(id);
  }

  
  async remove(id: number): Promise<{ message: string }> {
    const establishment = await this.establishmentRepository.findOne({
      where: { id },
    });

    if (!establishment) {
      throw new NotFoundException(
        `Estabelecimento com ID ${id} não encontrado`,
      );
    }

    await this.establishmentRepository.remove(establishment);

    return {
      message: `Estabelecimento ${establishment.nmEstablishment} removido com sucesso`,
    };
  }

  /**
   * Retorna estatísticas gerais de estabelecimentos e documentos
   */
  async getStats(): Promise<StatsResponseDto> {
    // Total de estabelecimentos
    const total = await this.establishmentRepository.count();

    // Estabelecimentos por região
    const byRegionQuery = await this.establishmentRepository
      .createQueryBuilder('establishment')
      .leftJoin('establishment.region', 'region')
      .select('region.id', 'regionId')
      .addSelect('region.nmRegion', 'regionName')
      .addSelect('COUNT(establishment.id)', 'count')
      .where('region.id IS NOT NULL')
      .groupBy('region.id')
      .addGroupBy('region.nmRegion')
      .getRawMany();

    const byRegion: RegionStatsDto[] = byRegionQuery.map((item) => ({
      regionId: item.regionId,
      regionName: item.regionName,
      count: parseInt(item.count, 10),
    }));

    // Status dos documentos
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    const allAttachments = await this.attachmentRepository
      .createQueryBuilder('attachment')
      .leftJoinAndSelect('attachment.status', 'status')
      .getMany();

    const documentStatus: DocumentStatusDto = {
      regular: 0,
      invalid: 0,
      vencido: 0,
      aVencer: 0,
      emAnalise: 0,
    };

    allAttachments.forEach((attachment) => {
      // Primeiro verifica o status do attachment (Em Análise = 2, Rejeitado = 4, Expirado = 5)
      if (attachment.fkStatus === 2) {
        documentStatus.emAnalise++; // Em Análise
        return;
      }

      if (attachment.fkStatus === 4) {
        documentStatus.invalid++; // Rejeitado = Inválido
        return;
      }

      if (attachment.fkStatus === 5) {
        documentStatus.vencido++; // Expirado
        return;
      }

      if (!attachment.dtValidity) {
        documentStatus.emAnalise++;
        return;
      }

      const validityDate = new Date(attachment.dtValidity);

      if (validityDate < today) {
        documentStatus.vencido++;
      } else if (validityDate <= thirtyDaysFromNow) {
        documentStatus.aVencer++;
      } else {
        documentStatus.regular++;
      }
    });

    return {
      total,
      byRegion,
      documentStatus,
    };
  }

  /**
   * Retorna detalhes completos de um estabelecimento com documentos e responsáveis
   */
  async getEstablishmentDocuments(
    id: number,
  ): Promise<EstablishmentDetailsDto> {
    const establishment = await this.establishmentRepository.findOne({
      where: { id },
      relations: ['region', 'units', 'documents'],
    });

    if (!establishment) {
      throw new NotFoundException(
        `Estabelecimento com ID ${id} não encontrado`,
      );
    }

    // Buscar documentos com attachments
    const documents = await this.documentRepository
      .createQueryBuilder('document')
      .leftJoinAndSelect('document.attachments', 'attachment')
      .leftJoinAndSelect('document.establishments', 'establishment')
      .where('establishment.id = :id', { id })
      .getMany();

    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    const documentsWithStatus: DocumentWithAttachmentsDto[] = documents.map(
      (doc) => {
        let status = 'missing';
        let attachments: AttachmentDto[] = [];

        if (doc.attachments && doc.attachments.length > 0) {
          // Ordenar attachments por ID (descendente) para pegar o mais recente
          const sortedAttachments = [...doc.attachments].sort((a, b) => b.id - a.id);
          const latestAttachment = sortedAttachments[0];

          // Primeiro verifica o status do attachment (Em Análise = 2, Rejeitado = 4, Expirado = 5)
          if (latestAttachment.fkStatus === 2) {
            status = 'emAnalise'; // Em Análise
          } else if (latestAttachment.fkStatus === 4) {
            status = 'invalid'; // Rejeitado
          } else if (latestAttachment.fkStatus === 5) {
            status = 'vencido'; // Expirado
          } else if (latestAttachment.dtValidity) {
            const validityDate = new Date(latestAttachment.dtValidity);

            if (validityDate < today) {
              status = 'vencido';
            } else if (validityDate <= thirtyDaysFromNow) {
              status = 'aVencer';
            } else {
              status = 'regular';
            }
          } else {
            status = 'emAnalise';
          }

          // Retornar APENAS o último anexo (regra de negócio)
          attachments = [{
            id: latestAttachment.id,
            nmFile: latestAttachment.nmFile,
            dsFilePath: latestAttachment.dsFilePath,
            dtValidity: latestAttachment.dtValidity,
          }];
        }

        return {
          id: doc.id,
          nmDocument: doc.nmDocument,
          status,
          attachments,
        };
      },
    );

    // Extrair responsáveis dos campos txAttachedBy e txCheckedBy
    const responsibles: ResponsibleDto[] = [];

    if (establishment.txAttachedBy) {
      responsibles.push({
        name: establishment.txAttachedBy,
        email: 'N/A',
        role: 'Anexado por',
        uor: 'N/A',
      });
    }

    if (establishment.txCheckedBy) {
      responsibles.push({
        name: establishment.txCheckedBy,
        email: 'N/A',
        role: 'Verificado por',
        uor: 'N/A',
      });
    }

    return {
      establishment: {
        id: establishment.id,
        nmEstablishment: establishment.nmEstablishment,
        sqEstablishment: establishment.sqEstablishment,
        imageUrl: establishment.imageUrl || '',
        region: establishment.region
          ? {
              id: establishment.region.id,
              nmRegion: establishment.region.nmRegion,
            }
          : null,
      },
      units: establishment.units.map((unit) => ({
        id: unit.id,
        nmUnit: unit.nmUnit,
        cnpj: 'N/A',
      })),
      documents: documentsWithStatus,
      responsibles,
    };
  }

  /**
   * Retorna apenas documentos pendentes de um estabelecimento
   */
  async getPendingDocuments(id: number): Promise<PendingDocumentDto[]> {
    const details = await this.getEstablishmentDocuments(id);
    const today = new Date();

    const pending: PendingDocumentDto[] = [];

    details.documents.forEach((doc) => {
      if (doc.status === 'missing') {
        pending.push({
          documentId: doc.id,
          documentName: doc.nmDocument,
          reason: 'missing',
          daysUntilExpiration: null,
        });
      } else if (doc.status === 'vencido' || doc.status === 'aVencer') {
        const latestAttachment = doc.attachments[doc.attachments.length - 1];
        const validityDate = new Date(latestAttachment.dtValidity);
        const daysUntilExpiration = Math.ceil(
          (validityDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
        );

        pending.push({
          documentId: doc.id,
          documentName: doc.nmDocument,
          reason: doc.status === 'vencido' ? 'expired' : 'expiring_soon',
          daysUntilExpiration,
        });
      }
    });

    return pending;
  }

  /**
   * Faz upload de um anexo de documento para um estabelecimento
   */
  async uploadAttachment(
    establishmentId: number,
    createDto: CreateAttachmentDto,
    file: Express.Multer.File,
  ): Promise<EstabAttachment> {
    // 1. Validar estabelecimento existe
    const establishment = await this.establishmentRepository.findOne({
      where: { id: establishmentId },
    });

    if (!establishment) {
      throw new NotFoundException('Estabelecimento não encontrado');
    }

    // 2. Validar documento existe
    const document = await this.documentRepository.findOne({
      where: { id: createDto.documentId },
    });

    if (!document) {
      throw new NotFoundException('Tipo de documento não encontrado');
    }

    // 3. Validar data de validade é futura
    if (new Date(createDto.dtValidity) < new Date()) {
      throw new BadRequestException('Data de validade deve ser futura');
    }

    // 4. Criar registro no banco
    // Extrair apenas a parte relativa do path (media/arquivo.pdf)
    const relativePath = file.path.replace(/\\/g, '/').split('/').slice(-2).join('/');

    const attachment = this.attachmentRepository.create({
      fkDocument: createDto.documentId,
      fkStatus: 2, // Status "Em Análise" (id=2) ao criar novo anexo
      nmFile: file.originalname,
      dsFilePath: relativePath, // Apenas "media/arquivo.pdf"
      dtValidity: new Date(createDto.dtValidity),
      txComments: createDto.txComments,
      tsAttached: new Date(),
    });

    const savedAttachment = await this.attachmentRepository.save(attachment);

    // Retornar com relacionamento de documento
    const attachmentWithDocument = await this.attachmentRepository.findOne({
      where: { id: savedAttachment.id },
      relations: ['document'],
    });

    if (!attachmentWithDocument) {
      throw new NotFoundException('Anexo não encontrado após salvamento');
    }

    return attachmentWithDocument;
  }
}
