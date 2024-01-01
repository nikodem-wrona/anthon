import {
  Subscription as DbSubscription,
  SubscriptionDuration as DbSubscriptionDuration,
  SubscriptionTransaction as DbSubscriptionTransaction,
} from '@prisma/client';

export class Subscription implements DbSubscription {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  type: DbSubscriptionDuration;
  name: string;
  subscriptionTransactions?: DbSubscriptionTransaction[];
}

export class SubscriptionTransaction implements DbSubscriptionTransaction {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  subscriptionId: string;
  subscription: Subscription;
  amount: number;
  currency: string;
}

export { DbSubscriptionDuration as SubscriptionDuration };
