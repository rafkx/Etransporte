import { Categoria } from "src/categoria/entities/categoria.entity";
import { Iten } from "src/itens/entities/iten.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Peca {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ name: 'nome_peca', type: 'varchar', length: 50 })
    nomePeca: string;

    @Column({ name: 'codigo_peca', type: 'varchar', length: 50 })
    codPeca: string;

    @Column({ name: 'quantidade_minima', type: 'int' })
    quantMin: number;

    @ManyToMany(() => Iten)
    @JoinTable()
    item: Iten;
}
