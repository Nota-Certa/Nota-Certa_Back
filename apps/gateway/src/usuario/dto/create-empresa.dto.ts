import { IsNotEmpty, IsString, Length, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateUsuarioDto } from "./create-usuario.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEmpresaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome ou razão social da empresa',
    example: 'Empresa XYZ LTDA',
  })
  nome_razao_social: string;

  @IsString()
  @IsNotEmpty()
  @Length(14, 14, { message: 'CNPJ deve conter exatamente 14 dígitos' })
  @ApiProperty({
    description: 'CNPJ da empresa',
    example: '12345678000195',
  })
  cnpj: string;

  @ValidateNested()
  @Type(() => CreateUsuarioDto)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Dados do usuário responsável pela empresa',
  })
  usuario: CreateUsuarioDto;
}