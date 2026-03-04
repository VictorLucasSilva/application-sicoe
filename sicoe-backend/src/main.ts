import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import * as path from 'path';
import { AppModule } from './app.module';
import { getHelmetConfig, getCorsConfig } from './config/security.config';



import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  
  app.use(helmet(getHelmetConfig()));

  
  app.enableCors(getCorsConfig(configService));


  app.setGlobalPrefix('api/v1');

  // Servir pasta media como arquivos estáticos
  // Usar process.cwd() ao invés de __dirname para funcionar corretamente com código transpilado
  const mediaPath = path.join(process.cwd(), 'media');
  console.log('📁 Serving static files from:', mediaPath);
  app.useStaticAssets(mediaPath, {
    prefix: '/media/',
  });


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

  
  
  
  const reflector = app.get(Reflector);
  

  
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new TransformInterceptor()
  );

  
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);

  console.log(`SICOE Backend running on: http://localhost:${port}/api/v1`);
  console.log(`Environment: ${configService.get<string>('NODE_ENV')}`);
}
bootstrap();
