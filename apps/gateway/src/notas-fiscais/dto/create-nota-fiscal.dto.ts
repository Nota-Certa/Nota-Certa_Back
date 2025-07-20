import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  IsDateString,
  ValidateNested,
  IsArray, ArrayMinSize,
  IsOptional,
  IsUUID
} from 'class-validator';
import { TipoPessoa } from '../entities/tipo-pessoa.enum';
import { StatusNotaFiscal } from '../enums/status.enum';
import { Type } from 'class-transformer';
import { CreateNotaFiscalItemDto } from './create-nota-fiscal-item.dto';

export class CreateNotaFiscalDto {
  @IsUUID()
  empresa_id: string;

  @IsEnum(TipoPessoa)
  tipo_pessoa: TipoPessoa;

  // aceita 11 ou 14 dígitos
  @IsString()
  @Length(11, 14)
  documento: string;

  @IsString()
  @IsNotEmpty()
  nome_razao_social: string;

  @IsOptional()
  @IsEnum(StatusNotaFiscal)
  status?: StatusNotaFiscal;

  @IsDateString()
  data_emissao: string;

  @IsDateString()
  data_vencimento: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateNotaFiscalItemDto)
  itens: CreateNotaFiscalItemDto[];
}
