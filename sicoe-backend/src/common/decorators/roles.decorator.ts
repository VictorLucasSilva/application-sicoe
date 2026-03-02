import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Decorator para definir roles permitidos em uma rota
 * @param roles - Nomes dos grupos/roles permitidos
 * @example
 * @Roles('Administrador', 'Gerente Regional')
 * @Get('users')
 * async findAll() {}
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
