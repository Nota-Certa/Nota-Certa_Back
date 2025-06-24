import { IsString, IsUUID, IsOptional, IsDate, IsInt } from 'class-validator';

export class CreateAssinaturaDto {
  @IsUUID()
  planoId: string;

  @IsUUID()
  usuarioId: string;

  @IsDate()
  @IsOptional()
  dataInicio?: Date;

  @IsDate()
  @IsOptional()
  dataFim?: Date;

  @IsString()
  @IsOptional()
  status?: string;

  @IsInt()
  @IsOptional()
  tentativasPagamento?: number;
}
