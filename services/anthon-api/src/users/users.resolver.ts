import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { CreateApiKeyDto, CreateUserDto } from './dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  async createUser(@Args('input') input: CreateUserDto): Promise<boolean> {
    await this.usersService.CreateUser(input);
    return true;
  }

  @Mutation('createApiKey')
  async createApiKey(@Args('input') input: CreateApiKeyDto): Promise<boolean> {
    await this.usersService.CreateApiKey(creatorId, input);
    return true;
  }
}
