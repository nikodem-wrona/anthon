/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { User } from 'src/users/models';

import { UserUnauthorized } from './exceptions';
import { AuthRepository } from './auth.repository';

export type CustomContext = ExecutionContext & {
  user: User;
};

@Injectable()
export class RestApiKeyGuard implements CanActivate {
  constructor(private readonly authRepository: AuthRepository) {}

  async canActivate(context: CustomContext): Promise<boolean> {
    const headers = context.switchToHttp().getRequest().headers;

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

    context.user = user;

    return true;
  }
}
