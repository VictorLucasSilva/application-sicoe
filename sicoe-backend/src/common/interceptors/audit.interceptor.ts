import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audit } from '../../modules/audit/entities/audit.entity';
import { AudAction } from '../../modules/audit/entities/aud-action.entity';
import { AudObject } from '../../modules/audit/entities/aud-object.entity';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private actionMap: Map<string, number> = new Map();
  private objectMap: Map<string, number> = new Map();

  constructor(
    @InjectRepository(Audit)
    private readonly auditRepository: Repository<Audit>,
    @InjectRepository(AudAction)
    private readonly audActionRepository: Repository<AudAction>,
    @InjectRepository(AudObject)
    private readonly audObjectRepository: Repository<AudObject>,
  ) {
    this.loadMappings();
  }

  /**
   * Carrega os IDs de ações e objetos para o cache
   */
  private async loadMappings(): Promise<void> {
    try {
      const actions = await this.audActionRepository.find();
      const objects = await this.audObjectRepository.find();

      actions.forEach((action) => {
        this.actionMap.set(action.nmAction.toLowerCase(), action.id);
      });

      objects.forEach((object) => {
        this.objectMap.set(object.nmObject.toLowerCase(), object.id);
      });
    } catch (error) {
      console.error('Erro ao carregar mapeamentos de auditoria:', error);
    }
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, user, ip, headers } = request;

    // Apenas auditar operações de escrita (POST, PATCH, PUT, DELETE)
    if (!['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
      return next.handle();
    }

    // Ignorar rotas de autenticação
    if (url.includes('/auth/login') || url.includes('/auth/register')) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(async () => {
        try {
          await this.createAuditLog(request, method, url, user, ip, headers);
        } catch (error) {
          console.error('Erro ao criar log de auditoria:', error);
        }
      }),
    );
  }

  /**
   * Cria o log de auditoria
   */
  private async createAuditLog(
    request: any,
    method: string,
    url: string,
    user: any,
    ip: string,
    headers: any,
  ): Promise<void> {
    // Determinar ação baseada no método HTTP
    const actionName = this.getActionName(method);
    const fkAction = this.actionMap.get(actionName.toLowerCase());

    if (!fkAction) {
      console.warn(`Ação "${actionName}" não encontrada no banco de dados`);
      return;
    }

    // Determinar objeto baseado na URL
    const objectName = this.getObjectName(url);
    const fkObject = this.objectMap.get(objectName.toLowerCase());

    if (!fkObject) {
      console.warn(`Objeto "${objectName}" não encontrado no banco de dados`);
      return;
    }

    // Extrair informações do usuário
    const fkUser = user?.userId || null;
    const txLogin = user?.username || 'anonymous';
    const txProfile = user?.roles?.[0] || 'sem acesso';

    // Descrição da ação
    const txDescription = this.buildDescription(method, url, request.body);

    // IP e User Agent
    const txIpAddress = ip || request.connection?.remoteAddress || 'unknown';
    const txUserAgent = headers['user-agent'] || 'unknown';

    // Criar log de auditoria
    const auditLog = this.auditRepository.create({
      fkAction,
      fkObject,
      fkUser,
      txLogin,
      txProfile,
      txDescription,
      txIpAddress,
      txUserAgent,
    });

    await this.auditRepository.save(auditLog);
  }

  /**
   * Mapeia método HTTP para ação de auditoria
   */
  private getActionName(method: string): string {
    const methodMap: Record<string, string> = {
      POST: 'Criação',
      PATCH: 'Alteração',
      PUT: 'Alteração',
      DELETE: 'Deleção',
    };

    return methodMap[method] || 'Alteração';
  }

  /**
   * Mapeia URL para objeto de auditoria
   */
  private getObjectName(url: string): string {
    if (url.includes('/users')) return 'Usuário';
    if (url.includes('/establishments')) return 'Estabelecimento';
    if (url.includes('/attachment')) return 'Anexo';
    if (url.includes('/audit')) return 'Relatório';
    if (url.includes('/email')) return 'Relatório';

    return 'Usuário'; // Default
  }

  /**
   * Constrói descrição da ação
   */
  private buildDescription(method: string, url: string, body: any): string {
    const action = this.getActionName(method);
    const resource = url.split('/').filter(Boolean).pop();

    let description = `${action} em ${resource}`;

    if (body && Object.keys(body).length > 0) {
      const fields = Object.keys(body).slice(0, 3).join(', ');
      description += ` - Campos: ${fields}`;
    }

    return description;
  }
}
