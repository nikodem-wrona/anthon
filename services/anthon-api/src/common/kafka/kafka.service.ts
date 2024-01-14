import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Admin } from 'kafkajs';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit {
  private admin: Admin;

  constructor(@Inject('anthon') private client: ClientKafka) {}

  async onModuleInit(): Promise<void> {
    this.client.subscribeToResponseOf('fibo');

    const kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:19092'],
    });

    this.admin = kafka.admin();

    const topics = await this.admin.listTopics();
    const topicList = [];

    if (!topics.includes('fibo')) {
      topicList.push({
        topic: 'fibo',
        numPartitions: 10,
        replicationFactor: 1,
      });
    }

    if (!topics.includes('fibo.reply')) {
      topicList.push({
        topic: 'fibo.reply',
        numPartitions: 10,
        replicationFactor: 1,
      });
    }

    if (topicList.length) {
      await this.admin.createTopics({
        topics: topicList,
      });
    }
  }

  async SendMessage(): Promise<void> {
    this.client.send('fibo', 'test').subscribe((response) => {
      console.log({
        response,
      });
    });
  }
}
