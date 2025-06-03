import { NestFactory } from '@nestjs/core';
import { NotasFiscaisModule } from './notas-fiscais.module';

async function bootstrap() {
  const app = await NestFactory.create(NotasFiscaisModule);
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
