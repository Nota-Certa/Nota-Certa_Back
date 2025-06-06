import { NestFactory } from '@nestjs/core';
import { UsuarioModule } from './usuario.module';

async function bootstrap() {
  const app = await NestFactory.create(UsuarioModule);
  await app.listen(process.env.PORT ?? 3004);
}
bootstrap();
