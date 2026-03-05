import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { EstablishmentService } from './establishment.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { FilterEstablishmentDto } from './dto/filter-establishment.dto';
import { Establishment } from './entities/establishment.entity';
import { Roles } from '../../common/decorators/roles.decorator';
import { StatsResponseDto } from './dto/stats-response.dto';
import {
  EstablishmentDetailsDto,
  PendingDocumentDto,
} from './dto/document-status.dto';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UploadResponseDto } from './dto/upload-response.dto';

@Controller('establishments')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Get()
  async findAll(@Query() filterDto: FilterEstablishmentDto): Promise<{
    data: Establishment[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.establishmentService.findAll(filterDto);
  }


  @Get('stats')
  async getStats(): Promise<{ data: StatsResponseDto }> {
    const stats = await this.establishmentService.getStats();
    return { data: stats };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Establishment> {
    return this.establishmentService.findOne(id);
  }


  @Get(':id/documents')
  async getEstablishmentDocuments(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: EstablishmentDetailsDto }> {
    const details =
      await this.establishmentService.getEstablishmentDocuments(id);
    return { data: details };
  }


  @Get(':id/pending-documents')
  async getPendingDocuments(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: { pending: PendingDocumentDto[] } }> {
    const pending = await this.establishmentService.getPendingDocuments(id);
    return { data: { pending } };
  }


  @Post(':id/attachments')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  async uploadAttachment(
    @Param('id', ParseIntPipe) id: number,
    @Body() createDto: CreateAttachmentDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ data: UploadResponseDto }> {
    if (!file) {
      throw new BadRequestException('Arquivo não foi enviado');
    }

    const attachment = await this.establishmentService.uploadAttachment(
      id,
      createDto,
      file,
    );

    return {
      data: {
        id: attachment.id,
        nmFile: attachment.nmFile,
        dsFilePath: attachment.dsFilePath,
        dtValidity: attachment.dtValidity,
        tsAttached: attachment.tsAttached,
        document: {
          id: attachment.document.id,
          nmDocument: attachment.document.nmDocument,
        },
      },
    };
  }

  @Post()
  @Roles('Administrador')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createEstablishmentDto: CreateEstablishmentDto,
  ): Promise<Establishment> {
    return this.establishmentService.create(createEstablishmentDto);
  }


  @Patch(':id')
  @Roles('Administrador')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstablishmentDto: UpdateEstablishmentDto,
  ): Promise<Establishment> {
    return this.establishmentService.update(id, updateEstablishmentDto);
  }

  @Delete(':id')
  @Roles('Administrador')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.establishmentService.remove(id);
  }
}
