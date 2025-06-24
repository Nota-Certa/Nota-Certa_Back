import { NestFactory } from '@nestjs/core';
import { DashboardModule } from './dashboard.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(DashboardModule, {
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379'},
  });
  await app.listen();
}
bootstrap();
