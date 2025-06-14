import { Module } from '@nestjs/common';
import { NotificacoesController } from './notificacoes.controller';
import { NotificacoesService } from './notificacoes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacoes } from './entities/notificacoes.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME_NOTIFICATIONS,
      entities: [Notificacoes],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
      migrationsTableName: 'migrations',
      synchronize: true,  // DESATIVAR APÓS O DESENVOLVIMENTO
    }),
    TypeOrmModule.forFeature([Notificacoes]),
  ],
  controllers: [NotificacoesController],
  providers: [NotificacoesService],
})
export class NotificacoesModule {}
