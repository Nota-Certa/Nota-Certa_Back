import { IsUUID, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateAssinaturaDto {
  @IsUUID()
  planoId: string;

  @IsUUID()
  empresa_id: string;

  @IsDateString()
  @IsOptional()
  inicio?: string;

  @IsDateString()
  @IsOptional()
  fim?: string;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}
