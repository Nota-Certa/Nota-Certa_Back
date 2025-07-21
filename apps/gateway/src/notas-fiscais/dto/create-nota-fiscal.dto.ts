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

import { Type } from 'class-transformer';
import { TipoPessoa } from '../enums/tipo-pessoa.enum';
import { StatusNotaFiscal } from '../enums/status.enum';
import { CreateNotaFiscalItemDto } from './create-nota-fiscal-item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotaFiscalDto {
  @IsUUID()
  @ApiProperty({
    description: 'ID da empresa associada à nota fiscal',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  empresa_id: string;

  @IsEnum(TipoPessoa)
  @ApiProperty({
    description: 'Tipo de pessoa que gerou a nota fiscal',
    example: TipoPessoa.FISICA,
  })
  tipo_pessoa: TipoPessoa;

  // aceita 11 ou 14 dígitos
  @IsString()
  @Length(11, 14)
  @ApiProperty({
    description: 'Documento da pessoa',
    example: '12312312312',
  })
  documento: string;

  @IsString()
  @IsNotEmpty()
   @ApiProperty({
    description: 'Nome ou razão social da empresa',
    example: 'EMPRESA X',
  })
  nome_razao_social: string;

  @IsOptional()
  @IsEnum(StatusNotaFiscal)
  @ApiProperty({ 
    description: 'Status da nota fiscal', 
    example: StatusNotaFiscal.PAGA 
  })
  status?: StatusNotaFiscal;

  @IsDateString()
  @ApiProperty({
    description: 'Data de emissão da assinatura',
    example: '2025-07-20T12:30:00.000Z',
  })
  data_emissao: string;

  @IsDateString()
  @ApiProperty({
    description: 'Data de vencimento da assinatura',
    example: '2025-07-20T12:30:00.000Z',
  })
  data_vencimento: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateNotaFiscalItemDto)
  @ApiProperty({
    description: 'Itens',
    example: '[{}]',
  })
  itens: CreateNotaFiscalItemDto[];
}
