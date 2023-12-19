import { Module } from '@nestjs/common';
import { DatabaseClient } from './database.client';

@Module({
  imports: [],
  controllers: [],
  providers: [DatabaseClient],
  exports: [DatabaseClient],
})
export class DatabaseModule {}
