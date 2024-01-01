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

@Controller('ai')
export class AiController {
  constructor(private readonly whisperClient: WhisperClient) {}

  @Post('transcribe')
  @UseGuards(RestApiKeyGuard, UserRoleGuard([UserRole.ADMIN]))
  @UseInterceptors(FileInterceptor('audio'))
  async transcribe(@UploadedFile() file: Express.Multer.File) {
    const buffer = Buffer.from(file.buffer);
    const result = await this.whisperClient.TranscribeAudio(buffer);
    return result;
  }
}
