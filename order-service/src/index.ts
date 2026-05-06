import { OrderService } from './services/orderService';

async function main() {
  console.log('=== Sistema de Órdenes (Versión Acoplada) ===\n');

  const orderData = {
    customerEmail: 'cliente@ejemplo.com',
    items: [
      { productId: 'PROD-001', quantity: 2 },
      { productId: 'PROD-002', quantity: 1 },
    ],
  };

  try {
    const orderService = new OrderService();
    const result = await orderService.createOrder(orderData);
    console.log('\nOrden creada:', result);
  } catch (error) {
    console.error('\nError al crear orden:', error.message);
  }
}

main();
