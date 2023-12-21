import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { User, UserRole } from 'src/users/models';

import { UserUnauthorized } from './exceptions';

export type CustomContext = ExecutionContext & {
  user: User;
};

export function UserRoleGuard(role?: UserRole) {
  class Guard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const gqlContext: CustomContext =
        GqlExecutionContext.create(context).getContext();

      const user = gqlContext.user;

      if (!user) {
        throw new UserUnauthorized();
      }

      if (role == user.role) {
        return true;
      } else {
        throw new UserUnauthorized();
      }
    }
  }

  return mixin(Guard);
}
