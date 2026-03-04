import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';

import { Email } from './entities/email.entity';
import { CreateEmailDto } from './dto/create-email.dto';
import { FilterEmailDto } from './dto/filter-email.dto';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
  ) {}

  
  async findAll(filterDto: FilterEmailDto): Promise<{
    data: Email[];
    total: number;
    page: number;
    limit: number;
  }> {
    const {
      search,
      type,
      types,
      object,
      subject,
      subjects,
      destination,
      sent,
      statuses,
      startDate,
      endDate,
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'DESC',
    } = filterDto;

    const query = this.emailRepository.createQueryBuilder('email');

    
    if (search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('email.tpEmail ILIKE :search', { search: `%${search}%` })
            .orWhere('email.txSubject ILIKE :search', { search: `%${search}%` })
            .orWhere('email.txDestination ILIKE :search', { search: `%${search}%` })
            .orWhere('email.txObject ILIKE :search', { search: `%${search}%` })
            .orWhere('CAST(email.id AS TEXT) ILIKE :search', { search: `%${search}%` })
            .orWhere(
              `CASE
                WHEN email.flgSent = true THEN 'Enviado'
                WHEN email.txError IS NOT NULL THEN 'Falhou'
                ELSE 'Pendente'
              END ILIKE :search`,
              { search: `%${search}%` }
            );
        }),
      );
    }

    
    if (type) {
      query.andWhere('email.tpEmail ILIKE :type', { type: `%${type}%` });
    }

    
    if (types && types.length > 0) {
      query.andWhere('email.tpEmail IN (:...types)', { types });
    }

    if (object) {
      query.andWhere('email.txObject ILIKE :object', { object: `%${object}%` });
    }

    if (subject) {
      query.andWhere('email.txSubject ILIKE :subject', { subject: `%${subject}%` });
    }

    
    if (subjects && subjects.length > 0) {
      query.andWhere('email.txSubject IN (:...subjects)', { subjects });
    }

    if (destination) {
      query.andWhere('email.txDestination ILIKE :destination', {
        destination: `%${destination}%`,
      });
    }

    if (sent !== undefined) {
      query.andWhere('email.flgSent = :sent', { sent });
    }

    
    if (statuses && statuses.length > 0) {
      const statusConditions = statuses.map(status => {
        if (status === 'sent') return 'email.flgSent = true';
        if (status === 'pending') return 'email.flgSent = false AND email.txError IS NULL';
        if (status === 'failed') return 'email.flgSent = false AND email.txError IS NOT NULL';
        return '';
      }).filter(Boolean);

      if (statusConditions.length > 0) {
        query.andWhere(`(${statusConditions.join(' OR ')})`);
      }
    }

    if (startDate) {
      query.andWhere('email.tsCreation >= :startDate', {
        startDate: new Date(startDate),
      });
    }

    if (endDate) {
      query.andWhere('email.tsCreation <= :endDate', {
        endDate: new Date(endDate + ' 23:59:59'),
      });
    }

    
    query.orderBy(`email.${sortBy}`, sortOrder);

    
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

  
  async create(createEmailDto: CreateEmailDto): Promise<Email> {
    const newEmail = this.emailRepository.create(createEmailDto);
    return this.emailRepository.save(newEmail);
  }

  
  async findAllTypes(): Promise<string[]> {
    const result = await this.emailRepository
      .createQueryBuilder('email')
      .select('DISTINCT email.tpEmail', 'type')
      .orderBy('email.tpEmail', 'ASC')
      .getRawMany();

    return result.map(r => r.type).filter(Boolean);
  }

  
  async findAllSubjects(): Promise<string[]> {
    const result = await this.emailRepository
      .createQueryBuilder('email')
      .select('DISTINCT email.txSubject', 'subject')
      .orderBy('email.txSubject', 'ASC')
      .getRawMany();

    return result.map(r => r.subject).filter(Boolean);
  }

  
  async findAllDestinations(): Promise<string[]> {
    const result = await this.emailRepository
      .createQueryBuilder('email')
      .select('DISTINCT email.txDestination', 'destination')
      .orderBy('email.txDestination', 'ASC')
      .getRawMany();

    return result.map(r => r.destination).filter(Boolean);
  }
}
