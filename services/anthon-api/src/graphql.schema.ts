
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateBookInput {
    title: string;
    author: string;
    isFinished: boolean;
}

export class CreateUserInput {
    email: string;
}

export class CreateApiKeyInput {
    userId: string;
}

export class Book {
    id: string;
    title: string;
    author: string;
    isFinished: boolean;
    userId: string;
}

export abstract class IMutation {
    abstract createBook(input: CreateBookInput): boolean | Promise<boolean>;

    abstract deleteBook(bookId: string): boolean | Promise<boolean>;

    abstract createUser(input: CreateUserInput): boolean | Promise<boolean>;

    abstract createApiKey(input: CreateApiKeyInput): string | Promise<string>;
}

export abstract class IQuery {
    abstract getBooksForUser(): Nullable<Book>[] | Promise<Nullable<Book>[]>;

    abstract users(): User[] | Promise<User[]>;
}

export class User {
    email: string;
}

type Nullable<T> = T | null;
