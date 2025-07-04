import { RoleUsuarios } from "../entities/role.enum";
import { IsEmail, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha_hash: string;

  @IsBoolean()
  ativo: boolean;
}
