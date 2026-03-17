import { ChannelModel, ConfirmChannel, connect } from "amqplib"

export class RabbitMqMessagePublisher {
    private connection: ChannelModel
    private channel: ConfirmChannel

    constructor(){
        this.connection = null
        this.channel = null
    }
    
    public async connect(): Promise<void>{
        this.connection = await connect('amqp://localhost')
        this.channel = await this.connection.createConfirmChannel()
    }

    public async publish(queue: string, message: any): Promise<void>{
        await this.channel.assertQueue(queue, {durable: true})
        this.channel.sendToQueue(
            queue,
            Buffer.from(JSON.stringify(message)),
            {persistent: true}
        )
        await this.channel.waitForConfirms()
    }

    public async close(): Promise<void>{
        await this.connection.close()
    }
}