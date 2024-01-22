import { IsIn, IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Veiculo } from 'src/veiculo/entities/veiculo.entity';

export class CreateQuilometroDto {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  quantKm: number;

  @IsNotEmpty()
  data: Date;

  @IsNotEmpty()
  veiculo: Veiculo;
}
