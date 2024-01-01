import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { InternalError } from 'src/common/exceptions';

import { CreateSubscriptionCommand } from '../commands';
import { MoneyRepository } from '../money.repository';

@CommandHandler(CreateSubscriptionCommand)
export class CreateSubscriptionCommandHandler
  implements ICommandHandler<CreateSubscriptionCommand>
{
  constructor(private readonly moneyRepository: MoneyRepository) {}

  async execute(command: CreateSubscriptionCommand) {
    const { name, type, userId } = command;

    try {
      await this.moneyRepository.CreateSubscription({
        name,
        type,
        userId,
      });
    } catch (error) {
      throw new InternalError();
    }
  }
}
