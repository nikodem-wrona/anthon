
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum SubscriptionDuration {
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY"
}

export class CreateBookInput {
    title: string;
    author: string;
    isFinished: boolean;
}

export class CreateSubscriptionInput {
    name: string;
    type: SubscriptionDuration;
}

export class AddSubscriptionTransactionInput {
    subscriptionId: string;
    amount: number;
    currency: string;
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

    abstract createSubscription(input: CreateSubscriptionInput): boolean | Promise<boolean>;

    abstract deleteSubscription(subscriptionId: string): boolean | Promise<boolean>;

    abstract addSubscriptionTransaction(input: AddSubscriptionTransactionInput): boolean | Promise<boolean>;

    abstract createUser(input: CreateUserInput): boolean | Promise<boolean>;

    abstract createApiKey(input: CreateApiKeyInput): string | Promise<string>;
}

export abstract class IQuery {
    abstract getBooksForUser(): Nullable<Book>[] | Promise<Nullable<Book>[]>;

    abstract getUserSubscriptions(): Nullable<UserSubscription>[] | Promise<Nullable<UserSubscription>[]>;

    abstract users(): User[] | Promise<User[]>;
}

export class SubscriptionTransaction {
    id: string;
    createdAt: string;
    updatedAt: string;
    amount: number;
    currency: string;
}

export class UserSubscription {
    id: string;
    name: string;
    type: SubscriptionDuration;
    subscriptionTransactions: Nullable<SubscriptionTransaction>[];
    createdAt: string;
    updatedAt: string;
}

export class User {
    email: string;
}

type Nullable<T> = T | null;
