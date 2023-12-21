import { Entity, ManyToOne } from "typeorm";
import { Peca } from "src/pecas/entities/peca.entity";
import { ItemManutencao } from "./item.manutencao";
import { Manutencao } from "src/manutencao/entities/manutencao.entity";

@Entity()
export class ItemManutencaoPeca extends ItemManutencao {

    @ManyToOne(() => Manutencao, (manutencao) => manutencao.itensServico, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
    manutencao: Manutencao;

    @ManyToOne(() => Peca)
    peca: Peca;

}