import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { InternalError } from 'src/common/exceptions';

import { CreateBookCommand } from '../commands';
import { BooksRepository } from '../books.repository';
import { BookWithGivenTitleAlreadyExists } from '../exceptions';

@CommandHandler(CreateBookCommand)
export class CreateBookCommandHandler
  implements ICommandHandler<CreateBookCommand>
{
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(command: CreateBookCommand) {
    const { title, author, isFinished, userId } = command;

    const existingBook = await this.booksRepository.GetBookByTitle(title);

    if (existingBook) {
      throw new BookWithGivenTitleAlreadyExists(title);
    }

    try {
      await this.booksRepository.CreateBook({
        title,
        author,
        isFinished,
        userId,
      });
    } catch (error) {
      throw new InternalError();
    }
  }
}
