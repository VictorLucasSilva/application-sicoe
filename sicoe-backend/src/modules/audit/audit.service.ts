import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';

import { Audit } from './entities/audit.entity';
import { AudAction } from './entities/aud-action.entity';
import { AudObject } from './entities/aud-object.entity';
import { CreateAuditDto } from './dto/create-audit.dto';
import { FilterAuditDto } from './dto/filter-audit.dto';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(Audit)
    private readonly auditRepository: Repository<Audit>,
    @InjectRepository(AudAction)
    private readonly audActionRepository: Repository<AudAction>,
    @InjectRepository(AudObject)
    private readonly audObjectRepository: Repository<AudObject>,
  ) {}

  /**
   * Listar logs de auditoria com filtros e paginação
   */
  async findAll(filterDto: FilterAuditDto): Promise<{
    data: Audit[];
    total: number;
    page: number;
    limit: number;
  }> {
    const {
      search,
      login,
      profile,
      profiles,
      actionId,
      actions,
      objectId,
      objects,
      userId,
      startDate,
      endDate,
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'DESC',
    } = filterDto;

    const query = this.auditRepository
      .createQueryBuilder('audit')
      .leftJoinAndSelect('audit.action', 'action')
      .leftJoinAndSelect('audit.object', 'object');

    // Busca global em múltiplas colunas (barra de pesquisa)
    if (search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('audit.txLogin ILIKE :search', { search: `%${search}%` })
            .orWhere('audit.txProfile ILIKE :search', { search: `%${search}%` })
            .orWhere('action.nmAction ILIKE :search', { search: `%${search}%` })
            .orWhere('object.nmObject ILIKE :search', { search: `%${search}%` })
            .orWhere('CAST(audit.id AS TEXT) ILIKE :search', { search: `%${search}%` });
        }),
      );
    }

    // Filtros
    if (login) {
      query.andWhere('audit.txLogin ILIKE :login', { login: `%${login}%` });
    }

    if (profile) {
      query.andWhere('audit.txProfile ILIKE :profile', {
        profile: `%${profile}%`,
      });
    }

    // Filtro por múltiplos perfis (IDs da tabela Group)
    if (profiles && profiles.length > 0) {
      // Buscar os nomes dos grupos pelos IDs
      const groups = await this.audActionRepository.manager
        .getRepository('Group')
        .createQueryBuilder('group')
        .where('group.id IN (:...ids)', { ids: profiles })
        .getMany();

      const groupNames = groups.map(g => g.nmGroup);
      if (groupNames.length > 0) {
        query.andWhere('audit.txProfile IN (:...profileNames)', { profileNames: groupNames });
      }
    }

    if (actionId) {
      query.andWhere('audit.fkAction = :actionId', { actionId });
    }

    // Filtro por múltiplas ações
    if (actions && actions.length > 0) {
      query.andWhere('action.nmAction IN (:...actions)', { actions });
    }

    if (objectId) {
      query.andWhere('audit.fkObject = :objectId', { objectId });
    }

    // Filtro por múltiplos objetos
    if (objects && objects.length > 0) {
      query.andWhere('object.nmObject IN (:...objects)', { objects });
    }

    if (userId) {
      query.andWhere('audit.fkUser = :userId', { userId });
    }

    if (startDate) {
      query.andWhere('audit.tsCreation >= :startDate', {
        startDate: new Date(startDate),
      });
    }

    if (endDate) {
      query.andWhere('audit.tsCreation <= :endDate', {
        endDate: new Date(endDate + ' 23:59:59'),
      });
    }

    // Ordenação
    query.orderBy(`audit.${sortBy}`, sortOrder);

    // Paginação
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

  /**
   * Criar log de auditoria
   * Este método será usado pelo interceptor automaticamente
   */
  async create(createAuditDto: CreateAuditDto): Promise<Audit> {
    const newAudit = this.auditRepository.create(createAuditDto);
    return this.auditRepository.save(newAudit);
  }

  /**
   * Listar todas as ações disponíveis
   */
  async findAllActions(): Promise<AudAction[]> {
    return this.audActionRepository.find({
      order: { nmAction: 'ASC' },
    });
  }

  /**
   * Listar todos os objetos disponíveis
   */
  async findAllObjects(): Promise<AudObject[]> {
    return this.audObjectRepository.find({
      order: { nmObject: 'ASC' },
    });
  }

  /**
   * Listar todos os logins únicos
   */
  async findAllLogins(): Promise<string[]> {
    const result = await this.auditRepository
      .createQueryBuilder('audit')
      .select('DISTINCT audit.txLogin', 'login')
      .orderBy('audit.txLogin', 'ASC')
      .getRawMany();

    return result.map(r => r.login).filter(Boolean);
  }
}
