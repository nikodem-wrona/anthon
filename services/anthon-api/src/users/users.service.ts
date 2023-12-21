import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateUserDto, UpdateUserDto, CreateApiKeyDto } from './dto';
import {
  CreateUserCommand,
  UpdateUserCommand,
  CreateApiKeyCommand,
} from './commands';

@Injectable()
export class UsersService {
  constructor(private readonly commandBus: CommandBus) {}

  public async CreateUser(dto: CreateUserDto): Promise<void> {
    const { email } = dto;
    const command = new CreateUserCommand(email);
    await this.commandBus.execute(command);
  }

  public async UpdateUser(dto: UpdateUserDto): Promise<void> {
    const { id, email, role } = dto;
    const command = new UpdateUserCommand(id, email, role);
    await this.commandBus.execute(command);
  }

  public async CreateApiKey(
    creatorId: string,
    dto: CreateApiKeyDto,
  ): Promise<void> {
    const { userId } = dto;
    console.log({
      creatorId,
      userId,
    });

    const command = new CreateApiKeyCommand(userId, creatorId);
    await this.commandBus.execute(command);
  }
}
