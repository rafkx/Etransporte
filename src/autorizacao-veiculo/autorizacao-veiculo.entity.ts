import { Funcionario } from 'src/funcionario/entities/funcionario.entity';
import { Veiculo } from 'src/veiculo/entities/veiculo.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('autorizacao_veiculo')
@Unique(['funcionario', 'veiculo'])
export class AutorizacaoVeiculo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.autorizacao, {
    eager: true,
  })
  funcionario: Funcionario;

  @ManyToOne(() => Veiculo, (veiculo) => veiculo.autorizacao, { eager: true })
  veiculo: Veiculo;
}
