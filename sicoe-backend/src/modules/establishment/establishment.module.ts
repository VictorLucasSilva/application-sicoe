import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { EstablishmentController } from './establishment.controller';
import { EstablishmentService } from './establishment.service';
import { Establishment } from './entities/establishment.entity';
import { EstabDocument } from './entities/estab-document.entity';
import { EstabAttachment } from './entities/estab-attachment.entity';
import { EstabRegion } from './entities/estab-region.entity';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Establishment,
      EstabDocument,
      EstabAttachment,
      EstabRegion,
    ]),
    MulterModule.register({
      storage: require('multer').memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
      fileFilter: (_req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
          return cb(
            new Error('Apenas arquivos PDF são permitidos'),
            false,
          );
        }
        cb(null, true);
      },
    }),
    StorageModule,
  ],
  controllers: [EstablishmentController],
  providers: [EstablishmentService],
  exports: [EstablishmentService, TypeOrmModule],
})
export class EstablishmentModule {}
