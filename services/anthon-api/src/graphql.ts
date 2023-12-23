
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateBookInput {
    title: string;
    author: string;
    isFinished: boolean;
}

export interface CreateUserInput {
    email: string;
}

export interface CreateApiKeyInput {
    userId: string;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    isFinished: boolean;
    userId: string;
}

export interface IMutation {
    createBook(input: CreateBookInput): boolean | Promise<boolean>;
    deleteBook(bookId: string): boolean | Promise<boolean>;
    createUser(input: CreateUserInput): boolean | Promise<boolean>;
    createApiKey(input: CreateApiKeyInput): string | Promise<string>;
}

export interface IQuery {
    getBooksForUser(): Nullable<Book>[] | Promise<Nullable<Book>[]>;
    users(): User[] | Promise<User[]>;
}

export interface User {
    email: string;
}

type Nullable<T> = T | null;
