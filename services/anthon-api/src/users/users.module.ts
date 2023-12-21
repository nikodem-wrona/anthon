import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from 'src/database';

import { UsersRepository } from './users.repository';
import { CommandHandlers } from './handlers';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [CqrsModule, DatabaseModule],
  controllers: [],
  providers: [UsersRepository, UsersResolver, UsersService, ...CommandHandlers],
})
export class UsersModule {}
