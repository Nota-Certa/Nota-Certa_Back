import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BillingModule } from './billing.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(BillingModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 4005, // Mudar a porta conforme necessario depois
    },
  });
  await app.listen();
}
bootstrap();
