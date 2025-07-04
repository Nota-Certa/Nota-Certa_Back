import { IsEnum, IsString, IsUUID } from "class-validator";
import { RoleUsuarios } from "../entities/role.enum";

export class CreateUsuarioDto {
  @IsUUID()
  empresa_id: string;

  @IsString()
  nome: string;

  @IsString()
  email: string;

  @IsString()
  senha: string;

  @IsEnum(RoleUsuarios)
  role: RoleUsuarios;
}
