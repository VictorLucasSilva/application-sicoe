import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Group } from '../auth/entities/group.entity';
import { Establishment } from '../establishment/entities/establishment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group, Establishment])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
