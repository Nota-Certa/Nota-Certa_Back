import { ApiProperty } from "@nestjs/swagger";
import { TipoPessoa } from "../enums/tipo-pessoa.enum";
import { StatusNotaFiscal } from "../enums/status.enum";
import { CreateNotaFiscalItemDto } from "./create-nota-fiscal-item.dto";


export class ResponseNotaFiscalDto {
  @ApiProperty({
    description: 'ID da empresa associada à nota fiscal',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  empresa_id: string;

  @ApiProperty({
    description: 'Tipo de pessoa que gerou a nota fiscal',
    example: TipoPessoa.FISICA,
  })
  tipo_pessoa: TipoPessoa;


  @ApiProperty({
    description: 'Documento da pessoa',
    example: '12312312312',
  })
  documento: string;

   @ApiProperty({
    description: 'Razão social da empresa',
    example: 'EMPRESA X',
  })
  nome_razao_social: string;


  @ApiProperty({ 
    description: 'Status da nota fiscal', 
    example: StatusNotaFiscal.PAGA 
  })
  status: StatusNotaFiscal;

  @ApiProperty({
    description: 'Data de emissão da assinatura',
    example: '2025-07-20T12:30:00.000Z',
  })
  data_emissao: string;

  @ApiProperty({
    description: 'Data de vencimento da assinatura',
    example: '2025-07-20T12:30:00.000Z',
  })
  data_vencimento: string;

  @ApiProperty({
    description: 'Itens',
    example: '[{}]',
  })
  itens: CreateNotaFiscalItemDto[];
}
