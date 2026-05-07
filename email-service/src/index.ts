import cors from 'cors';
import express, { Express } from 'express';
import { RabbitMqMessageConsumer } from './infrastructure/messaging/RabbitMqMessageConsumer';

const app: Express = express();
app.use(cors());
app.use(express.json());

const start = async () => {
  const consumer = new RabbitMqMessageConsumer();
  await consumer.connect();

  consumer.consume('order_queue', (data) => {
    console.log('[Email Service] Enviando correo para la orden:');
    console.log(data);
  });
};

start();

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Email Service running on port ${PORT}`);
});
