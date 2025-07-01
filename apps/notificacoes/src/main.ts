import { NestFactory } from '@nestjs/core';
import { NotificacoesModule } from './notificacoes.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(NotificacoesModule, {
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST || 'redis',
      port: parseInt(process.env.REDIS_PORT || '6380'),
    },
  });
  await app.listen();
}
bootstrap();
