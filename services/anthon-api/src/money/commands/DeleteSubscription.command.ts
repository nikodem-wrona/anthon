export class DeleteSubscriptionCommand {
  constructor(
    public readonly subscriptionId: string,
    public readonly userId: string,
  ) {}
}
