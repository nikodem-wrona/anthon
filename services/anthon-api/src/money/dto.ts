import { SubscriptionDuration } from './models';

export class CreateSubscriptionDto {
  name: string;
  type: SubscriptionDuration;
}

export class AddSubscriptionTransactionDto {
  subscriptionId: string;
  amount: number;
  currency: string;
}

export class DeleteSubscriptionDto {
  subscriptionId: string;
}
