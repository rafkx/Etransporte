import { Entrada } from 'src/entrada/entities/entrada.entity';
import { Saida } from 'src/saida/entities/saida.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Estoque {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Column({ name: 'nome', type: 'varchar', length: 50 })
  nome: string;

  @Column({ name: 'desc', type: 'varchar', length: 500 })
  desc: string;

  @Column({ name: 'localizacao', type: 'varchar', length: 50 })
  localizacao: string;

  @OneToMany(() => Entrada, (entradas) => entradas.estoque)
  entradas: Entrada[];

  @OneToMany(() => Saida, (saidas) => saidas.estoque)
  saidas: Saida[];
}
