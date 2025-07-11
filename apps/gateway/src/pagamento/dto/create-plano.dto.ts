import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreatePlanoDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsInt()
  preco: number;

  @IsInt()
  @IsOptional()
  duracaoDias?: number;
}
