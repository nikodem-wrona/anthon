import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Axios } from 'axios';

import { AppConfiguration } from 'src/common/types';

@Injectable()
export class WhisperClient {
  private httpClient: Axios;

  constructor(private readonly configService: ConfigService<AppConfiguration>) {
    this.httpClient = new Axios({
      baseURL: configService.get('WHISPER_API_URL'),
    });
  }

  async TranscribeAudio(audio: Buffer): Promise<string> {
    const response = await this.httpClient.post('/transcribe', audio, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });

    return response.data;
  }
}
