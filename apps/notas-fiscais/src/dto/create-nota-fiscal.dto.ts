import {
  IsUUID,
  IsDateString,
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StatusNotaFiscal } from '../entities/status.enum';

export class CreateNotaFiscalItemDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  @Min(1)
  quantidade: number;

  @IsNumber()
  @Min(0)
  valor_unitario: number;

  // impostos pode ser um JSON qualquer
  @IsNotEmpty()
  impostos: any;
}

export class CreateNotaFiscalDto {
  @IsUUID()
  cliente_id: string;

  @IsDateString()
  data_emissao: string;

  @IsDateString()
  data_vencimento: string;

  @IsEnum(StatusNotaFiscal)
  status?: StatusNotaFiscal;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateNotaFiscalItemDto)
  itens: CreateNotaFiscalItemDto[];
}
