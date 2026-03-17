# Sistema de Órdenes con Microservicios y RabbitMQ

Este proyecto es un ejemplo práctico de cómo implementar una arquitectura desacoplada utilizando **Microservicios** en **Node.js** y **RabbitMQ** como Message Broker.

## 🚀 Arquitectura

El sistema utiliza una comunicación asíncrona para mejorar la disponibilidad y resiliencia.

* **Order Service**: Servicio principal que recibe las órdenes y publica eventos.
* **Inventory Service**: Valida el stock.
* **Email Service**: Consumidor que envía notificaciones de confirmación.
* **Analytics Service**: Consumidor que registra métricas de ventas.

## 🛠️ Requisitos previos

* [Node.js](https://nodejs.org/) (v16 o superior)
* [Docker](https://www.docker.com/) y Docker Compose

## 🐳 Infraestructura (RabbitMQ)

Para levantar el broker de mensajería de forma rápida, utiliza el siguiente comando de Docker:

```bash
docker run -d --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  rabbitmq:3-management

```

* **Puerto 5672**: Puerto por defecto para la comunicación del protocolo AMQP.
* **Puerto 15672**: Panel de administración web (Dashboard).
* **URL**: `http://localhost:15672`
* **Usuario/Password por defecto**: `guest` / `guest`



## 📦 Instalación

Para instalar las dependencias de cada microservicio, navega a cada directorio de servicio y ejecuta `npm install`:

```bash
cd analytics-service
npm install
cd ../email-service
npm install
cd ../inventory-service
npm install
cd ../order-service
npm install
```

## ▶️ Ejecución de Microservicios

Asegúrate de que RabbitMQ esté corriendo (ver sección "🐳 Infraestructura (RabbitMQ)").

Para iniciar cada microservicio, abre una nueva terminal para cada uno y ejecuta:

```bash
# En una terminal:
cd analytics-service
npm start

# En otra terminal:
cd email-service
npm start

# En otra terminal:
cd inventory-service
npm start

# En otra terminal:
cd order-service
npm start
```