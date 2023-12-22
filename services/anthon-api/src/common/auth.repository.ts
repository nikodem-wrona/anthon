import { Injectable } from '@nestjs/common';

import { DatabaseClient } from 'src/database/database.client';

import { UserRole } from 'src/common/types';
import { User } from 'src/users/models';

export type CreateUserPayload = {
  email: string;
};

export type UpdateUserPayload = {
  id: string;
  email?: string;
  role?: UserRole;
};

export type CreateApiKeyPayload = {
  userId: string;
  key: string;
};

@Injectable()
export class AuthRepository {
  constructor(private databaseClient: DatabaseClient) {}

  public async GetUserByApiKey(key: string): Promise<User | undefined> {
    const apiKey = await this.databaseClient.apiKey.findUnique({
      where: {
        key,
      },
    });

    if (!apiKey) {
      return undefined;
    }

    const { userId } = apiKey;

    return this.databaseClient.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
