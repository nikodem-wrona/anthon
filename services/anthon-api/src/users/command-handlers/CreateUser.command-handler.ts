import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { InternalError } from 'src/common/exceptions';

import { CreateUserCommand } from '../commands';
import { UsersRepository } from '../users.repository';
import { UserWithGivenEmailAlreadyExistsError } from '../exceptions';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: CreateUserCommand) {
    const { email } = command;

    const existingUser = await this.usersRepository.GetUserByEmail(email);

    if (existingUser) {
      throw new UserWithGivenEmailAlreadyExistsError(email);
    }

    try {
      await this.usersRepository.CreateUser({
        email,
      });
    } catch (error) {
      throw new InternalError();
    }
  }
}
