import { CreateSubscriptionCommandHandler } from './CreateSubscription.command-handler';
import { DeleteSubscriptionCommandHandler } from './DeleteSubscription.command-handler';
import { AddSubscriptionTransactionCommandHandler } from './AddSubscriptionTransaction.command-handler';

export const CommandHandlers = [
  CreateSubscriptionCommandHandler,
  DeleteSubscriptionCommandHandler,
  AddSubscriptionTransactionCommandHandler,
];
