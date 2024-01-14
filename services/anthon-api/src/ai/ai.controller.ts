import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Express } from 'express';

import { UserRoleGuard } from 'src/common/role.guard';
import { UserRole } from 'src/common/types';
import { RestApiKeyGuard } from 'src/common/rest-api-key.guard';

import { WhisperClient } from './whisper.client';
import { KafkaService } from '../common/kafka/kafka.service';

@Controller('ai')
export class AiController {
  constructor(
    private readonly whisperClient: WhisperClient,
    private readonly kafkaService: KafkaService,
  ) {}

  @Post('transcribe')
  @UseGuards(RestApiKeyGuard, UserRoleGuard([UserRole.ADMIN]))
  @UseInterceptors(FileInterceptor('audio'))
  async transcribe(@UploadedFile() file: Express.Multer.File) {
    await this.kafkaService.SendMessage();
    const buffer = Buffer.from(file.buffer);
    const result = await this.whisperClient.TranscribeAudio(buffer);
    return result;
  }

  @Post('transcribe/v2')
  @UseGuards(RestApiKeyGuard, UserRoleGuard([UserRole.ADMIN]))
  async transcribeV2() {
    console.log('transcribeV2');

    await this.kafkaService.SendMessage();
  }
}
