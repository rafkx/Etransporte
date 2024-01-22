import { ItemManutencaoPeca } from "src/manutencao/entities/item.manutencao.peca.entity";
import { ItemManutencaoServico } from "src/manutencao/entities/item.manutencao.servico.entity";
import { Quilometro } from "src/quilometro/entities/quilometro.entity";
import { Veiculo } from "src/veiculo/entities/veiculo.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manutencao {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'descricao', type: 'varchar', length: 500})
    descricao: string;

    @Column({ name: 'data', type: 'date' })
    data: Date;

    @OneToOne(() => Quilometro, {
        eager: true,
        cascade: true,
        onDelete: "CASCADE"
    })
    @JoinColumn()
    km: Quilometro;

    @Column({ name: 'tipo', type: 'varchar', length: 50})
    tipo: string;

    @ManyToOne(() => Veiculo, (veiculo) => veiculo.manutencao)
    veiculo: Veiculo;

    @OneToMany(() => ItemManutencaoPeca, (item) => item.manutencao, { eager: true, cascade: true })
    itensPeca: ItemManutencaoPeca[];

    @OneToMany(() => ItemManutencaoServico, (item) => item.manutencao, { eager: true, cascade: true })
    itensServico: ItemManutencaoServico[];
}