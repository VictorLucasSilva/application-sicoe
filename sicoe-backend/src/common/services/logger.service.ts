import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerService implements NestLoggerService {
  private logger: winston.Logger;
  private context?: string;

  constructor(private configService: ConfigService) {
    const env = this.configService.get<string>('NODE_ENV') || 'local';
    const isProduction = env === 'production';


    const productionFormat = winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json(),
    );


    const developmentFormat = winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      winston.format.colorize(),
      winston.format.printf(({ timestamp, level, message, context, stack }) => {
        const contextStr = context ? `[${context}]` : '';
        const stackStr = stack ? `\n${stack}` : '';
        return `${timestamp} ${level} ${contextStr} ${message}${stackStr}`;
      }),
    );


    const transports: winston.transport[] = [

      new winston.transports.Console({
        format: isProduction ? productionFormat : developmentFormat,
      }),
    ];


    if (isProduction) {

      transports.push(
        new DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          maxFiles: '30d',
          maxSize: '20m',
          format: productionFormat,
        }),
      );


      transports.push(
        new DailyRotateFile({
          filename: 'logs/combined-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '14d',
          maxSize: '20m',
          format: productionFormat,
        }),
      );


      transports.push(
        new DailyRotateFile({
          filename: 'logs/access-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '14d',
          maxSize: '20m',
          level: 'info',
          format: productionFormat,
        }),
      );
    }


    this.logger = winston.createLogger({
      level: isProduction ? 'info' : 'debug',
      format: isProduction ? productionFormat : developmentFormat,
      transports,
      exceptionHandlers: transports,
      rejectionHandlers: transports,
    });
  }

  setContext(context: string) {
    this.context = context;
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context: context || this.context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, {
      context: context || this.context,
      stack: trace,
    });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context: context || this.context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context: context || this.context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context: context || this.context });
  }


  logHttpAccess(
    method: string,
    url: string,
    statusCode: number,
    responseTime: number,
    userId?: number,
  ) {
    this.logger.info('HTTP Request', {
      context: 'HTTP',
      method,
      url,
      statusCode,
      responseTime: `${responseTime}ms`,
      userId: userId || 'anonymous',
    });
  }


  logAudit(
    action: string,
    resource: string,
    userId: number,
    details?: any,
  ) {
    this.logger.info('Audit Log', {
      context: 'AUDIT',
      action,
      resource,
      userId,
      details,
    });
  }
}
