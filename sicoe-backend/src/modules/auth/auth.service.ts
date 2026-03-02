import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Gera tokens JWT (access e refresh)
   */
  private generateTokens(user: User): { accessToken: string; refreshToken: string; expiresIn: number } {
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.groups.map((group) => group.nmGroup),
    };

    // Access token (1 hora)
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });

    // Refresh token (7 dias)
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 3600, // 1 hora em segundos
    };
  }

  /**
   * Valida as credenciais do usuário
   */
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'flgActive'],
      relations: ['groups', 'establishments'],
    });

    if (!user) {
      return null;
    }

    if (!user.flgActive) {
      throw new UnauthorizedException('Usuário inativo');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  /**
   * Realiza login e gera token JWT
   */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { username, password } = loginDto;

    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Atualizar último login
    await this.userRepository.update(user.id, {
      tsLastLogin: new Date(),
    });

    // Gerar tokens JWT
    const { accessToken, refreshToken, expiresIn } = this.generateTokens(user);

    // Preparar resposta sem o password
    const userResponse = new UserResponseDto({
      id: user.id,
      numEmployee: user.numEmployee,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      flgActive: user.flgActive,
      flgStatusEmail: user.flgStatusEmail,
      dtExpiration: user.dtExpiration,
      tsLastLogin: new Date(),
      tsCreation: user.tsCreation,
      tsUpdated: user.tsUpdated,
      groups: user.groups,
      establishments: user.establishments,
    });

    return new AuthResponseDto(accessToken, expiresIn, userResponse, refreshToken);
  }

  /**
   * Registra novo usuário
   */
  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { username, email, password, firstName, lastName } = registerDto;

    // Verificar se username já existe
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException('Username já está em uso');
    }

    // Verificar se email já existe
    const existingEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (existingEmail) {
      throw new ConflictException('Email já está em uso');
    }

    try {
      // Criar novo usuário (password será hasheado automaticamente pelo @BeforeInsert)
      const newUser = this.userRepository.create({
        username,
        email,
        password, // Será hasheado pelo hook @BeforeInsert
        firstName,
        lastName,
        flgActive: true,
        flgStatusEmail: false,
        numEmployee: '', // Será preenchido depois
      });

      const savedUser = await this.userRepository.save(newUser);

      // Buscar usuário completo com relacionamentos
      const userWithRelations = await this.userRepository.findOne({
        where: { id: savedUser.id },
        relations: ['groups', 'establishments'],
      });

      if (!userWithRelations) {
        throw new InternalServerErrorException('Erro ao buscar usuário criado');
      }

      // Gerar tokens JWT
      const { accessToken, refreshToken, expiresIn } = this.generateTokens(userWithRelations);

      // Preparar resposta
      const userResponse = new UserResponseDto({
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
      });

      return new AuthResponseDto(accessToken, expiresIn, userResponse, refreshToken);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao registrar usuário');
    }
  }

  /**
   * Login com Microsoft EntraID
   * Cria ou autentica usuário baseado nos dados do EntraID
   */
  async loginWithEntraId(msalUser: any): Promise<AuthResponseDto> {
    const { email, name, accessToken: msalAccessToken } = msalUser;

    try {
      // Verificar se usuário já existe no sistema
      let user = await this.userRepository.findOne({
        where: { email },
        relations: ['groups', 'establishments'],
      });

      // Se usuário não existe, criar automaticamente
      if (!user) {
        // Extrair nome e sobrenome
        const nameParts = name ? name.split(' ') : ['User', 'EntraID'];
        const firstName = nameParts[0] || 'User';
        const lastName = nameParts.slice(1).join(' ') || 'EntraID';

        // Criar username baseado no email
        const username = email.split('@')[0];

        // Criar novo usuário
        const newUser = this.userRepository.create({
          username,
          email,
          password: Math.random().toString(36).substring(2, 15), // Password aleatório (não será usado)
          firstName,
          lastName,
          flgActive: true,
          flgStatusEmail: true,
          numEmployee: '',
        });

        user = await this.userRepository.save(newUser);

        // Buscar usuário completo com relacionamentos
        const userWithRelations = await this.userRepository.findOne({
          where: { id: user.id },
          relations: ['groups', 'establishments'],
        });

        if (!userWithRelations) {
          throw new InternalServerErrorException('Erro ao criar usuário via EntraID');
        }

        user = userWithRelations;
      }

      // Verificar se usuário está ativo
      if (!user.flgActive) {
        throw new UnauthorizedException('Usuário inativo');
      }

      // Atualizar último login
      await this.userRepository.update(user.id, {
        tsLastLogin: new Date(),
      });

      // Gerar tokens JWT
      const { accessToken, refreshToken, expiresIn } = this.generateTokens(user);

      // Preparar resposta
      const userResponse = new UserResponseDto({
        id: user.id,
        numEmployee: user.numEmployee,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        flgActive: user.flgActive,
        flgStatusEmail: user.flgStatusEmail,
        dtExpiration: user.dtExpiration,
        tsLastLogin: new Date(),
        tsCreation: user.tsCreation,
        tsUpdated: user.tsUpdated,
        groups: user.groups,
        establishments: user.establishments,
      });

      return new AuthResponseDto(accessToken, expiresIn, userResponse, refreshToken);
    } catch (error) {
      console.error('Erro no login com EntraID:', error);
      throw new InternalServerErrorException('Erro ao autenticar com EntraID');
    }
  }

  /**
   * Renova o access token usando um refresh token válido
   */
  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    try {
      // Verificar e decodificar o refresh token
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      // Buscar usuário atualizado no banco
      const user = await this.userRepository.findOne({
        where: { id: decoded.sub },
        relations: ['groups', 'establishments'],
      });

      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }

      if (!user.flgActive) {
        throw new UnauthorizedException('Usuário inativo');
      }

      // Gerar novo access token
      const payload = {
        sub: user.id,
        username: user.username,
        roles: user.groups.map((group) => group.nmGroup),
      };

      const accessToken = this.jwtService.sign(payload);
      const expiresIn = 3600; // 1 hora

      // Preparar resposta
      const userResponse = new UserResponseDto({
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
      });

      return new AuthResponseDto(accessToken, expiresIn, userResponse);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Refresh token expirado');
      }
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Refresh token inválido');
      }
      throw new UnauthorizedException('Erro ao renovar token');
    }
  }
}
