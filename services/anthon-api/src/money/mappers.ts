import { SubscriptionDuration, UserSubscription } from 'src/graphql.schema';
import { Subscription } from './models';

export const subscriptionMapper = {
  mapToGraphql: (subscription: Subscription): UserSubscription => ({
    ...subscription,
    type: subscription.type as SubscriptionDuration,
    createdAt: subscription.createdAt.toISOString(),
    updatedAt: subscription.updatedAt.toISOString(),
    subscriptionTransactions: subscription.subscriptionTransactions.map(
      (transaction) => ({
        ...transaction,
        createdAt: transaction.createdAt.toISOString(),
        updatedAt: transaction.updatedAt.toISOString(),
      }),
    ),
  }),
};
