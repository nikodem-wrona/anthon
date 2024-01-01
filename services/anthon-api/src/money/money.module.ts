import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from 'src/database';

import { MoneyRepository } from './money.repository';
import { MoneyResolver } from './money.resolver';
import { MoneyService } from './money.service';

import { CommandHandlers } from './command-handlers';
import { QueryHandlers } from './query-handlers';
import { AuthRepository } from 'src/common/auth.repository';

@Module({
  imports: [CqrsModule, DatabaseModule],
  controllers: [],
  providers: [
    MoneyRepository,
    AuthRepository,
    MoneyResolver,
    MoneyService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class MoneyModule {}
