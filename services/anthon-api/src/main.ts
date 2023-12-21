import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { AppConfiguration } from './common/types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<AppConfiguration>);

  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get('PORT');

  await app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
bootstrap();
