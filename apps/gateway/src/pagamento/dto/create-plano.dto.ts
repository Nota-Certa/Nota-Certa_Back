import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNumber, IsBoolean } from 'class-validator';

export class CreatePlanoDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do plano',
    example: 'Plano Básico',
  })
  nome: string;

  @IsNumber()
  @ApiProperty({
    description: 'Valor mensal do plano',
    example: 29.99,
  })
  valor_mensal: number;

  @IsInt()
  @ApiProperty({
    description: 'Limite de notas mensais do plano',
    example: 100,
  })
  limite_notas_mensal: number;

  @IsNumber()
  @ApiProperty({
    description: 'Valor excedente por nota adicional',
    example: 0.50,
  })
  valor_excedente: number;

  @IsBoolean()
  @ApiProperty({
    description: 'Acesso a recursos premium',
    example: true,
  })
  acesso_premium: boolean;

  @IsInt()
  @ApiProperty({
    description: 'Limite de usuários do plano',
    example: 10,
  })
  limite_usuarios: number;
}
