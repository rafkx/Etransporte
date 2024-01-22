import { IsInt, IsNotEmpty, IsNumber, IsObject, Min } from 'class-validator';
import { Estoque } from 'src/estoque/entities/estoque.entity';

export class CreateSaidaDto {
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  quantidade: number;

  @IsObject()
  estoque: Estoque;
}
