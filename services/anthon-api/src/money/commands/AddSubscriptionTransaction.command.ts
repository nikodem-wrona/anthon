export class AddSubscriptionTransactionCommand {
  constructor(
    public readonly subscriptionId: string,
    public readonly userId: string,
    public readonly amount: number,
    public readonly currency: string,
  ) {}
}
