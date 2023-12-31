import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from 'src/database';

import { UsersRepository } from './users.repository';
import { CommandHandlers } from './command-handlers';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { AuthRepository } from 'src/common/auth.repository';

@Module({
  imports: [CqrsModule, DatabaseModule],
  controllers: [],
  providers: [
    UsersRepository,
    AuthRepository,
    UsersResolver,
    UsersService,
    ...CommandHandlers,
  ],
})
export class UsersModule {}
