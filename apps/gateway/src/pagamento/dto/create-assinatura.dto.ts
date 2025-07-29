import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateAssinaturaDto {
  @IsUUID()
  @ApiProperty({
    description: 'ID da empresa associada à assinatura',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  empresa_id: string;

  @IsUUID()
  @ApiProperty({
    description: 'ID do plano associado à assinatura',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  plano_id: string;

  @IsDateString()
  @ApiProperty({
    description: 'Data de início da assinatura',
    example: '2025-07-20T12:30:00.000Z',
  })
  inicio: string;

  @IsDateString()
  @ApiProperty({
    description: 'Data de término da assinatura',
    example: '2025-07-20T12:30:00.000Z',
  })
  fim: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Status da assinatura',
    example: true,
  })
  ativo?: boolean;
}
