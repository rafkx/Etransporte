import { Entity, ManyToOne } from 'typeorm';
import { ItemManutencao } from './item.manutencao';
import { Servico } from 'src/servico/entities/servico.entity';
import { Manutencao } from 'src/manutencao/entities/manutencao.entity';

@Entity()
export class ItemManutencaoServico extends ItemManutencao {
  @ManyToOne(() => Manutencao, (manutencao) => manutencao.itensServico, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  manutencao: Manutencao;

  @ManyToOne(() => Servico)
  servico: Servico;
}
