import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'SICOE Backend API - Sistema de Controle de Estabelecimentos';
  }
}
