import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import {
  GraphqlApiKeyGuard,
  CustomContext,
} from 'src/common/graphql-api-key.guard';

import { CreateBookDto } from './dto';
import { UserRoleGuard } from 'src/common/role.guard';
import { Book } from './models';
import { BooksService } from './books.service';
import { UserRole } from 'src/common/types';

@Resolver()
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(GraphqlApiKeyGuard, UserRoleGuard([UserRole.ADMIN, UserRole.USER]))
  @Mutation('createBook')
  async createBook(
    @Args('input') input: CreateBookDto,
    @Context() request: CustomContext,
  ): Promise<boolean> {
    const { title, author, isFinished } = input;
    const { user } = request;

    await this.booksService.CreateBook({
      title,
      author,
      isFinished,
      userId: user.id,
    });

    return true;
  }

  @UseGuards(GraphqlApiKeyGuard, UserRoleGuard([UserRole.ADMIN, UserRole.USER]))
  @Mutation('deleteBook')
  async deleteBook(
    @Args('bookId') bookId: string,
    @Context() request: CustomContext,
  ): Promise<boolean> {
    const { user } = request;
    await this.booksService.DeleteBook({
      bookId,
      userId: user.id,
    });

    return true;
  }

  @UseGuards(GraphqlApiKeyGuard, UserRoleGuard([UserRole.ADMIN, UserRole.USER]))
  @Query('getBooksForUser')
  async createApiKey(@Context() request: CustomContext): Promise<Book[]> {
    const { user } = request;

    const books = await this.booksService.GetBooksForUser({
      userId: user.id,
    });

    return books;
  }
}
