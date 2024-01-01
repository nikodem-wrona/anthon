import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { InternalError } from 'src/common/exceptions';

import { DeleteSubscriptionCommand } from '../commands';
import { MoneyRepository } from '../money.repository';
import {
  SubscriptionWithGivenIdDoesNotExist,
  SubscriptionWithGivenIdDoesNotBelongToUser,
} from '../exceptions';

@CommandHandler(DeleteSubscriptionCommand)
export class DeleteSubscriptionCommandHandler
  implements ICommandHandler<DeleteSubscriptionCommand>
{
  constructor(private readonly moneyRepository: MoneyRepository) {}

  async execute(command: DeleteSubscriptionCommand) {
    const { subscriptionId, userId } = command;

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
      await this.moneyRepository.DeleteUserSubscription(subscriptionId, userId);
    } catch (error) {
      throw new InternalError();
    }
  }
}
