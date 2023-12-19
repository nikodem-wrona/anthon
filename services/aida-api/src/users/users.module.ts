import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from 'src/database';

import { UsersRepository } from './users.repository';
import { CommandHandlers } from './handlers';

@Module({
  imports: [CqrsModule, DatabaseModule],
  controllers: [],
  providers: [UsersRepository, ...CommandHandlers],
})
export class UsersModule {}
