import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresas.entity';
import { Usuario } from './entities/usuarios.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'notas_fiscais',
      entities: [Empresa, Usuario],
      synchronize: true, // ⚠️ Apenas para dev (não usar em produção)
    }),
    TypeOrmModule.forFeature([Empresa, Usuario]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
