import { Module } from '@nestjs/common';
import { UsuarioMessageController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresas.entity';
import { Usuario } from './entities/usuarios.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME_USER'),
        entities: [Empresa, Usuario],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        migrationsRun: config.get('TYPEORM_MIGRATIONS_RUN') === 'true',
        migrationsTableName: 'migrations',
        synchronize: true,  // DESATIVAR APÓS O DESENVOLVIMENTO
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Empresa, Usuario]),
  ],
  controllers: [UsuarioMessageController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
