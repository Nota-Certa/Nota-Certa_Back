import { ApiProperty } from "@nestjs/swagger";


export class ResponseAssinaturaDto {
  @ApiProperty({
    description: 'ID da assinatura',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'ID da empresa associada à assinatura',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  empresa_id: string;

  @ApiProperty({
    description: 'ID do plano associado à assinatura',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  plano_id: string;

  @ApiProperty({
    description: 'Data de início da assinatura',
    example: '2025-07-20T12:30:00.000Z',
  })
  inicio: string;

  @ApiProperty({
    description: 'Data de término da assinatura',
    example: '2025-07-20T12:30:00.000Z',
  })
  fim: string;

  @ApiProperty({
    description: 'Status da assinatura',
    example: true,
  })
  ativo?: boolean;

  @ApiProperty({
    description: 'Data e hora de criação da empresa',
    example: '2025-07-20T12:30:00.000Z',
  })
  criado_em: Date;

  @ApiProperty({
    description: 'Data e hora da última atualização da empresa',
    example: '2025-07-20T12:30:00.000Z',
  })
  atualizado_em: Date;
}
