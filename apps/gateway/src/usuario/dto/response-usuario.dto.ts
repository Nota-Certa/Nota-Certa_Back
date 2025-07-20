import { ApiProperty } from '@nestjs/swagger';
import { RoleUsuarios } from '../enums/role.enum';

export class ResponseUsuarioDto {
  @ApiProperty({
    description: 'ID único do usuário',
    example: 'c3a3b2a1-1b1b-2c2c-3d3d-4e4e5f5f6a6a',
  })
  id: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João da Silva',
  })
  nome: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao.silva@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Papel (role) do usuário no sistema',
    example: RoleUsuarios.ADMIN,
    enum: RoleUsuarios,
  })
  role: RoleUsuarios;

  @ApiProperty({
    description: 'Data e hora de criação do usuário',
    example: '2025-07-20T12:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data e hora da última atualização do usuário',
    example: '2025-07-20T12:30:00.000Z',
  })
  updatedAt: Date;
}