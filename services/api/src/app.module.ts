import { Module } from '@nestjs/common';

import { RepositoryModule } from './repositories';
import { controllers } from './controllers';

@Module({
  imports: [RepositoryModule],
  controllers: [...controllers],
  providers: [],
})
export class AppModule {}
