import { Injectable } from '@nestjs/common';
import { DatabaseClient } from 'src/database/database.client';

export type CreateUserPayload = {
  email: string;
};

export interface IUserRepository {
  CreateUser(payload: CreateUserPayload): Promise<void>;
}

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(private databaseClient: DatabaseClient) {}

  public async CreateUser(payload: CreateUserPayload): Promise<void> {
    const { email } = payload;

    await this.databaseClient.user.create({
      data: {
        email,
      },
    });
  }
}
