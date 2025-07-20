import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const internalPort = process.env.PORT || 3000;
  const publicPort = process.env.PUBLIC_PORT || internalPort;
  const host = process.env.HOST || '0.0.0.0';

  // Enable CORS for frontend communication
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3006'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Gateway - Usuários')
    .setDescription('Documentação da API para o microserviço de usuários e empresas.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // O endpoint para acessar a documentação será /api
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(internalPort, host);

  const logger = new Logger('Bootstrap');
  const appUrl = `http://${host === '0.0.0.0' ? 'localhost' : host}:${publicPort}`;

  logger.log(`🚀 Application gateway is running on: ${appUrl}`);
  logger.log(`📄 Swagger documentation is available at: ${appUrl}/api`);
}
bootstrap();
