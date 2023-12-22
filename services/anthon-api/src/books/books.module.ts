import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from 'src/database';

import { BooksRepository } from './books.repository';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';

import { CommandHandlers } from './command-handlers';
import { QueryHandlers } from './query-handlers';
import { AuthRepository } from 'src/common/auth.repository';

@Module({
  imports: [CqrsModule, DatabaseModule],
  controllers: [],
  providers: [
    BooksRepository,
    AuthRepository,
    BooksResolver,
    BooksService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class BooksModule {}
