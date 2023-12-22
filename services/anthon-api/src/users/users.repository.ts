import { Injectable } from '@nestjs/common';

import { DatabaseClient } from 'src/database/database.client';

import { User } from './models';
import {
  UserWithGivenApiKeyNotFound,
  UserWithGivenIdNotFound,
} from './exceptions';
import { UserRole } from 'src/common/types';

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
export class UsersRepository {
  constructor(private databaseClient: DatabaseClient) {}

  public async CreateUser(payload: CreateUserPayload): Promise<void> {
    const { email } = payload;

    await this.databaseClient.user.create({
      data: {
        email,
      },
    });
  }

  public async UpdateUser(
    payload: UpdateUserPayload,
  ): Promise<User | undefined> {
    const { id, email, role } = payload;

    return await this.databaseClient.user.update({
      where: {
        id,
      },
      data: {
        email,
        role,
      },
    });
  }

  public async GetUserByEmail(email: string): Promise<User> {
    return await this.databaseClient.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async GetUserByIdOrThrow(id: string): Promise<User> {
    const user = await this.databaseClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new UserWithGivenIdNotFound(id);
    }

    return user;
  }

  public async GetUserByApiKeyOrThrow(key: string): Promise<User> {
    const apiKey = await this.databaseClient.apiKey.findUnique({
      where: {
        key,
      },
    });

    if (!apiKey) {
      throw new UserWithGivenApiKeyNotFound();
    }

    const { userId } = apiKey;

    const user = await this.databaseClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UserWithGivenIdNotFound(userId);
    }

    return user;
  }

  public async CreateApiKeyForUser(
    payload: CreateApiKeyPayload,
  ): Promise<void> {
    const { userId, key } = payload;

    await this.databaseClient.apiKey.create({
      data: {
        userId,
        key,
      },
    });
  }
}
