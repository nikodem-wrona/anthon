import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 } from 'uuid';

import { InternalError } from 'src/common/exceptions';

import { CreateApiKeyCommand } from '../commands';
import { UsersRepository } from '../users.repository';
import {
  UserIsNotAuthorizedToCreateApiKey,
  UserWithGivenIdNotFound,
} from '../exceptions';

@CommandHandler(CreateApiKeyCommand)
export class CreateApiKeyCommandHandler
  implements ICommandHandler<CreateApiKeyCommand>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  private GenerateApiKey(): string {
    return `key-${v4()}`;
  }

  private async CheckIfCreatorIsAllowedToCreateApiKey(
    userId: string,
  ): Promise<boolean> {
    const user = await this.usersRepository.GetUserByIdOrThrow(userId);

    if (!user) {
      throw new UserWithGivenIdNotFound(userId);
    }

    return user.role === 'ADMIN';
  }

  async execute(command: CreateApiKeyCommand) {
    const { userId, creatorId } = command;

    const creator = await this.usersRepository.GetUserByIdOrThrow(creatorId);
    const userToAddApiKey =
      await this.usersRepository.GetUserByIdOrThrow(userId);

    if (!creator) {
      throw new UserWithGivenIdNotFound(creatorId);
    }

    if (!userToAddApiKey) {
      throw new UserWithGivenIdNotFound(userId);
    }

    const isCreatorAllowedToCreateApiKey =
      await this.CheckIfCreatorIsAllowedToCreateApiKey(creatorId);

    if (!isCreatorAllowedToCreateApiKey) {
      throw new UserIsNotAuthorizedToCreateApiKey();
    }

    const key = this.GenerateApiKey();

    try {
      await this.usersRepository.CreateApiKeyForUser({
        key,
        userId,
      });
    } catch (error) {
      throw new InternalError();
    }
  }
}
