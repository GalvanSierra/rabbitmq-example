import axios, { AxiosInstance } from 'axios';
import { RabbitMqMessagePublisher } from '../infrastructure/messaging/RabbitMqMessagePublisher';

export class OrderService {
    private inventoryClient: AxiosInstance;
    private emailClient: AxiosInstance;
    private analyticsClient: AxiosInstance;
    private publisher: RabbitMqMessagePublisher

    constructor() {
        this.inventoryClient = axios.create({
            baseURL: 'http://localhost:3001',
            timeout: 5000
        });
        
        this.emailClient = axios.create({
            baseURL: 'http://localhost:3002',
            timeout: 5000
        });
        
        this.analyticsClient = axios.create({
            baseURL: 'http://localhost:3003',
            timeout: 5000
        });

        this.publisher = new RabbitMqMessagePublisher()
    }

    public async createOrder(orderData: any): Promise<any> {
        console.log('Creando orden...');
        
        const inventoryResponse = await this.inventoryClient.post('/reserve', {
            items: orderData.items
        });
        
        if (!inventoryResponse.data.success) {
            throw new Error('No hay inventario disponible');
        }
        
        await this.publisher.connect()
        await this.publisher.publish('order_queue', orderData)
        await this.publisher.close()
        
        return { success: true, orderId: 'ORD-001' };
    }
}