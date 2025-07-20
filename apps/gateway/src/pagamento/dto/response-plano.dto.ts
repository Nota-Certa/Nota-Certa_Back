import { ApiProperty } from "@nestjs/swagger";


export class ResponsePlanoDto {
  @ApiProperty({
    description: 'ID da assinatura',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Nome da assinatura',
    example: 'Assinatura Premium',
  })
  nome: string;

  @ApiProperty({
    description: 'Valor mensal da assinatura',
    example: 29.99,
  })
  valor_mensal: number;

  @ApiProperty({
    description: 'Limite de notas mensais da assinatura',
    example: 100,
  })
  limite_notas_mensal: number;

  @ApiProperty({
    description: 'Valor excedente por nota adicional',
    example: 0.50,
  })
  valor_excedente: number;

  @ApiProperty({
    description: 'Acesso a recursos premium',
    example: true,
  })
  acesso_premium: boolean;

  @ApiProperty({
    description: 'Limite de usuários da assinatura',
    example: 10,
  })
  limite_usuarios: number;

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
