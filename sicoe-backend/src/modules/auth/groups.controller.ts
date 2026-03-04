import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';

@Controller('groups')
export class GroupsController {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  
  @Get()
  async findAll(): Promise<Group[]> {
    return this.groupRepository.find({
      order: { nmGroup: 'ASC' },
    });
  }
}
