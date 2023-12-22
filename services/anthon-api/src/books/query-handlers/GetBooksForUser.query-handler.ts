import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { InternalError } from 'src/common/exceptions';

import { BooksRepository } from '../books.repository';
import { GetBooksForUserQuery } from '../queries';

@QueryHandler(GetBooksForUserQuery)
export class GetBooksForUserQueryHandler
  implements IQueryHandler<GetBooksForUserQuery>
{
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(query: GetBooksForUserQuery) {
    try {
      const { userId } = query;

      const books = await this.booksRepository.GetBooksByUserId(userId);

      return books;
    } catch (error) {
      throw new InternalError();
    }
  }
}
