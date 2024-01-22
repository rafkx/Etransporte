import { IsNotEmpty } from 'class-validator';
import { Funcionario } from 'src/funcionario/entities/funcionario.entity';
import { Veiculo } from 'src/veiculo/entities/veiculo.entity';

export class AutorizacaoVeiculoDto {
  @IsNotEmpty()
  funcionario: Funcionario;

  @IsNotEmpty()
  veiculo: Veiculo;
}
