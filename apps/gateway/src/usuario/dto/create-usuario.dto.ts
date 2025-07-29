import { IsEnum, IsString, IsUUID } from "class-validator";
import { RoleUsuarios } from "../enums/role.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuarioDto {
  @IsUUID()
  @ApiProperty({ description: 'ID da empresa associada ao usuário', example: '123e4567-e89b-12d3-a456-426614174000' })
  empresa_id: string;

  @IsString()
  @ApiProperty({ description: 'Nome do usuário', example: 'João da Silva' })
  nome: string;

  @IsString()
  @ApiProperty({ description: 'E-mail do usuário', example: 'joao.silva@example.com' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'Senha do usuário', example: 'senha123' })
  senha: string;

  @IsEnum(RoleUsuarios)
  @ApiProperty({ description: 'Papel do usuário', example: RoleUsuarios.ADMIN })
  role: RoleUsuarios;
}
