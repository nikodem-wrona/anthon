import { Injectable } from '@nestjs/common';

import { DatabaseClient } from 'src/database/database.client';
import { Book } from './models';

export type CreateBookPayload = {
  title: string;
  author: string;
  userId: string;
  isFinished?: boolean;
};

@Injectable()
export class BooksRepository {
  constructor(private databaseClient: DatabaseClient) {}

  public async GetBookByTitle(title: string): Promise<Book | undefined> {
    return this.databaseClient.book.findUnique({
      where: {
        title,
      },
    });
  }

  public async CreateBook(payload: CreateBookPayload): Promise<void> {
    const { title, author, userId, isFinished } = payload;

    await this.databaseClient.book.create({
      data: {
        title,
        author,
        userId,
        isFinished,
      },
    });
  }

  public async GetBooksByUserId(userId: string): Promise<Book[]> {
    return this.databaseClient.book.findMany({
      where: {
        userId,
      },
    });
  }
}
