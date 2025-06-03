import { Module } from '@nestjs/common';
import { NotificacoesController } from './notificacoes.controller';
import { NotificacoesService } from './notificacoes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacoes } from './entities/notificacoes.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'notas_fiscais',
      entities: [Notificacoes],
      synchronize: true, // ⚠️ Apenas para dev (não usar em produção)
    }),
    TypeOrmModule.forFeature([Notificacoes]),
  ],
  controllers: [NotificacoesController],
  providers: [NotificacoesService],
})
export class NotificacoesModule {}
