import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { AuthModule } from './autenticacao/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'DASHBOARD_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'redis',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        },
      },
      {
        name: 'USUARIOS_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'redis',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        },
      },
      {
        name: 'PAGAMENTO_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'redis',
          port: parseInt(process.env.REDIS_PORT || '6379'),
        },
      },
    ]),
    DashboardModule,
    UsuarioModule,
    PagamentoModule,
    AuthModule,
  ],
})
export class AppModule {}
