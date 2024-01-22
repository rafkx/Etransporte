import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEstoqueDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsString()
  @IsNotEmpty()
  localizacao: string;
}
