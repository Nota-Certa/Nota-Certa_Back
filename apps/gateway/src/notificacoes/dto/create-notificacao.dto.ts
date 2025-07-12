import { IsString, IsUUID, IsInt, IsEnum } from 'class-validator';
import { StatusEnvio } from '../enums/status-envio.enum';

export class CreateNotificacaoDto {
  @IsString()
  tipo: string;

  @IsString()
  destinatario: string;

  @IsString()
  conteudo: string;

  @IsEnum(StatusEnvio)
  status_envio: StatusEnvio;

  @IsString()
  evento: string;

  @IsUUID()
  nota_fiscal_id: string;

  @IsUUID()
  cliente_id: string;

  @IsUUID()
  empresa_id: string;

  @IsInt()
  tentativa: number;
}
