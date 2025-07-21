import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotasFiscaisController } from './notas-fiscais.gateway';
import { NotasFiscaisService } from './notas-fiscais.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTAS_FISCAIS_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'redis',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        },
      },
    ]),
  ],
  controllers: [NotasFiscaisController],
  providers: [NotasFiscaisService],
  exports: [NotasFiscaisService],
})
export class NotasFiscaisModule {}
