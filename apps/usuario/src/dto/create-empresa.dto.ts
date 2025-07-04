import { IsNotEmpty, IsString, Length, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateUsuarioDto } from "./create-usuario.dto";

export class CreateEmpresaDto {
  @IsString()
  @IsNotEmpty()
  nome_razao_social: string;

  @IsString()
  @IsNotEmpty()
  @Length(14, 14, { message: 'CNPJ deve conter exatamente 14 dígitos' })
  cnpj: string;

  @ValidateNested()
  @Type(() => CreateUsuarioDto)
  usuario: CreateUsuarioDto;
}