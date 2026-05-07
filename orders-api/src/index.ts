import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { RabbitMqMessagePublisher } from './infrastructure/messaging/RabbitMqMessagePublisher';

interface Order {
  customerName: string;
  product: string;
  quantity: number;
}

const app: Express = express();
app.use(cors());
app.use(express.json());

const publisher = new RabbitMqMessagePublisher();
function isOrder(obj: any): obj is Order {
  return (
    obj &&
    typeof obj.customerName === 'string' &&
    typeof obj.product === 'string' &&
    typeof obj.quantity === 'number'
  );
}

const start = async () => {
  await publisher.connect();
  console.log('[Orders API] Conectado a RabbitMQ');

  app.post('/orders', async (req: Request, res: Response) => {
    if (!isOrder(req.body)) {
      return res.status(400).json({
        success: false,
        message: 'Datos de pedido inválidos',
      });
    }

    const orderData = {
      type: 'OrderCreatedMessage',
      orderId: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...req.body,
    };

    console.log('[Orders API] Nueva orden recibida:', orderData);

    await publisher.publish('order_queue', orderData);

    res.status(201).json({ success: true, orderId: orderData.orderId });
  });

  app.get('/test', async (req: Request, res: Response) => {
    res.status(200).json({ success: true, message: 'Orders API running' });
  });

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Orders API running on port ${PORT}`);
  });
};

start();
