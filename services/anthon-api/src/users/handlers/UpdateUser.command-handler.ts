import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { InternalError } from 'src/common/exceptions';

import { UpdateUserCommand } from '../commands';
import { UsersRepository } from '../users.repository';
import { UserWithGivenIdNotFound } from '../exceptions';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: UpdateUserCommand) {
    const { id, email, role } = command;

    const existingUser = await this.usersRepository.GetUserByIdOrThrow(id);

    if (!existingUser) {
      throw new UserWithGivenIdNotFound(email);
    }

    try {
      await this.usersRepository.UpdateUser({
        id,
        email,
        role,
      });
    } catch (error) {
      throw new InternalError();
    }
  }
}
