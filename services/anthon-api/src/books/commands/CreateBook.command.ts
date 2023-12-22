export class CreateBookCommand {
  constructor(
    public readonly title: string,
    public readonly author: string,
    public readonly userId: string,
    public readonly isFinished: boolean,
  ) {}
}
