import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ApiKeyGuard, CustomContext } from 'src/common/api-key.guard';

import { UsersService } from './users.service';
import { CreateApiKeyDto, CreateUserDto } from './dto';
import { UserRoleGuard } from 'src/common/role.guard';
import { UserRole } from 'src/common/types';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(ApiKeyGuard, UserRoleGuard([UserRole.ADMIN]))
  @Mutation('createUser')
  async createUser(@Args('input') input: CreateUserDto): Promise<boolean> {
    const { email } = input;
    await this.usersService.CreateUser({
      email,
    });
    return true;
  }

  @UseGuards(ApiKeyGuard, UserRoleGuard([UserRole.ADMIN]))
  @Mutation('createApiKey')
  async createApiKey(
    @Args('input') input: CreateApiKeyDto,
    @Context() request: CustomContext,
  ): Promise<boolean> {
    const { user } = request;

    await this.usersService.CreateApiKey({
      userId: input.userId,
      creatorId: user.id,
    });
    return true;
  }
}
