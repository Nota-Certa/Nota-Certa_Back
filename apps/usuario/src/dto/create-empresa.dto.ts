import { IsNotEmpty, IsString, Min, Max } from "class-validator";
import { CreateUsuarioDto } from "./create-usuario.dto";

export class CreateEmpresaDto {
  @IsString()
  @IsNotEmpty()
  nome_razao_social: string;

  @IsString()
  @IsNotEmpty()
  @Min(14)
  cnpj: string;

  usuario: CreateUsuarioDto;
}