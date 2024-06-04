import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Tax, TaxSchema, MoneyRepository } from './money';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:example@localhost:27017/anthon?authSource=admin',
    ),
    MongooseModule.forFeature([{ name: Tax.name, schema: TaxSchema }]),
  ],
  providers: [MoneyRepository],
  exports: [MoneyRepository],
})
export class RepositoryModule {}
