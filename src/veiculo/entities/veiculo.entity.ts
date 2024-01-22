import { Abastecimento } from 'src/abastecimento/entities/abastecimento.entity';
import { AutorizacaoVeiculo } from 'src/autorizacao-veiculo/autorizacao-veiculo.entity';
import { Combustivel } from 'src/combustivel/entities/combustivel.entity';
import { FilesVeiculo } from 'src/files-veiculo/entities/files-veiculo.entity';
import { Funcionario } from 'src/funcionario/entities/funcionario.entity';
import { Manutencao } from 'src/manutencao/entities/manutencao.entity';
import { Peca } from 'src/pecas/entities/peca.entity';
import { Quilometro } from 'src/quilometro/entities/quilometro.entity';
import { Servico } from 'src/servico/entities/servico.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Veiculo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'placa', type: 'varchar', length: 50 })
  placa: string;

  @Column({ name: 'renavam', type: 'varchar', length: 50 })
  renavam: string;

  @Column({ name: 'chassi', type: 'varchar', length: 50 })
  chassi: string;

  @Column({ name: 'tipo_chassi', type: 'varchar', length: 50 })
  tipoChassi: string;

  @Column({ name: 'ano', type: 'int' })
  ano: number;

  @Column({ name: 'modelo', type: 'varchar', length: 50 })
  modelo: string;

  @Column({ name: 'marca', type: 'varchar', length: 50 })
  marca: string;

  @Column({ name: 'ultima_km', type: 'int' })
  ultimaKm: number;

  @Column({ name: 'cor_interna', type: 'varchar', nullable: true, length: 50 })
  corInterna?: string;

  @Column({ name: 'cor_externa', type: 'varchar', nullable: true, length: 50 })
  corExterna?: string;

  @Column({ name: 'numero_motor_interno', type: 'int', nullable: true })
  numMotorInterno?: number;

  @Column({ name: 'numero_motor_externo', type: 'int', nullable: true })
  numMotorExterno?: number;

  @Column({ name: 'rastreador', type: 'boolean', nullable: true })
  rastreador?: boolean;

  @Column({ name: 'bloqueador', type: 'boolean', nullable: true })
  bloqueador?: boolean;

  @Column({ name: 'data_aquisicao', type: 'date' })
  dataAquisicao: Date;

  @Column({ name: 'condicao', type: 'varchar', length: 50 })
  condicao: string;

  @Column({ name: 'valor_compra', type: 'int' })
  valorCompra: number;

  @Column({ name: 'valor_reforma', type: 'int', nullable: true })
  ValorReforma?: number;

  @Column({ name: 'valor_mercado', type: 'int' })
  valorMercado: number;

  @Column({ name: 'nome_vendedor', type: 'varchar', length: 50 })
  nomeVendedor: string;

  @Column({ name: 'telefone_vendedor', type: 'varchar', length: 50 })
  teleVendedor: string;

  @Column({ name: 'descricao', type: 'varchar', length: 500 })
  descricao: string;

  @Column({ nullable: true })
  fotoCarro?: string;

  @ManyToOne(() => Combustivel, (combustivel) => combustivel.veiculo)
  combustivel: Combustivel;

  @OneToMany(() => Abastecimento, (abastecimento) => abastecimento.veiculo)
  abastecimento: Abastecimento[];

  @OneToMany(() => Quilometro, (km) => km.veiculo)
  km: Quilometro[];

  @OneToMany(() => FilesVeiculo, (files) => files.veiculo)
  files: FilesVeiculo[];

  @ManyToMany(() => Servico, (servicos) => servicos.veiculo)
  servicos: Servico[];

  @ManyToMany(() => Peca, (pecas) => pecas.veiculo)
  pecas: Peca[];

  @OneToMany(() => AutorizacaoVeiculo, (autorizacao) => autorizacao.veiculo)
  autorizacao: AutorizacaoVeiculo[];

  @OneToMany(() => Manutencao, (manutencao) => manutencao.veiculo)
  manutencao: Manutencao[];
}
