import { NestFactory } from '@nestjs/core';
import { PagamentoModule } from './pagamento.module';

async function bootstrap() {
  const app = await NestFactory.create(PagamentoModule);
  await app.listen(process.env.port ?? 3006);
}
bootstrap();
