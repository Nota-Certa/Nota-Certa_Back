import { IsUUID, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateAssinaturaDto {
  @IsUUID()
  planoId: string;

  @IsUUID()
  empresa_id: string;

  @IsDateString()
  inicio: string;

  @IsDateString()
  fim: string;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}
