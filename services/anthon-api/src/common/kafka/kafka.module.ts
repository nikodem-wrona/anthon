import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'anthon',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'anthon',
            brokers: ['localhost:19092'],
          },
          consumer: {
            groupId: 'anthon-consumer',
          },
        },
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
