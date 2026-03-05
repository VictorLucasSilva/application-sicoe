import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';

import { User } from './entities/user.entity';
import { Group } from '../auth/entities/group.entity';
import { Establishment } from '../establishment/entities/establishment.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Establishment)
    private readonly establishmentRepository: Repository<Establishment>,
  ) {}


  async getLogins(): Promise<string[]> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .select('DISTINCT user.username', 'username')
      .orderBy('user.username', 'ASC')
      .getRawMany();

    return users.map(u => u.username);
  }


  async findAll(filterDto: FilterUserDto): Promise<{
    data: UserResponseDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    const {
      search,
      name,
      login,
      profile,
      profiles,
      statuses,
      emailStatuses,
      startDate,
      endDate,
      expirationStartDate,
      expirationEndDate,
      establishmentId,
      region,
      state,
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'DESC',
    } = filterDto;

    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.groups', 'group')
      .leftJoinAndSelect('user.establishments', 'establishment')
      .leftJoinAndSelect('establishment.region', 'region')
      .leftJoinAndSelect('establishment.state', 'state');


    if (search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('user.firstName ILIKE :search', { search: `%${search}%` })
            .orWhere('user.lastName ILIKE :search', { search: `%${search}%` })
            .orWhere('user.username ILIKE :search', { search: `%${search}%` })
            .orWhere('user.email ILIKE :search', { search: `%${search}%` })
            .orWhere('group.nmGroup ILIKE :search', { search: `%${search}%` })
            .orWhere('CAST(user.id AS TEXT) ILIKE :search', { search: `%${search}%` })
            .orWhere(
              `CASE WHEN user.flgActive = true THEN 'Ativo' ELSE 'Inativo' END ILIKE :search`,
              { search: `%${search}%` }
            )
            .orWhere(
              `CASE WHEN user.flgStatusEmail = true THEN 'Habilitado' ELSE 'Desabilitado' END ILIKE :search`,
              { search: `%${search}%` }
            );
        }),
      );
    }


    if (name) {
      query.andWhere(
        '(user.firstName ILIKE :name OR user.lastName ILIKE :name)',
        { name: `%${name}%` },
      );
    }

    if (login) {
      query.andWhere('user.username ILIKE :login', { login: `%${login}%` });
    }

    if (profile) {
      query.andWhere('group.nmGroup ILIKE :profile', {
        profile: `%${profile}%`,
      });
    }


    if (profiles && profiles.length > 0) {
      query.andWhere('group.id IN (:...profiles)', { profiles });
    }


    if (statuses && statuses.length > 0) {
      const statusConditions = statuses.map(status =>
        status === 'active' ? 'user.flgActive = true' : 'user.flgActive = false'
      );
      query.andWhere(`(${statusConditions.join(' OR ')})`);
    }


    if (emailStatuses && emailStatuses.length > 0) {
      const emailConditions = emailStatuses.map(status =>
        status === 'enabled' ? 'user.flgStatusEmail = true' : 'user.flgStatusEmail = false'
      );
      query.andWhere(`(${emailConditions.join(' OR ')})`);
    }


    if (startDate) {
      query.andWhere('user.tsCreation >= :startDate', { startDate });
    }

    if (endDate) {
      query.andWhere('user.tsCreation <= :endDate', { endDate });
    }


    if (expirationStartDate) {
      query.andWhere('user.dtExpiration >= :expirationStartDate', { expirationStartDate });
    }

    if (expirationEndDate) {
      query.andWhere('user.dtExpiration <= :expirationEndDate', { expirationEndDate });
    }

    if (establishmentId) {
      query.andWhere('establishment.id = :establishmentId', {
        establishmentId,
      });
    }

    if (region) {
      query.andWhere('region.nmRegion ILIKE :region', {
        region: `%${region}%`,
      });
    }

    if (state) {
      query.andWhere('(state.nmState ILIKE :state OR state.sgState ILIKE :state)', {
        state: `%${state}%`,
      });
    }


    query.orderBy(`user.${sortBy}`, sortOrder);


    const skip = (page - 1) * limit;
    query.skip(skip).take(limit);

    const [users, total] = await query.getManyAndCount();


    const data = users.map(
      (user) =>
        new UserResponseDto({
          id: user.id,
          numEmployee: user.numEmployee,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          flgActive: user.flgActive,
          flgStatusEmail: user.flgStatusEmail,
          dtExpiration: user.dtExpiration,
          tsLastLogin: user.tsLastLogin,
          tsCreation: user.tsCreation,
          tsUpdated: user.tsUpdated,
          groups: user.groups,
          establishments: user.establishments,
          fullName: `${user.firstName} ${user.lastName}`,
        }),
    );

    return {
      data,
      total,
      page,
      limit,
    };
  }


  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['groups', 'establishments'],
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return new UserResponseDto({
      id: user.id,
      numEmployee: user.numEmployee,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      flgActive: user.flgActive,
      flgStatusEmail: user.flgStatusEmail,
      dtExpiration: user.dtExpiration,
      tsLastLogin: user.tsLastLogin,
      tsCreation: user.tsCreation,
      tsUpdated: user.tsUpdated,
      groups: user.groups,
      establishments: user.establishments,
      fullName: `${user.firstName} ${user.lastName}`,
    });
  }


  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { username, email, password, firstName, lastName, numEmployee } =
      createUserDto;


    const existingUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException('Username já está em uso');
    }


    const existingEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (existingEmail) {
      throw new ConflictException('Email já está em uso');
    }


    const newUser = this.userRepository.create({
      username,
      email,
      password,
      firstName,
      lastName,
      numEmployee: numEmployee || '',
      flgActive: true,
      flgStatusEmail: false,
    });

    const savedUser = await this.userRepository.save(newUser);


    const userWithRelations = await this.userRepository.findOne({
      where: { id: savedUser.id },
      relations: ['groups', 'establishments'],
    });

    if (!userWithRelations) {
      throw new NotFoundException('Erro ao buscar usuário criado');
    }

    return new UserResponseDto({
      id: userWithRelations.id,
      numEmployee: userWithRelations.numEmployee,
      username: userWithRelations.username,
      firstName: userWithRelations.firstName,
      lastName: userWithRelations.lastName,
      email: userWithRelations.email,
      flgActive: userWithRelations.flgActive,
      flgStatusEmail: userWithRelations.flgStatusEmail,
      dtExpiration: userWithRelations.dtExpiration,
      tsLastLogin: userWithRelations.tsLastLogin,
      tsCreation: userWithRelations.tsCreation,
      tsUpdated: userWithRelations.tsUpdated,
      groups: userWithRelations.groups,
      establishments: userWithRelations.establishments,
      fullName: userWithRelations.fullName,
    });
  }


  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }


    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUser = await this.userRepository.findOne({
        where: { username: updateUserDto.username },
      });

      if (existingUser) {
        throw new ConflictException('Username já está em uso');
      }
    }


    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingEmail = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingEmail) {
        throw new ConflictException('Email já está em uso');
      }
    }


    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);


    const updatedUser = await this.userRepository.findOne({
      where: { id },
      relations: ['groups', 'establishments'],
    });

    if (!updatedUser) {
      throw new NotFoundException('Erro ao buscar usuário atualizado');
    }

    return new UserResponseDto({
      id: updatedUser.id,
      numEmployee: updatedUser.numEmployee,
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      flgActive: updatedUser.flgActive,
      flgStatusEmail: updatedUser.flgStatusEmail,
      dtExpiration: updatedUser.dtExpiration,
      tsLastLogin: updatedUser.tsLastLogin,
      tsCreation: updatedUser.tsCreation,
      tsUpdated: updatedUser.tsUpdated,
      groups: updatedUser.groups,
      establishments: updatedUser.establishments,
      fullName: updatedUser.fullName,
    });
  }


  async remove(id: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }


    user.flgActive = false;
    await this.userRepository.save(user);

    return { message: `Usuário ${user.username} desativado com sucesso` };
  }


  async addGroup(
    userId: number,
    groupId: number,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['groups'],
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException(`Grupo com ID ${groupId} não encontrado`);
    }


    const hasGroup = user.groups.some((g) => g.id === groupId);

    if (hasGroup) {
      throw new ConflictException('Usuário já possui este grupo');
    }


    user.groups.push(group);
    await this.userRepository.save(user);

    return {
      message: `Grupo "${group.nmGroup}" adicionado ao usuário ${user.username}`,
    };
  }


  async removeGroup(
    userId: number,
    groupId: number,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['groups'],
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException(`Grupo com ID ${groupId} não encontrado`);
    }


    const hasGroup = user.groups.some((g) => g.id === groupId);

    if (!hasGroup) {
      throw new BadRequestException('Usuário não possui este grupo');
    }


    user.groups = user.groups.filter((g) => g.id !== groupId);
    await this.userRepository.save(user);

    return {
      message: `Grupo "${group.nmGroup}" removido do usuário ${user.username}`,
    };
  }


  async addEstablishment(
    userId: number,
    establishmentId: number,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['establishments'],
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

    const establishment = await this.establishmentRepository.findOne({
      where: { id: establishmentId },
    });

    if (!establishment) {
      throw new NotFoundException(
        `Estabelecimento com ID ${establishmentId} não encontrado`,
      );
    }


    const hasEstablishment = user.establishments.some(
      (e) => e.id === establishmentId,
    );

    if (hasEstablishment) {
      throw new ConflictException('Usuário já possui este estabelecimento');
    }


    user.establishments.push(establishment);
    await this.userRepository.save(user);

    return {
      message: `Estabelecimento "${establishment.nmEstablishment}" adicionado ao usuário ${user.username}`,
    };
  }


  async removeEstablishment(
    userId: number,
    establishmentId: number,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['establishments'],
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

    const establishment = await this.establishmentRepository.findOne({
      where: { id: establishmentId },
    });

    if (!establishment) {
      throw new NotFoundException(
        `Estabelecimento com ID ${establishmentId} não encontrado`,
      );
    }


    const hasEstablishment = user.establishments.some(
      (e) => e.id === establishmentId,
    );

    if (!hasEstablishment) {
      throw new BadRequestException('Usuário não possui este estabelecimento');
    }


    user.establishments = user.establishments.filter(
      (e) => e.id !== establishmentId,
    );
    await this.userRepository.save(user);

    return {
      message: `Estabelecimento "${establishment.nmEstablishment}" removido do usuário ${user.username}`,
    };
  }
}
