export class BookWithGivenTitleAlreadyExists extends Error {
  constructor(title: string) {
    super(`Book with title ${title} already exists`);
  }
}
