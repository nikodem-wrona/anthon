import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  DeleteSubscriptionCommand,
  CreateSubscriptionCommand,
  AddSubscriptionTransactionCommand,
} from './commands';
import { Subscription, SubscriptionDuration } from './models';
import { GetUserSubscriptionsQuery } from './queries';

type CreateSubscriptionPayload = {
  name: string;
  userId: string;
  type: SubscriptionDuration;
};

type DeleteSubscriptionPayload = {
  subscriptionId: string;
  userId: string;
};

type AddSubscriptionTransactionPayload = {
  subscriptionId: string;
  userId: string;
  amount: number;
  currency: string;
};

type GetUserSubscriptionsPayload = {
  userId: string;
};

@Injectable()
export class MoneyService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public async CreateSubscription(
    payload: CreateSubscriptionPayload,
  ): Promise<void> {
    const { name, userId, type } = payload;
    const command = new CreateSubscriptionCommand(name, userId, type);
    await this.commandBus.execute(command);
  }

  public async DeleteSubscription(
    payload: DeleteSubscriptionPayload,
  ): Promise<void> {
    const { subscriptionId, userId } = payload;
    const command = new DeleteSubscriptionCommand(subscriptionId, userId);
    await this.commandBus.execute(command);
  }

  public async AddSubscriptionTransaction(
    payload: AddSubscriptionTransactionPayload,
  ): Promise<void> {
    const { userId, subscriptionId, amount, currency } = payload;
    const command = new AddSubscriptionTransactionCommand(
      subscriptionId,
      userId,
      amount,
      currency,
    );

    await this.commandBus.execute(command);
  }

  public async GetUserSubscriptions(
    payload: GetUserSubscriptionsPayload,
  ): Promise<Subscription[]> {
    const { userId } = payload;
    const query = new GetUserSubscriptionsQuery(userId);

    const subscriptions = await this.queryBus.execute<
      GetUserSubscriptionsQuery,
      Subscription[]
    >(query);

    return subscriptions;
  }
}
