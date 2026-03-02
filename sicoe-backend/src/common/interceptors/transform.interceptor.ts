import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    return next.handle().pipe(
      map((data) => ({
        success: true,
        statusCode: response.statusCode,
        message: this.getMessage(request.method, response.statusCode),
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }

  /**
   * Gera mensagem baseada no método HTTP e status code
   */
  private getMessage(method: string, statusCode: number): string {
    if (statusCode >= 200 && statusCode < 300) {
      const messages: Record<string, string> = {
        GET: 'Dados recuperados com sucesso',
        POST: 'Recurso criado com sucesso',
        PATCH: 'Recurso atualizado com sucesso',
        PUT: 'Recurso atualizado com sucesso',
        DELETE: 'Recurso removido com sucesso',
      };

      return messages[method] || 'Operação realizada com sucesso';
    }

    return 'Operação realizada';
  }
}
