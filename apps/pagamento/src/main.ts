import { NestFactory } from '@nestjs/core';
import { PagamentoModule } from './pagamento.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PagamentoModule, {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6380,
    },
  });

  await app.listen();
}
bootstrap();
