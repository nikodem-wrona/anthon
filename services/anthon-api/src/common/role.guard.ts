import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { User } from 'src/users/models';

import { UserUnauthorized } from './exceptions';
import { UserRole } from './types';

export type CustomContext = ExecutionContext & {
  user: User;
};

export function UserRoleGuard(roles?: UserRole[]) {
  class Guard implements CanActivate {
    async canActivate(context: CustomContext): Promise<boolean> {
      const gqlContext: CustomContext =
        GqlExecutionContext.create(context).getContext();

      let user = gqlContext.user;

      if (!user) {
        user = context.user;
      }

      if (!user) {
        throw new UserUnauthorized();
      }

      if (roles.includes(user.role)) {
        return true;
      } else {
        throw new UserUnauthorized();
      }
    }
  }

  return mixin(Guard);
}
