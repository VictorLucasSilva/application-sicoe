import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { EstablishmentController } from './establishment.controller';
import { EstablishmentService } from './establishment.service';
import { Establishment } from './entities/establishment.entity';
import { EstabDocument } from './entities/estab-document.entity';
import { EstabAttachment } from './entities/estab-attachment.entity';
import { EstabRegion } from './entities/estab-region.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Establishment,
      EstabDocument,
      EstabAttachment,
      EstabRegion,
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = path.join(process.cwd(), 'media');

          // Criar pasta se não existir
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }

          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          // Formato: {timestamp}-{nome-original}.pdf
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
          return cb(
            new Error('Apenas arquivos PDF são permitidos'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  ],
  controllers: [EstablishmentController],
  providers: [EstablishmentService],
  exports: [EstablishmentService, TypeOrmModule],
})
export class EstablishmentModule {}
