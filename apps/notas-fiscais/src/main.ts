import { NestFactory } from '@nestjs/core';
import { NotasFiscaisModule } from './notas-fiscais.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(NotasFiscaisModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
