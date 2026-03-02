import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import type { Request, Response } from 'express';

/**
 * Request Logging Interceptor
 * Logs all HTTP requests for security auditing
 */
@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const startTime = Date.now();
    const { method, url, ip } = request;

    return next.handle().pipe(
      tap({
        next: () => {
          this.logRequest(request, response, startTime, null);
        },
        error: (error) => {
          this.logRequest(request, response, startTime, error);
        },
      }),
    );
  }

  /**
   * Log request details
   */
  private logRequest(
    req: Request,
    res: Response,
    startTime: number,
    error: Error | null,
  ): void {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      user: (req as any).user?.id || 'anonymous',
    };

    // Log based on status code
    if (statusCode >= 500) {
      console.error('[HTTP ERROR]', logData, error);
    } else if (statusCode >= 400) {
      console.warn('[HTTP WARN]', logData);
    } else {
      console.log('[HTTP]', logData);
    }

    // Log slow requests
    if (duration > 3000) {
      console.warn('[SLOW REQUEST]', {
        ...logData,
        threshold: '3000ms',
      });
    }
  }
}
