/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { User } from 'src/users/models';

import { UserUnauthorized } from './exceptions';
import { AuthRepository } from './auth.repository';

export type CustomContext = ExecutionContext & {
  user: User;
};

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly authRepository: AuthRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext: CustomContext =
      GqlExecutionContext.create(context).getContext();
    // @ts-ignore
    const headers = gqlContext.headers;

    if (!headers) {
      throw new UserUnauthorized();
    }

    const key = headers['x-api-key'];

    if (!key) {
      throw new UserUnauthorized();
    }

    const user = await this.authRepository.GetUserByApiKey(key);

    if (!user) {
      throw new UserUnauthorized();
    }

    gqlContext.user = user;

    return true;
  }
}
