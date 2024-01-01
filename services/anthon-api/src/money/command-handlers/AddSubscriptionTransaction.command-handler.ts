import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { InternalError } from 'src/common/exceptions';

import { AddSubscriptionTransactionCommand } from '../commands';
import { MoneyRepository } from '../money.repository';
import {
  SubscriptionWithGivenIdDoesNotBelongToUser,
  SubscriptionWithGivenIdDoesNotExist,
} from '../exceptions';

@CommandHandler(AddSubscriptionTransactionCommand)
export class AddSubscriptionTransactionCommandHandler
  implements ICommandHandler<AddSubscriptionTransactionCommand>
{
  constructor(private readonly moneyRepository: MoneyRepository) {}

  async execute(command: AddSubscriptionTransactionCommand) {
    const { subscriptionId, currency, amount, userId } = command;

    const subscription =
      await this.moneyRepository.GetSubscriptionById(subscriptionId);

    if (!subscription) {
      throw new SubscriptionWithGivenIdDoesNotExist(subscriptionId);
    }

    if (subscription.userId !== userId) {
      throw new SubscriptionWithGivenIdDoesNotBelongToUser(
        subscriptionId,
        userId,
      );
    }

    try {
      await this.moneyRepository.AddSubscriptionTransaction({
        subscriptionId,
        amount,
        currency,
      });
    } catch (error) {
      throw new InternalError();
    }
  }
}
