import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { UsersModule } from './users';
import { BooksModule } from './books';
import { AiModule } from './ai';
import { MoneyModule } from './money';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      context: (request) => {
        return {
          headers: request.req.headers,
        };
      },
    }),
    UsersModule,
    BooksModule,
    MoneyModule,
    AiModule,
  ],
  controllers: [],
})
export class AppModule {}
