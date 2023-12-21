export class CreateApiKeyCommand {
  constructor(
    public readonly userId: string,
    public readonly creatorId: string,
  ) {}
}
