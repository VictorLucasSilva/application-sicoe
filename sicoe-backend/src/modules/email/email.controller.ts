import { Controller, Get, Query } from '@nestjs/common';

import { EmailService } from './email.service';
import { FilterEmailDto } from './dto/filter-email.dto';
import { Email } from './entities/email.entity';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}


  @Get('types')
  async findAllTypes(): Promise<string[]> {
    return this.emailService.findAllTypes();
  }


  @Get('subjects')
  async findAllSubjects(): Promise<string[]> {
    return this.emailService.findAllSubjects();
  }


  @Get('destinations')
  async findAllDestinations(): Promise<string[]> {
    return this.emailService.findAllDestinations();
  }


  @Get()
  async findAll(@Query() filterDto: FilterEmailDto): Promise<{
    data: Email[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.emailService.findAll(filterDto);
  }
}
