import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateBookCommand, DeleteBookCommand } from './commands';
import { Book } from './models';
import { GetBooksForUserQuery } from './queries';

type CreateBookPayload = {
  title: string;
  author: string;
  userId: string;
  isFinished: boolean;
};

type DeleteBookPayload = {
  bookId: string;
  userId: string;
};

type GetBooksForUserPayload = {
  userId: string;
};

@Injectable()
export class BooksService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public async CreateBook(payload: CreateBookPayload): Promise<void> {
    const { title, author, userId, isFinished } = payload;
    const command = new CreateBookCommand(title, author, userId, isFinished);
    await this.commandBus.execute(command);
  }

  public async DeleteBook(payload: DeleteBookPayload): Promise<void> {
    const { bookId, userId } = payload;
    const command = new DeleteBookCommand(bookId, userId);
    await this.commandBus.execute(command);
  }

  public async GetBooksForUser(
    payload: GetBooksForUserPayload,
  ): Promise<Book[]> {
    const { userId } = payload;
    const query = new GetBooksForUserQuery(userId);

    const books = await this.queryBus.execute<GetBooksForUserQuery, Book[]>(
      query,
    );

    return books;
  }
}
