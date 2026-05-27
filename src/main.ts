import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { ConfigService } from './config';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  const configService = app.get(ConfigService);
  const { url, queue } = configService.rmq;

  app.connectMicroservice(
    {
      transport: Transport.RMQ,
      options: {
        urls: [url],
        queue: queue.name,
        noAck: false,
        queueOptions: {
          durable: true,
          arguments: { 'x-queue-type': queue.type },
        },
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();
  await app.listen(configService.port, '0.0.0.0');
};

bootstrap();
