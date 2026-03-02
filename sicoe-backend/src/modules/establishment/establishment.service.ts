import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Establishment } from './entities/establishment.entity';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { FilterEstablishmentDto } from './dto/filter-establishment.dto';

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentRepository: Repository<Establishment>,
  ) {}

  /**
   * Listar estabelecimentos com filtros e paginação
   */
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

    // Filtros
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

    // Ordenação
    query.orderBy(`establishment.${sortBy}`, sortOrder);

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
   * Buscar estabelecimento por ID
   */
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

  /**
   * Criar novo estabelecimento
   */
  async create(
    createEstablishmentDto: CreateEstablishmentDto,
  ): Promise<Establishment> {
    const { sqEstablishment } = createEstablishmentDto;

    // Verificar se código já existe
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

  /**
   * Atualizar estabelecimento
   */
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

    // Verificar se código está sendo alterado e já existe
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

  /**
   * Remover estabelecimento
   */
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
}
