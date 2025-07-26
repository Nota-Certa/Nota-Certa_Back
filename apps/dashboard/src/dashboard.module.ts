import { Module } from '@nestjs/common';
import { DashboardMessageController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsoMensal } from './entities/uso_mensal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ClientsModule.registerAsync([
      {
        name: 'NOTAS_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.get<string>('REDIS_HOST', 'redis'),
            port: configService.get<number>('REDIS_PORT', 6379),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME_DASHBOARD,
      entities: [UsoMensal],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
      migrationsTableName: 'migrations',
      synchronize: false,
    }),
    TypeOrmModule.forFeature([UsoMensal]),
  ],
  controllers: [DashboardMessageController],
  providers: [DashboardService],
})
export class DashboardModule {}
