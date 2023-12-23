export class BookWithGivenTitleAlreadyExists extends Error {
  constructor(title: string) {
    super(`Book with title ${title} already exists`);
  }
}

export class BookWithGivenIdNotFound extends Error {
  constructor(bookId: string) {
    super(`Book with id ${bookId} not found`);
  }
}

export class BookWithGivenIdDoesNotBelongToUser extends Error {
  constructor(bookId: string, userId: string) {
    super(`Book with id ${bookId} does not belong to user with id ${userId}`);
  }
}
