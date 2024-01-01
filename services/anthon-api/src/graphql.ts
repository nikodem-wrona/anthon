
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

export interface CreateBookInput {
    title: string;
    author: string;
    isFinished: boolean;
}

export interface CreateSubscriptionInput {
    name: string;
    type: SubscriptionDuration;
}

export interface AddSubscriptionTransactionInput {
    subscriptionId: string;
    amount: number;
    currency: string;
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
    createSubscription(input: CreateSubscriptionInput): boolean | Promise<boolean>;
    deleteSubscription(subscriptionId: string): boolean | Promise<boolean>;
    addSubscriptionTransaction(input: AddSubscriptionTransactionInput): boolean | Promise<boolean>;
    createUser(input: CreateUserInput): boolean | Promise<boolean>;
    createApiKey(input: CreateApiKeyInput): string | Promise<string>;
}

export interface IQuery {
    getBooksForUser(): Nullable<Book>[] | Promise<Nullable<Book>[]>;
    getUserSubscriptions(): Nullable<UserSubscription>[] | Promise<Nullable<UserSubscription>[]>;
    users(): User[] | Promise<User[]>;
}

export interface SubscriptionTransaction {
    id: string;
    createdAt: string;
    updatedAt: string;
    amount: number;
    currency: string;
}

export interface UserSubscription {
    id: string;
    name: string;
    type: SubscriptionDuration;
    subscriptionTransactions: Nullable<SubscriptionTransaction>[];
    createdAt: string;
    updatedAt: string;
}

export interface User {
    email: string;
}

type Nullable<T> = T | null;
