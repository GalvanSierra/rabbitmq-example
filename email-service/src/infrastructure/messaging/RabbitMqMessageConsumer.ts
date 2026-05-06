import { ChannelModel, ConfirmChannel, connect } from 'amqplib';

export class RabbitMqMessageConsumer {
  private connection: ChannelModel;
  private channel: ConfirmChannel;

  constructor() {
    this.connection = null;
    this.channel = null;
  }

  public async connect(): Promise<void> {
    this.connection = await connect('amqp://localhost');
    this.channel = await this.connection.createConfirmChannel();
  }

  public async consume(
    queue: string,
    callback: (message: any) => void
  ): Promise<void> {
    await this.channel.assertQueue(queue, { durable: true });

    this.channel.consume(queue, (msg) => {
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString());
        callback(content);
        this.channel.ack(msg);
      }
    });
  }
}
