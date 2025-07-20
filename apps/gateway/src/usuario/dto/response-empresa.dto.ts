import { ApiProperty } from "@nestjs/swagger";
import { CreateUsuarioDto } from "./create-usuario.dto";

export class ResponseEmpresaDto {
  @ApiProperty({
    description: 'ID da empresa',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Nome ou razão social da empresa',
    example: 'Empresa XYZ LTDA',
  })
  nome_razao_social: string;

  @ApiProperty({
    description: 'CNPJ da empresa',
    example: '12.345.678/0001-90',
  })
  cnpj: string;

  @ApiProperty({
    description: 'Usuário responsável pela empresa',
    type: CreateUsuarioDto,
  })
  usuario: CreateUsuarioDto;

  @ApiProperty({
    description: 'Data e hora de criação da empresa',
    example: '2025-07-20T12:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data e hora da última atualização da empresa',
    example: '2025-07-20T12:30:00.000Z',
  })
  updatedAt: Date
}