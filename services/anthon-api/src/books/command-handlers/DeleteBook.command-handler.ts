import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteBookCommand } from '../commands';
import { BooksRepository } from '../books.repository';
import {
  BookWithGivenIdDoesNotBelongToUser,
  BookWithGivenIdNotFound,
} from '../exceptions';
import { InternalError } from 'src/common/exceptions';

@CommandHandler(DeleteBookCommand)
export class DeleteBookCommandHandler
  implements ICommandHandler<DeleteBookCommand>
{
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(command: DeleteBookCommand) {
    const { bookId, userId } = command;

    const book = await this.booksRepository.GetBookById(bookId);

    if (!book) {
      throw new BookWithGivenIdNotFound(bookId);
    }

    if (book.userId !== userId) {
      throw new BookWithGivenIdDoesNotBelongToUser(bookId, userId);
    }

    try {
      await this.booksRepository.DeleteBookById(bookId);
    } catch (error) {
      throw new InternalError();
    }
  }
}
