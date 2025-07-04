import { IsString, IsInt, IsOptional, IsNumber, isBoolean, IsBoolean } from 'class-validator';

export class CreatePlanoDto {
  @IsString()
  nome: string;

  @IsNumber()
  valor_mensal: number;

  @IsInt()
  limite_notas_mensal: number;

  @IsNumber()
  valor_excedente: number;

  @IsBoolean()
  acesso_premium: boolean;

  @IsInt()
  limite_usuarios: number;
}
