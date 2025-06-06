import { NestFactory } from '@nestjs/core';
import { AutenticacaoModule } from './autenticacao.module';

async function bootstrap() {
  const app = await NestFactory.create(AutenticacaoModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
