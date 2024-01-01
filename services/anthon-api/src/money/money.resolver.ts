import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import {
  GraphqlApiKeyGuard,
  CustomContext,
} from 'src/common/graphql-api-key.guard';

import { UserRoleGuard } from 'src/common/role.guard';
import { UserRole } from 'src/common/types';
import { MoneyService } from './money.service';
import { AddSubscriptionTransactionDto, CreateSubscriptionDto } from './dto';
import { UserSubscription } from 'src/graphql.schema';
import { subscriptionMapper } from './mappers';

@Resolver()
export class MoneyResolver {
  constructor(private readonly moneyService: MoneyService) {}

  @UseGuards(GraphqlApiKeyGuard, UserRoleGuard([UserRole.ADMIN, UserRole.USER]))
  @Mutation('createSubscription')
  async createSubscription(
    @Args('input') input: CreateSubscriptionDto,
    @Context() request: CustomContext,
  ): Promise<boolean> {
    const { name, type } = input;
    const { user } = request;

    await this.moneyService.CreateSubscription({
      name,
      type,
      userId: user.id,
    });

    return true;
  }

  @UseGuards(GraphqlApiKeyGuard, UserRoleGuard([UserRole.ADMIN, UserRole.USER]))
  @Mutation('deleteSubscription')
  async deleteBook(
    @Args('subscriptionId') subscriptionId: string,
    @Context() request: CustomContext,
  ): Promise<boolean> {
    const { user } = request;
    await this.moneyService.DeleteSubscription({
      subscriptionId,
      userId: user.id,
    });

    return true;
  }

  @UseGuards(GraphqlApiKeyGuard, UserRoleGuard([UserRole.ADMIN, UserRole.USER]))
  @Mutation('addSubscriptionTransaction')
  async addSubscriptionTransaction(
    @Args('input') input: AddSubscriptionTransactionDto,
    @Context() request: CustomContext,
  ): Promise<boolean> {
    const { amount, currency, subscriptionId } = input;
    const { user } = request;

    await this.moneyService.AddSubscriptionTransaction({
      amount,
      currency,
      subscriptionId,
      userId: user.id,
    });

    return true;
  }

  @UseGuards(GraphqlApiKeyGuard, UserRoleGuard([UserRole.ADMIN, UserRole.USER]))
  @Query('getUserSubscriptions')
  async getUserSubscriptions(
    @Context() request: CustomContext,
  ): Promise<UserSubscription[]> {
    const { user } = request;

    const subscriptions = await this.moneyService.GetUserSubscriptions({
      userId: user.id,
    });

    return subscriptions.map(subscriptionMapper.mapToGraphql);
  }
}
