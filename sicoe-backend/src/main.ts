import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { getHelmetConfig, getCorsConfig } from './config/security.config';
// TODO: Reabilitar quando implementar fluxo de login completo
// import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
// import { RolesGuard } from './common/guards/roles.guard';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Security middleware
  app.use(helmet(getHelmetConfig()));

  // CORS
  app.enableCors(getCorsConfig(configService));

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global guards (JWT + Roles)
  // TEMPORARIAMENTE DESABILITADO PARA TESTES DE CRUD
  // TODO: Reabilitar após implementar fluxo de login completo
  const reflector = app.get(Reflector);
  // app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));

  // Global interceptors
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new TransformInterceptor()
  );

  // Global filters
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);

  console.log(`SICOE Backend running on: http://localhost:${port}/api/v1`);
  console.log(`Environment: ${configService.get<string>('NODE_ENV')}`);
}
bootstrap();
