import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import {
  CreateUserCommand,
  UpdateUserCommand,
  CreateApiKeyCommand,
} from './commands';
import { UserRole } from 'src/common/types';

type CreateUserPayload = {
  email: string;
};

type CreateApiKeyPayload = {
  userId: string;
  creatorId: string;
};

type UpdateUserPayload = {
  id: string;
  email: string;
  role: UserRole;
};

@Injectable()
export class UsersService {
  constructor(private readonly commandBus: CommandBus) {}

  public async CreateUser(payload: CreateUserPayload): Promise<void> {
    const { email } = payload;
    const command = new CreateUserCommand(email);
    await this.commandBus.execute(command);
  }

  public async UpdateUser(payload: UpdateUserPayload): Promise<void> {
    const { id, email, role } = payload;
    const command = new UpdateUserCommand(id, email, role);
    await this.commandBus.execute(command);
  }

  public async CreateApiKey(payload: CreateApiKeyPayload): Promise<void> {
    const { userId, creatorId } = payload;
    const command = new CreateApiKeyCommand(userId, creatorId);
    await this.commandBus.execute(command);
  }
}
