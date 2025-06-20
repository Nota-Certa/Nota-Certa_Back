import { IsString, IsUUID, IsInt, IsOptional } from 'class-validator';

export class CreateNotificacaoDto {
  @IsString()
  tipo: string;

  @IsString()
  destinatario: string;

  @IsString()
  conteudo: string;

  @IsString()
  status_emvio: string;

  @IsString()
  evento: string;

  @IsUUID()
  invoice_id: string;

  @IsUUID()
  cliente_id: string;

  @IsUUID()
  empresa_id: string;

  @IsInt()
  tentativa: number;

  @IsOptional()
  create_at?: Date;
}
