import { Injectable } from '@nestjs/common';

import { DatabaseClient } from 'src/database/database.client';
import { SubscriptionDuration, Subscription } from './models';

export type CreateSubscriptionPayload = {
  name: string;
  userId: string;
  type: SubscriptionDuration;
};

export type AddSubscriptionTransactionPayload = {
  subscriptionId: string;
  amount: number;
  currency: string;
};

@Injectable()
export class MoneyRepository {
  constructor(private databaseClient: DatabaseClient) {}

  public async CreateSubscription(
    payload: CreateSubscriptionPayload,
  ): Promise<void> {
    const { name, userId, type } = payload;

    await this.databaseClient.subscription.create({
      data: {
        name,
        userId,
        type,
      },
    });
  }

  public async GetSubscriptionById(
    subscriptionId: string,
  ): Promise<Subscription> {
    return this.databaseClient.subscription.findUnique({
      where: {
        id: subscriptionId,
      },
    });
  }

  public async GetUserSubscriptions(userId: string): Promise<Subscription[]> {
    const subscriptions = await this.databaseClient.subscription.findMany({
      where: {
        userId,
      },
      include: {
        subscriptionTransactions: true,
      },
    });

    return subscriptions;
  }

  public async DeleteUserSubscription(
    subscriptionId: string,
    userId: string,
  ): Promise<void> {
    const subscriptionTransactions =
      await this.databaseClient.subscriptionTransaction.findMany({
        where: {
          subscriptionId,
        },
      });

    if (subscriptionTransactions.length) {
      await this.databaseClient.subscriptionTransaction.deleteMany({
        where: {
          subscriptionId,
        },
      });
    }

    await this.databaseClient.subscription.deleteMany({
      where: {
        id: subscriptionId,
        userId,
      },
    });
  }

  public async AddSubscriptionTransaction(
    payload: AddSubscriptionTransactionPayload,
  ): Promise<void> {
    const { subscriptionId, amount, currency } = payload;

    await this.databaseClient.subscriptionTransaction.create({
      data: {
        amount,
        currency,
        subscriptionId,
      },
    });
  }
}
