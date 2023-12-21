
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserInput {
    email: string;
}

export interface CreateApiKeyInput {
    userId: string;
}

export interface User {
    email: string;
}

export interface IMutation {
    createUser(input: CreateUserInput): boolean | Promise<boolean>;
    createApiKey(input: CreateApiKeyInput): string | Promise<string>;
}

export interface IQuery {
    users(): User[] | Promise<User[]>;
}

type Nullable<T> = T | null;
