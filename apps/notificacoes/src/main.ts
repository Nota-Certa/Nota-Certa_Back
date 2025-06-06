import { NestFactory } from '@nestjs/core';
import { NotificacoesModule } from './notificacoes.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificacoesModule);
  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
