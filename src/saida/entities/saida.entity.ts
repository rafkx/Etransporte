import { Estoque } from 'src/estoque/entities/estoque.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Saida {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'quantidade', type: 'int' })
  quantidade: number;

  @ManyToOne(() => Estoque, (estoque) => estoque.saidas, { eager: true })
  estoque: Estoque;
}
