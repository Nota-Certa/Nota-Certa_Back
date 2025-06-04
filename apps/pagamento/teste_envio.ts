// testar-envio.ts
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

async function bootstrap() {
  const client = ClientProxyFactory.create({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

  console.log(
    'Enviando mensagem para o microserviço de pagamento via Redis...',
  );

  const resposta = await firstValueFrom(
    client.send('criar_pagamento', {
      valor: 123,
      metodo: 'cartao',
    }),
  );

  console.log('Resposta recebida do microserviço:', resposta);
}

bootstrap();
