from kafka3 import KafkaConsumer

topics = [
    {
        "topic_name": "whisper_transcription",
    }
]

class MessageHandler:
    def handle(self, message=None, topic_name=None):
        print(f'Handling message {message} from topic {topic_name}')


class GenericConsumer:
    def __init__(self, topic_name, message_handler: MessageHandler):
        self.topic_name = topic_name

    def consume(self):
        print(f'Consuming topic {self.topic_name}')

        kafka_topic_consumer = KafkaConsumer(
            self.topic_name,
            bootstrap_servers='localhost:19092',
            max_poll_records=100,
            auto_offset_reset='earliest'  # ,'smallest'
        )

        for message in kafka_topic_consumer:
            message_handler.handle(message.value.decode("utf-8"), self.topic_name)


if __name__ == '__main__':
    for topic in topics:
        topic_name = topic['topic_name']
        message_handler = MessageHandler()
        consumer = GenericConsumer(topic_name, message_handler)
        consumer.consume()
