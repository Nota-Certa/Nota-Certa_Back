import { IsNotEmpty, IsNumber, IsObject, IsString, Min } from "class-validator";

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
  @IsObject()
  impostos: any;
}