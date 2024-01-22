import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Contato } from 'src/contato/entities/contato.entity';
import { Entrada } from 'src/entrada/entities/entrada.entity';
import { ItemManutencao } from 'src/manutencao/entities/item.manutencao';
import { Peca } from 'src/pecas/entities/peca.entity';
import { Servico } from 'src/servico/entities/servico.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Fornecedor {
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

  @Column({ name: 'cnpj', type: 'varchar', length: 50 })
  cnpj: string;

  @Column({ name: 'cpf', type: 'varchar', length: 50, nullable: true })
  cpf?: string;

  @Column({ name: 'endereco', type: 'varchar', length: 50 })
  endereco: string;

  @OneToMany(() => Contato, (contatos) => contatos.fornecedor, {
    eager: true,
    cascade: true,
  })
  contatos: Contato[]; //criar entidade cntt - onetomany (apelido tel email)

  @OneToMany(() => Entrada, (entradas) => entradas.estoque)
  entradas: Entrada[];

  @ManyToMany(() => Peca, (peca) => peca.fornecedorP)
  peca: Peca[];

  @ManyToMany(() => Servico, (servicos) => servicos.fornecedor)
  servicos: Servico[];
}
