import { IsUUID, IsOptional, IsDate, IsBoolean } from 'class-validator';

export class CreateAssinaturaDto {
  @IsUUID()
  planoId: string;

  @IsUUID()
  empresa_id: string;

  @IsDate()
  inicio: Date;

  @IsDate()
  fim: Date;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}
