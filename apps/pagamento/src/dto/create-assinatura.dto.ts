import { IsUUID, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateAssinaturaDto {
  @IsUUID()
  empresa_id: string;

  @IsUUID()
  plano_id: string;

  @IsDateString()
  inicio: string;

  @IsDateString()
  fim: string;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}
