import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { InternalError } from 'src/common/exceptions';
import { GetUserSubscriptionsQuery } from '../queries';
import { MoneyRepository } from '../money.repository';

@QueryHandler(GetUserSubscriptionsQuery)
export class GetUserSubscriptionsQueryHandler
  implements IQueryHandler<GetUserSubscriptionsQuery>
{
  constructor(private readonly moneyRepository: MoneyRepository) {}

  async execute(query: GetUserSubscriptionsQuery) {
    try {
      const { userId } = query;
      return this.moneyRepository.GetUserSubscriptions(userId);
    } catch (error) {
      throw new InternalError();
    }
  }
}
