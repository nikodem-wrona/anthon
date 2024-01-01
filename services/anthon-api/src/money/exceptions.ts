export class SubscriptionWithGivenIdDoesNotExist extends Error {
  constructor(id: string) {
    super(`Subscription with id ${id} does not exist`);
  }
}

export class SubscriptionWithGivenIdDoesNotBelongToUser extends Error {
  constructor(id: string, userId: string) {
    super(
      `Subscription with id ${id} does not belong to user with id ${userId}`,
    );
  }
}
