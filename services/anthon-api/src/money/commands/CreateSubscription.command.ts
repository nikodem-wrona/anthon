import { SubscriptionDuration } from '../models';

export class CreateSubscriptionCommand {
  constructor(
    public readonly name: string,
    public readonly userId: string,
    public readonly type: SubscriptionDuration,
  ) {}
}
