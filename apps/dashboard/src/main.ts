import { NestFactory } from '@nestjs/core';
import { DashboardModule } from './dashboard.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(DashboardModule, {
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST || 'redis',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    },
  });
  await app.listen();
}
bootstrap();
