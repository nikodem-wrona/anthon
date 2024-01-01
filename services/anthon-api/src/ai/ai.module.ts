import { Module } from '@nestjs/common';

import { AuthRepository } from 'src/common/auth.repository';
import { DatabaseModule } from 'src/database';

import { WhisperClient } from './whisper.client';
import { AiController } from './ai.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AiController],
  providers: [AuthRepository, WhisperClient],
})
export class AiModule {}
