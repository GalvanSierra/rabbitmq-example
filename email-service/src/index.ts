import express, { Express, Request, Response } from 'express';
import { RabbitMqMessageConsumer } from './infrastructure/messaging/RabbitMqMessageConsumer';

const app: Express = express();
app.use(express.json());

const start = async ()=> {
    const consumer = new RabbitMqMessageConsumer()
    await consumer.connect()

    consumer.consume('order_queue', (data) => {
        console.log('[Email Service] Enviando correo para la orden:')
        console.log(data)
    })
}

start()

app.post('/send', (req: Request, res: Response) => {
    console.log('[Email Service] Send request:', req.body);
    res.json({ success: true, message: 'Email enviado' });
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Email Service running on port ${PORT}`);
});
