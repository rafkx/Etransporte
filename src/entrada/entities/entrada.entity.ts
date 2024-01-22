import { Estoque } from 'src/estoque/entities/estoque.entity';
import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Entrada {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'number', type: 'int' })
  quant: number;

  @Column({ name: 'valor_aquisicao', type: 'int' })
  valorAquisicao: number;

  @Column({ name: 'data', type: 'date' })
  data: Date;

  @ManyToOne(() => Estoque, (estoque) => estoque.entradas, { eager: true }) //manytoone
  estoque: Estoque;

  @ManyToOne(() => Fornecedor, (fornecedor) => fornecedor.entradas, {
    eager: true,
  }) //manytoone
  fornecedor: Fornecedor;
}
